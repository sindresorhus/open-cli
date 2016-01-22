# opn-cli [![Build Status](https://travis-ci.org/sindresorhus/opn-cli.svg?branch=master)](https://travis-ci.org/sindresorhus/opn-cli)

> A better [node-open](https://github.com/pwnall/node-open). Opens stuff like websites, files, executables. Cross-platform.


## Install

```
$ npm install --global opn-cli
```


## Usage

```
$ opn --help

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
```


## Related

- [opn](https://github.com/sindresorhus/opn) - API for this module


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
