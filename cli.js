#!/usr/bin/env node
import meow from 'meow';
import open from 'open';
import getStdin from 'get-stdin';
import tempy from 'tempy';
import FileType from 'file-type';

const cli = meow(`
	Usage
	  $ open-cli <file|url> [--wait] [--background] [-- <app> [args]]
	  $ cat <file> | open-cli [--extension] [--wait] [--background] [-- <app> [args]]

	Options
	  --wait         Wait for the app to exit
	  --background   Do not bring the app to the foreground (macOS only)
	  --extension    File extension for when stdin file type cannot be detected

	Examples
	  $ open-cli https://sindresorhus.com
	  $ open-cli https://sindresorhus.com -- firefox
	  $ open-cli https://sindresorhus.com -- 'google chrome' --incognito
	  $ open-cli unicorn.png
	  $ cat unicorn.png | open-cli
	  $ echo '<h1>Unicorns!</h1>' | open-cli --extension=html
`, {
	importMeta: import.meta,
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

const input = cli.input[0];
const options = cli.flags;

if (!input && process.stdin.isTTY) {
	console.error('Specify a file path or URL');
	process.exit(1);
}

const [, appName, ...appArguments] = cli.input;
if (appName) {
	options.app = {
		name: appName,
		arguments: appArguments
	};
}

(async () => {
	if (input) {
		await open(input, options);
	} else {
		const stdin = await getStdin.buffer();
		const type = await FileType.fromBuffer(stdin);
		const extension = cli.flags.extension ?? type?.ext ?? 'txt';
		const filePath = await tempy.write(stdin, {extension});
		await open(filePath, options);
	}
})();
