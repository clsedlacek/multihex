const util = require('util');
const execPromise = util.promisify(require('child_process').exec);
const hueToPercentage = require('./colorutil.js').hueToPercentage;

const tempNameBase = 'hbstemp';
const fuzzPercentage = 1;

const testColorDataHSB = [
	{
		templateHue: 0, // from red
		targetHue: 120, // to green
		targetSaturation: 100, // full saturation
		targetBrightness: 100 // full brightness
	},
	{
		templateHue: 33, // from green
		targetHue: 180, // to cyan
		targetSaturation: 100, // full saturation
		targetBrightness: 100 // full brightness
	},
	{
		templateHue: 67, // from blue
		targetHue: 60, // to yellow
		targetSaturation: 100, // full saturation
		targetBrightness: 100 // full brightness
	}
];

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
		commandFinal += `convert ${tempNameBase}_0.gif -fuzz ${fuzzPercentage}% -transparent 'hsb(0, 0, 0%)' -alpha extract redmask.gif;`;
		// green
		commandFinal += `convert ${tempNameBase}_0.gif -fuzz ${fuzzPercentage}% -transparent 'hsb(0, 0, 33%)' -alpha extract greenmask.gif;`;
		// blue
		commandFinal += `convert ${tempNameBase}_0.gif -fuzz ${fuzzPercentage}% -transparent 'hsb(0, 0, 67%)' -alpha extract bluemask.gif;`;
		// change colors via hue channel
		commandFinal += `convert ${tempNameBase}_0.gif -fuzz ${fuzzPercentage}% -fill 'hsb(0, 0, 50%)' -opaque 'hsb(0, 0, 0%)' -fill 'hsb(0, 0%, 50%)' -opaque 'hsb(0, 0%, 33%)' -fill 'hsb(0, 0%, 50%)' -opaque 'hsb(0, 0%, 67%)' ${tempNameBase}_0.gif;`;
		commandFinal += `convert ${tempNameBase}_?.gif -set colorspace HSB -combine ${outputPath}`;

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

