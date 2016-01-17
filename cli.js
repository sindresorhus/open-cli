#!/usr/bin/env node
'use strict';
const meow = require('meow');
const opn = require('opn');

const cli = meow(`
	Usage
	  $ opn <file|url> [--wait] [-- <app> [args]]

	Options
	  --wait  Wait for the app to exit

	Examples
	  $ opn http://sindresorhus.com
	  $ opn http://sindresorhus.com -- firefox
	  $ opn http://sindresorhus.com -- 'google chrome' --incognito
	  $ opn unicorn.png
`, {
	default: {
		wait: false
	}
});

cli.flags.app = cli.input.slice(1);

opn(cli.input[0], cli.flags);
