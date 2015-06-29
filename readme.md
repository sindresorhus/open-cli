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
    $ opn <file|url> [--no-wait] [-- <app> [args]]

  Options
    --no-wait  Don't wait for the app to exit

  Example
    $ opn http://sindresorhus.com
    $ opn http://sindresorhus.com -- firefox
    $ opn http://sindresorhus.com -- 'google chrome' --incognito
    $ opn unicorn.png
```


## Related

- [opn](https://github.com/sindresorhus/opn) - API for this module


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
