const util = require('util');
const execPromise = util.promisify(require('child_process').exec);
const hueToPercentage = require('./colorutil.js').hueToPercentage;

const tempNameBase = 'hbstemp';
const fuzzPercentage = 1;

const testColorDataHSB = [
	{
		templateHue: 0, // from red
		targetHue: 60, // to green
		targetSaturation: 100, // full saturation
		targetBrightness: 100 // full brightness
	},
	{
		templateHue: 60, // from yellow
		targetHue: 90, // to yellow-green
		targetSaturation: 100, // full saturation
		targetBrightness: 100 // full  brightness
	},
	{
		templateHue: 120, // from green
		targetHue: 260, // to purple
		targetSaturation: 100, // full saturation
		targetBrightness: 100 // full brightness
	},
	{
		templateHue: 180, // from cyan
		targetHue: 60, // to green
		targetSaturation: 100, // full saturation
		targetBrightness: 100 // full brightness
	},
	{
		templateHue: 240, // from blue
		targetHue: 260, // to purple
		targetSaturation: 100, // full saturation
		targetBrightness: 100 // full brightness
	},
	{
		templateHue: 300, // from magenta
		targetHue: 60, // to yellow
		targetSaturation: 100, // full saturation
		targetBrightness: 100 // full brightness
	}
];


// generates the part of an avatar recolor command
// that handles the actual mask creation and channel recoloring
// dynamically based on input color data
function generateColorsCommandPart(hueChannelPath, colorDataHSB) {
	let commandPart = '';
	let maskCommandPart = '';
	let fillCommandPart = `convert ${hueChannelPath} -fuzz ${fuzzPercentage}%`;

	// build mask and fill command parts for each color
	for (const color of colorDataHSB) {
		console.log('color data:');
		console.dir(color);
		maskCommandPart += `convert ${hueChannelPath} -fuzz ${fuzzPercentage}% -transparent 'hsb(0, 0, ${hueToPercentage(color.templateHue)}%)' -alpha extract hue_${color.templateHue}_mask.gif;`;
		fillCommandPart += ` -mask hue_${color.templateHue}_mask.gif -fill 'hsb(0, 0%, ${hueToPercentage(color.targetHue)}%)' -opaque 'hsb(0, 0%, ${hueToPercentage(color.templateHue)}%)' +mask`;
	}
	// add final semicolon to fill command
	fillCommandPart += ` ${hueChannelPath};`;

	commandPart = maskCommandPart + fillCommandPart;

	return commandPart;
}

module.exports = {
	// recolor avatar image at path
	// expects color data as HSB
	// returns a promise resolving to output file name
	recolor: async function(inputPath, colorDataHSB, outputPath) {
		// build command
		// first separate channels
		let commandFinal = `convert ${inputPath} -colorspace HSB -separate ${tempNameBase}_%d.gif;`;
		// next get masks for each color
		// (temporarily hardcoded values...)
		// red
		//commandFinal += `convert ${tempNameBase}_0.gif -fuzz ${fuzzPercentage}% -transparent 'hsb(0, 0, 0%)' -alpha extract redmask.gif;`;
		// green
		//commandFinal += `convert ${tempNameBase}_0.gif -fuzz ${fuzzPercentage}% -transparent 'hsb(0, 0, 33%)' -alpha extract greenmask.gif;`;
		// blue
		//commandFinal += `convert ${tempNameBase}_0.gif -fuzz ${fuzzPercentage}% -transparent 'hsb(0, 0, 67%)' -alpha extract bluemask.gif;`;
		// change colors via hue channel
		//commandFinal += `convert ${tempNameBase}_0.gif -fuzz ${fuzzPercentage}% -fill 'hsb(0, 0, ${hueToPercentage(testColorDataHSB[0].targetHue)}%)' -opaque 'hsb(0, 0, ${hueToPercentage(testColorDataHSB[0].templateHue)}%)' -fill 'hsb(0, 0%, ${hueToPercentage(testColorDataHSB[1].targetHue)}%)' -opaque 'hsb(0, 0%, ${hueToPercentage(testColorDataHSB[1].templateHue)}%)' -fill 'hsb(0, 0%, ${hueToPercentage(testColorDataHSB[2].targetHue)}%)' -opaque 'hsb(0, 0%, ${hueToPercentage(testColorDataHSB[2].templateHue)}%)' ${tempNameBase}_0.gif;`;
		commandFinal += generateColorsCommandPart((tempNameBase+'_0.gif'), testColorDataHSB);
		commandFinal += `convert ${tempNameBase}_?.gif -set colorspace HSB -combine ${outputPath}`;

		console.log('command: '); // debug
		console.log(commandFinal); // debug

		// execute asynchronously with error handling
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

