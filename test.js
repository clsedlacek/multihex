const multihex = require('./multihex.js').multihex;

const testColorDataHex = [
	{
		templateHex: '#ff0000', // from red
		targetHex: '#cc8822' // to brown
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
		targetHex: '#eecc00' // to yellow
	}
];


multihex('./templateavatar.gif', testColorDataHex).then((res) => {
	console.log('multihex done');
});
