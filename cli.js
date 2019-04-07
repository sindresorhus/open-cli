#!/usr/bin/env node
'use strict';
const meow = require('meow');
const open = require('open');
const getStdin = require('get-stdin');
const tempWrite = require('temp-write');
const fileType = require('file-type');

const cli = meow(`
	Usage
	  $ opn <file|url> [--wait] [--background] [-- <app> [args]]
	  $ cat <file> | opn [--ext] [--wait] [--background] [-- <app> [args]]

	Options
	  --wait         Wait for the app to exit
	  --background   Do not bring the app to the foreground (macOS only)
	  --ext          File extension for when stdin file type can't be detected

	Examples
	  $ opn https://sindresorhus.com
	  $ opn https://sindresorhus.com -- firefox
	  $ opn https://sindresorhus.com -- 'google chrome' --incognito
	  $ opn unicorn.png
	  $ cat unicorn.png | opn
	  $ echo '<h1>Unicorns!</h1>' | opn --ext=html
`, {
	flags: {
		wait: {
			type: 'boolean',
			default: false
		},
		background: {
			type: 'boolean',
			default: false
		},
		ext: {
			type: 'string'
		}
	}
});

cli.flags.app = cli.input.slice(1);

const input = cli.input[0];

if (!input && process.stdin.isTTY) {
	console.error('Specify a filepath or URL');
	process.exit(1);
}

if (input) {
	open(input, cli.flags);
} else {
	(async () => {
		const stdin = await getStdin.buffer();
		const type = fileType(stdin);
		const ext = cli.flags.ext || (type && type.ext) || 'txt';
		open(tempWrite.sync(stdin, `opn.${ext}`), cli.flags);
	})();
}
