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

module.exports = {
	hexToHSB
}
