# opn-cli [![Build Status](https://travis-ci.org/sindresorhus/opn-cli.svg?branch=master)](https://travis-ci.org/sindresorhus/opn-cli)

> Open stuff like URLs, files, executables. Cross-platform.


## Install

```
$ npm install --global opn-cli
```


## Usage

```
$ opn --help

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
```

The [following file types](https://github.com/sindresorhus/file-type#supported-file-types) are automagically detected when using stdin mode.


## Related

- [open](https://github.com/sindresorhus/open) - API for this module


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
