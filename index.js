var GIFEncoder = require('gifencoder');
var tmp = require('tmp');
var pngFileStream = require('png-file-stream');
var fs = require('fs');
var path = require('path');
var sizeOf = require('image-size');

var screenshots = {};

var captureAs = exports.captureAs = function(label, clip) {
  return function(nightmare) {
    if (screenshots[label]) {
      screenshots[label].number += 1;
    } else {
      screenshots[label] = {
        dir: tmp.dirSync().name,
        number: 0,
        clip: clip,
      };
    }

    nightmare
      .screenshot(screenshots[label].dir + '/screenshot_' + screenshots[label].number + '.png', clip);
  }
};

var generate = exports.generate = function(label, outputPath, encoderOptions) {
  var _encoderOptions = Object.assign({
    repeat: -1,
    delay: 1000,
    quality: 10,
  }, encoderOptions);

  if (!screenshots[label]) {
    throw new Error('Screenshot not added to ' + label);
  }

  var imageSize = sizeOf(screenshots[label].dir + '/screenshot_1.png');

  var encoder = new GIFEncoder(imageSize.width, imageSize.height);
  var _outputPath = outputPath;


  if (!_outputPath) {
    _outputPath = fs.realpathSync('./');
  }

  if (path.extname(_outputPath) !== '.gif') {
    _outputPath = fs.realpathSync(_outputPath);
    _outputPath = path.join(_outputPath, label + '.gif');
  }

  return new Promise(function(resolve) {
    var stream = pngFileStream(screenshots[label].dir + '/screenshot_?.png')
      .on('finish', resolve)
      .pipe(encoder.createWriteStream(_encoderOptions))
      .pipe(fs.createWriteStream(_outputPath));
  });
};
