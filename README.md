# eslint-zap

> ESLint [ZAP](https://github.com/zaptst/zap) Formatter

## Example

```json
{"kind":"test","event":"passed","id":"0.0","source":"/Users/jamiebuilds/Projects/eslint-zap-reporter/fixture1.js","timestamp":"2018-07-27T20:43:59.841Z"}
{"kind":"assertion","event":"failed","id":"0.1.0","source":"/Users/jamiebuilds/Projects/eslint-zap-reporter/fixture2.js:1:1-1:16","message":"Strings must use doublequote.","timestamp":"2018-07-27T20:43:59.841Z"}
{"kind":"test","event":"failed","id":"0.1","source":"/Users/jamiebuilds/Projects/eslint-zap-reporter/fixture2.js","timestamp":"2018-07-27T20:43:59.841Z"}
{"kind":"suite","event":"failed","id":"0","timestamp":"2018-07-27T20:43:59.841Z"}
```

## Install

```sh
yarn add --dev eslint-zap
```

## Usage

```sh
eslint --format=node_modules/eslint-zap file.js
```
