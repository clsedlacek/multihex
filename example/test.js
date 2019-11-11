// test main public function
const multihex = require('../multihex.js');

const testColorDataHex = [
	{
		templateHex: '#ff0000', // from red
		targetHex: '#aaaaaa' // to light grey
	},
	{
		templateHex: '#ffff00', // from yellow
		targetHex: '#aa00aa' // to purple
	},
	{
		templateHex: '#00ff00', // from green
		targetHex: '#33ffff' // to cyan
	},
	{
		templateHex: '#00ffff', // from cyan
		targetHex: '#00cc00' // to green
	},
	{
		templateHex: '#0000ff', // from blue
		targetHex: '#eecc00' // to yellow
	},
	{
		templateHex: '#ff00ff', // from magenta
		targetHex: '#007700' // to green
	}
];

const options = {
	outputDir: (__dirname + '/'), // output directory
	outputFileName: 'multihex_o.gif' // name of output file
};

multihex.multihex((__dirname + '/templateavatar.gif'), testColorDataHex, options).then((res) => {
	console.log('multihex done');
});

