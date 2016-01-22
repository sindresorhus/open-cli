#!/usr/bin/env node
'use strict';
const meow = require('meow');
const opn = require('opn');
const getStdin = require('get-stdin');
const tempWrite = require('temp-write');
const fileType = require('file-type');

const cli = meow(`
	Usage
	  $ opn <file|url> [--wait] [-- <app> [args]]
	  $ stdout | opn [--wait] [--ext] [-- <app> [args]]

	Options
	  --wait  Wait for the app to exit
	  --ext   File extension for stdin

	Examples
	  $ opn http://sindresorhus.com
	  $ opn http://sindresorhus.com -- firefox
	  $ opn http://sindresorhus.com -- 'google chrome' --incognito
	  $ opn unicorn.png
	  $ cat ./image.png | opn
	  $ echo '[]' | opn --ext json
`, {
	default: {
		wait: false
	}
});

cli.flags.app = cli.input.slice(1);

const input = cli.input[0];

if (!input && process.stdin.isTTY) {
	console.error('Input required');
	process.exit(1);
}

if (input) {
	opn(input, cli.flags);
} else {
	getStdin.buffer().then(stdin => {
		const type = fileType(stdin);
		const ext = (cli.flags.ext || type && type.ext || 'txt');
		opn(tempWrite.sync(stdin, `opn.${ext}`), cli.flags);
	});
}
