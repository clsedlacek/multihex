const path = require('path');
const exec = require('child_process').exec;

const testColorDataHex = [
	{
		templateHex: '#ff0000', // from red
		targetHex: '#00ff00' // to green
	},
	{
		templateHex: '#00ff00', // from green
		targetHex: '#00ffff' // to cyan
	},
	{
		templateHex: '#0000ff', // from blue
		targetHex: '#ffff00' // to yellow
	}
];

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

// converts a hex color string in format '#ff00ff' to HSB color value object
function hexToHSB(hex) {
	const rgb = hexToRGB(hex);
	const hsb = RGBToHSB(rgb.r, rgb.g, rgb.b);
	return hsb;
}

// converts a hex color string in format '#ff00ff' to RGB color value object
function hexToRGB(hex) {
	const rgb = {
	};
}

// converts RGB color values into HSV color values
function RGBToHSB(r,g,b) {
}

// expects color data as HSB
function recolorInput(inputPath, colorData, outputPath) {
}

// expects color data as hex
module.exports = {
	multihex: function(inputFilePath, colorData, outputFilePath) {
		// parse input path in case we need parts of it
		const inputPathParsed = path.parse(inputFilePath);
		const inputPathTrimmed = inputPathParsed.dir + '/' + inputPathParsed.name;
		// final path used for input operations
		const inputPathFinal = inputFilePath;
		// final path used for output operations
		const outputPathFinal = outputFilePath || (inputPathTrimmed + '_mhx' + inputPathParsed.ext);

		console.log('input path: '+inputFilePath); // debug
		console.log('output path: '+outputPathFinal); // debug

		// color data used to mask and recolor image
		const colorDataFinal = colorData;
	}
};
