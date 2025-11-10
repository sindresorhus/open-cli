import {createReadStream} from 'node:fs';
import test from 'ava';
import {execa} from 'execa';

test('main', async t => {
	const {stdout} = await execa('./cli.js', ['--version']);
	t.true(stdout.length > 0);
});

test('supports opening files from stdin', async t => {
	const subprocess = execa('./cli.js', {
		input: createReadStream('./cli.js'),
	});

	await t.notThrowsAsync(subprocess);
});
