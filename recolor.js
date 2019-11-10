const util = require('util');
const execPromise = util.promisify(require('child_process').exec);

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
	}
};

