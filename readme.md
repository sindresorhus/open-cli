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
```


## Related

- [opn](https://github.com/sindresorhus/opn) - API for this module


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
