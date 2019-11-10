const util = require('util');
const execPromise = util.promisify(require('child_process').exec);
const hueToPercentage = require('./colorutil.js').hueToPercentage;

const tempNameBase = 'hbstemp';
const fuzzPercentage = 1;

// generates the part of an avatar recolor command
// that handles the actual mask creation and channel recoloring
// dynamically based on input color data
function generateColorsCommandPart(channelPaths, colorDataHSB) {
	// get paths to separated channel images
	const hueChannelPath = channelPaths.hue;
	const saturationChannelPath = channelPaths.saturation;
	const brightnessChannelPath = channelPaths.brightness;

	let commandPart = '';
	let maskCommandPart = '';
	let fillCommandPart = `convert ${hueChannelPath} -fuzz ${fuzzPercentage}%`;
	let saturationCommandPart = '';
	let brightnessCommandPart = '';

	// build mask and fill command parts for each color
	for (const color of colorDataHSB) {
		console.log('color data:');
		console.dir(color);

		// path to current hue's mask
		const currentMaskPath = `hue_${color.templateHue}_mask.gif`;

		maskCommandPart += `convert ${hueChannelPath} -fuzz ${fuzzPercentage}% -transparent 'hsb(0, 0, ${hueToPercentage(color.templateHue)}%)' -alpha extract ${currentMaskPath};`;
		fillCommandPart += ` -mask ${currentMaskPath} -fill 'hsb(0, 0%, ${hueToPercentage(color.targetHue)}%)' -opaque 'hsb(0, 0%, ${hueToPercentage(color.templateHue)}%)' +mask`;
		saturationCommandPart += `convert ${saturationChannelPath} -mask ${currentMaskPath} -modulate ${color.targetSaturation},100,100 +mask ${saturationChannelPath};`;
		brightnessCommandPart += `convert ${brightnessChannelPath} -mask ${currentMaskPath} -modulate ${color.targetBrightness},100,100 +mask ${brightnessChannelPath};`;
	}
	// add final semicolon to fill command
	fillCommandPart += ` ${hueChannelPath};`;

	commandPart = maskCommandPart + fillCommandPart + saturationCommandPart + brightnessCommandPart;

	return commandPart;
}

module.exports = {
	// recolor avatar image at path
	// expects color data as HSB
	// returns a promise resolving to output file name
	recolor: async function(inputPath, colorDataHSB, outputPath) {
		// paths to color channels as object
		const channelPaths = {
			hue: (tempNameBase+'_0.gif'),
			saturation: (tempNameBase+'_1.gif'),
			brightness: (tempNameBase+'_2.gif'),
			alpha: (tempNameBase+'_alpha.gif')
		};

		// setup imagemagick commands
		// first separate channels
		let commandFinal = `convert ${inputPath} -colorspace HSB -separate ${tempNameBase}_%d.gif;`;
		commandFinal += `convert ${inputPath} -alpha extract ${channelPaths.alpha};`;

		// generate part of IM commands that creates masks and alters color channels
		commandFinal += generateColorsCommandPart(channelPaths, colorDataHSB);
		commandFinal += `convert ${tempNameBase}_?.gif -set colorspace HSB -combine ${outputPath};`;
		commandFinal += `convert ${outputPath} ${channelPaths.alpha} -alpha Off -compose CopyOpacity -composite ${outputPath}`;

		console.log('command: '); // debug
		console.log(commandFinal); // debug

		// execute IM recolor commands asynchronously with error handling
		try {
			const res = await execPromise(commandFinal);
			return res.stdout;
		}
		catch(e) {
			console.error(`error stdout: ${e.stdout}`);
			console.error(`error stderr: ${e.stderr}`);
			throw e.stderr;
		}
	}
};

