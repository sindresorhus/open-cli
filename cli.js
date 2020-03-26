#!/usr/bin/env node
'use strict';
const meow = require('meow');
const open = require('open');
const getStdin = require('get-stdin');
const tempWrite = require('temp-write');
const fileType = require('file-type');

// eslint-disable-next-line unicorn/string-content
const cli = meow(`
	Usage
	  $ open-cli <file|url> [--wait] [--background] [-- <app> [args]]
	  $ cat <file> | open-cli [--extension] [--wait] [--background] [-- <app> [args]]

	Options
	  --wait         Wait for the app to exit
	  --background   Do not bring the app to the foreground (macOS only)
	  --extension    File extension for when stdin file type can't be detected

	Examples
	  $ open-cli https://sindresorhus.com
	  $ open-cli https://sindresorhus.com -- firefox
	  $ open-cli https://sindresorhus.com -- 'google chrome' --incognito
	  $ open-cli unicorn.png
	  $ cat unicorn.png | open-cli
	  $ echo '<h1>Unicorns!</h1>' | open-cli --extension=html
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
		extension: {
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

(async () => {
	if (input) {
		await open(input, cli.flags);
	} else {
		const stdin = await getStdin.buffer();
		const type = fileType.fromBuffer(stdin);
		const extension = cli.flags.extension || (type && type.ext) || 'txt';
		await open(tempWrite.sync(stdin, `open.${extension}`), cli.flags);
	}
})();
