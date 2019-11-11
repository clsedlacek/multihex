const multihex = require('./multihex.js').multihex;

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
		targetHex: '#333333' // to grey
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

// test main public function
const options = {
	outputDir: '../whclassicrecolor/',
	outputFileName: '4_o.gif',
	outputFileSuffix: '_out'
};

multihex('../whclassic/4.gif', testColorDataHex, options).then((res) => {
	console.log('multihex done');
});
