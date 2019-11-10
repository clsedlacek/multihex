const multihex = require('./multihex.js').multihex;

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

multihex('./templateavatar.gif', testColorDataHex).then((res) => {
	console.log('multihex done');
});
