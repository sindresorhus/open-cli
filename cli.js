#!/usr/bin/env node
'use strict';
const meow = require('meow');
const opn = require('opn');
const getStdin = require('get-stdin');
const tempWrite = require('temp-write');
const dataUriToBuffer = require('data-uri-to-buffer');

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
	  $ opn data:,Hello%2C%20World!
`, {
	default: {
		wait: false
	}
});

cli.flags.app = cli.input.slice(1);

const getInput = cb => {
	return cli.input[0] ?
		cb(cli.input[0]) : getStdin().then(stdin => cb(stdin));
};

const transform = input => {
	input = input.trim();
	return input.slice(0, 5) === 'data:' ?
		tempWrite.sync(dataUriToBuffer(input)) : input;
};

getInput(input => opn(transform(input), cli.flags));
