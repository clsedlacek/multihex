# Multihex

Multihex is a small module for recoloring specially-formated chat avatar images (sometimes called "tricolor" or "hexcolor"). It uses Node.js and ImageMagick.

This code has currently only been tested on Ubuntu-based operating systems; more support coming later. It will likely work elsewhere (especially on other Linux OSes) but try at your own risk.

This program is free to use but [donations are always appreciated!](https://ko-fi.com/nventous)

## Installation

1. Download the source code- `git clone https://github.com/clsedlacek/multihex.git` or use the "Clone or download" link above.

2. Install Node.js dependencies with npm `npm install`

3. Install [ImageMagick](https://imagemagick.org/index.php) (this comes preinstalled on many systems- to check if it's available first, try `convert --version`).

## Usage

Better documentation coming soon- meanwhile, refer to `test.js` and `multihex.js` for an example of usage and accepted color data format.

The following functions are exposed from `multihex.js`:

### multihex

Usage: `multihex(inputFilePath, colorData, options).then(function(res) { ... });`

#### Params

| Param | Type | Description |
| ----- | ---- | ----------- |
| inputFilePath | string | Path to template image |
| colorData | array<object> | Array of colors to target on the template image (see color data section) |
| options | object | Options hash (see options below) |

#### Options

| Property | Type | Description |
| -------- | ---- | ----------- |
| outputDir | string | Path to directory for output image (uses same directory as input if undefined) |
| outputFileName | string | Output file name (uses a default name if undefined) |


### batchMultihex

Usage: `batchMultihex(inputFilePaths, colorData, options).then(function(res) { ... });`

#### Params

| Param | Type | Description |
| ----- | ---- | ----------- |
| inputFilePaths | array<string> | Array of paths to template images (as strings) |
| colorData | array<object> | Array of colors to target on the template image (see color data section |
| options | object | Options hash (see options below) |

#### Options

| Property | Type | Description |
| -------- | ---- | ----------- |
| outputDir | string | Path to directory for output image (uses same directory as input if undefined) |
| outputFileSuffix | string | Suffix to append to output file names |


## Formatting images for Multihex

Better documentation coming soon- meanwhile, [refer to the following tutorial infographic](https://www.deviantart.com/amusedinsanity/art/Tricolor-Hexacolor-Pose-Tutorial-for-CS4-206687253) for creating images compatible with Multihex (thank you to amusedinsanity for creating this tutorial!)


## License

Multihex uses the MIT license.

```
Copyright 2019 Ven Sedlacek

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
