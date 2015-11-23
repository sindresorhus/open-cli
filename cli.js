#!/usr/bin/env node
'use strict';
var meow = require('meow');
var opn = require('opn');
var path = require('path');
var pkg = require(path.join(__dirname, 'node_modules', 'opn', 'package.json'));

var cli = meow({
	pkg: {
		version:pkg.version
	},
	help: [
		'Usage',
		'  $ opn <file|url> [--no-wait] [-- <app> [args]]',
		'',
		'Options',
		'  --no-wait  Don\'t wait for the app to exit',
		'',
		'Example',
		'  $ opn http://sindresorhus.com',
		'  $ opn http://sindresorhus.com -- firefox',
		'  $ opn http://sindresorhus.com -- \'google chrome\' --incognito',
		'  $ opn unicorn.png'
	]
},
{
	alias: {
		h: 'help',
		v: 'version'
	}
});

if (!cli.input.length) cli.showHelp();

cli.flags.app = cli.input.slice(1);

opn(cli.input[0], cli.flags, function (err) {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}
});
