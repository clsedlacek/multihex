// converts a hex color string in format '#ff00ff' (no shorthand hex colors) to RGB color value object
function hexToRGB(hex) {
	// regexp to separate different components of hex color
	const hexParse = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	// return rgb object if valid 6 digit hex, null otherwise
	return hexParse ? {
		// parse hex number into decimal for each color component
		r: parseInt(hexParse[1], 16),
		g: parseInt(hexParse[2], 16),
		b: parseInt(hexParse[3], 16)
	} : null;
}

// converts RGB color values into HSV color values
function RGBToHSB(r,g,b) {
	// initialize HSB channels with default values
	let hue = 100, saturation = 100, brightness = 100;

	// convert 0-255 values to a percentage value
	let rPercentage = (r/255),
	gPercentage = (g/255),
	bPercentage = (b/255);

	// find min/max RGB components for calcs
	const minRGB = Math.min(rPercentage, Math.min(gPercentage, bPercentage));
	const maxRGB = Math.max(rPercentage, Math.max(gPercentage, bPercentage));
	const diff = maxRGB - minRGB;

	// calculate hue component based on max RGB value
	// equal to min- indicates grey
	if (maxRGB === minRGB) {
		hue = 0;
	}
	// red max
	else if (maxRGB === rPercentage) {
		hue = (60 * ((gPercentage - bPercentage) / diff) + 360) % 360;
	}
	// green max
	else if (maxRGB === gPercentage) {
		hue = (60 * ((bPercentage - rPercentage) / diff) + 120) % 360;
	}
	// blue max
	else {
		hue = (60 * ((rPercentage - gPercentage) / diff) + 240) % 360;
	}

	// calculate saturation
	if (maxRGB === 0) {
		saturation = 0;
	}
	else {
		saturation = (diff/maxRGB)*100;
	}

	// calculate brightness 
	brightness = maxRGB * 100;

	return {
		hue,
		saturation,
		brightness
	};
}

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

// converts a set of hex recolor data to HSB format for recoloring functions
function convertHexColorData(hexColorData) {
	const hsbColorData = [];

	for (const hexColor of hexColorData) {
		// convert each hex color to HSB one by one
		const templateHSB = hexToHSB(hexColor.templateHex);
		const targetHSB = hexToHSB(hexColor.targetHex);

		// structure for recoloring functions
		const hsbColor = {
			templateHue: templateHSB.hue,
			targetHue: targetHSB.hue,
			targetSaturation: targetHSB.saturation,
			targetBrightness: targetHSB.brightness
		};
		hsbColorData.push(hsbColor);
	}

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

	return hsbColorData;
}


module.exports = {
	hexToHSB,
	convertHexColorData,
	hueToPercentage
}
