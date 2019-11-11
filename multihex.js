const path = require('path');
const recolor = require('./recolor.js').recolor;
const convertHexColorData = require('./colorutil.js').convertHexColorData;

// processes single image path using given color data and options
async function multihex(inputFilePath, colorData, options) {
		// parse input path in case we need parts of it
		const inputPathParsed = path.parse(inputFilePath);
		const inputPathTrimmed = inputPathParsed.dir + '/' + inputPathParsed.name;

		// final path used for input operations
		const inputPathFinal = inputFilePath;

		// final path used for output operations
		// uses props from options if found
		const outputDirFinal = options.outputDir || (inputPathParsed.dir + '/');
		const outputNameFinal = options.outputFileName || (inputPathParsed.name + '_mhx' + inputPathParsed.ext);
		const outputPathFinal = outputDirFinal + outputNameFinal;

		console.log('input path: '+inputFilePath); // debug
		console.log('output path: '+outputPathFinal); // debug

		// color data used to mask and recolor image
		// currently gives test data
		const colorDataFinal = convertHexColorData(colorData);

		// async recolor with imagemagick
		try {
			const res = await recolor(inputPathFinal, colorDataFinal, outputPathFinal);
			return res;
		}
		catch(e) {
			console.error(`There was an error with Multihex: ${e}`);
		}
}

// batch processes an array of image paths using given color data and options
async function batchMultihex(inputFilePaths, colorData, options) {
	for (inputPath of inputFilePaths) {
		try {
			const res = await multihex(inputPath, colorData, options);
			return res;
		}
		catch(e) {
			console.error(`There was an error batch-processing images with Multihex: ${e}`);
		}
	}
}

// expects color data as hex
module.exports = {
	multihex,
	batchMultihex
};
