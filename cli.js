#!/usr/bin/env node
'use strict';
const meow = require('meow');
const opn = require('opn');
const getStdin = require('get-stdin');

const cli = meow(`
	Usage
	  $ opn <file|url> [--wait] [-- <app> [args]]
	  $ stdout | opn [--wait] [-- <app> [args]]

	Options
	  --wait  Wait for the app to exit

	Examples
	  $ opn http://sindresorhus.com
	  $ opn http://sindresorhus.com -- firefox
	  $ opn http://sindresorhus.com -- 'google chrome' --incognito
	  $ opn unicorn.png
	  $ echo http://sindresorhus.com | opn
`, {
	default: {
		wait: false
	}
});

cli.flags.app = cli.input.slice(1);

if (cli.input[0]) {
	opn(cli.input[0], cli.flags);
} else {
	getStdin().then(stdin => opn(stdin.trim(), cli.flags));
}
