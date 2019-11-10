const path = require('path');
const recolor = require('./recolor.js').recolor;
const convertHexColorData = require('./colorutil.js').convertHexColorData;

// expects color data as hex
module.exports = {
	multihex: async function(inputFilePath, colorData, outputFilePath) {
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
};
