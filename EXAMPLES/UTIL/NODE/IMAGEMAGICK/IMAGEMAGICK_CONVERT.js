// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-UTIL.
require('../../../../UPPERCASE.IO-UTIL/NODE.js');

TEST('IMAGEMAGICK_CONVERT', function(ok) {
	'use strict';

	IMAGEMAGICK_CONVERT(['sample.png', '-resize', '100x100\!', 'sample-square.png']);

	IMAGEMAGICK_CONVERT(['sample.png', '-resize', '200x200\!', 'sample-square.png'], function() {
		console.log('DONE.');
	});

	IMAGEMAGICK_CONVERT(['sample.png', '-resize', '300x300\!', 'sample-square.png'], {
		error : function() {
			console.log('ERROR!');
		},
		success : function() {
			console.log('DONE.');
		}
	});
});
