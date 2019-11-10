// converts a hue angle (ex. 300 for magenta) to a % of 360 degrees (ex. 83 for magenta)
function hueToPercentage(hue) {
	return (hue * 100 / 360);
}

// converts a hex color string in format '#ff00ff' to HSB color value object
function hexToHSB(hex) {
	const rgb = hexToRGB(hex);
	const hsb = RGBToHSB(rgb.r, rgb.g, rgb.b);
	return hsb;
}

// converts a set of hex color data to HSB format recognized by image parsing functions
function convertHexColorData(hexColorData) {
	const hsbColorData = [];

	// debug
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
		targetHue: 300, // to purple
		targetSaturation: 50, // full saturation
		targetBrightness: 70 // full brightness
	},
	{
		templateHue: 180, // from cyan
		targetHue: 60, // to green
		targetSaturation: 100, // full saturation
		targetBrightness: 100 // full brightness
	},
	{
		templateHue: 240, // from blue
		targetHue: 20, // to brown
		targetSaturation: 74, // full saturation
		targetBrightness: 57 // full brightness
	},
	{
		templateHue: 300, // from magenta
		targetHue: 60, // to yellow
		targetSaturation: 100, // full saturation
		targetBrightness: 100 // full brightness
	}
	];

	return testColorDataHSB;
}

// converts a hex color string in format '#ff00ff' to RGB color value object
function hexToRGB(hex) {
	const rgb = {
	};
}

// converts RGB color values into HSV color values
function RGBToHSB(r,g,b) {
}

module.exports = {
	hexToHSB,
	convertHexColorData,
	hueToPercentage
}
