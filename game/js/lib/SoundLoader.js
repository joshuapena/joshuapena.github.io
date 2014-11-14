"use strict";

var SoundLoader = function() {};

SoundLoader.prototype.load = function(folder, names, extension, callback) {
	var counter = 0;
	var audio = {};
	names.forEach(function(name) {
		var audioi = new buzz.sound(folder + '/' + name + extension[counter]);
		counter++;
		audio[name] = audioi;
		if ( counter === names.length) {
			callback(audio);
		}
	});
};
