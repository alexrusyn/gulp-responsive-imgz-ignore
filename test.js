/*!
 * gulp-img-retina | https://github.com/germanyt/gulp-img-retina
 * Copyright (c) Gavin Tang (@germanyt).
 */

/* global describe, it */

'use strict';

var assert = require('assert');
var gutil  = require('gulp-util');
var imgRetina = require('./index');

var imgInput = '<img class="wp-name" src="blank.png"><img class="name" src="/path/blank.png"><img src>';
var imgOutput = '<img class="wp-name" src="blank.png"><img class="name" src="/path/blank.png" srcset="/path/blank.png 1x, /path/blank@2x.png 2x"><img src>';

describe('gulp-img-retina', function() {
  it('should set img attribute', function (cb) {

    var stream = imgRetina();

    stream.once('data', function(file) {

      // make sure it came out the same way it went in
      assert(file.isStream);

      // check the contents
      assert.equal(String(file.contents), imgOutput);
      cb();
    });

    stream.write(new gutil.File({
      path: 'index.html',
      contents: Buffer.from(imgInput)
    }));
  });
});