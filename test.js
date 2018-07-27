'use strict';

const test = require('ava');
const path = require('path');
const spawn = require('spawndamnit');

const ESLINT_BIN = path.join(__dirname, 'node_modules', '.bin', 'eslint');
const FORMATTER_BIN = path.join(__dirname, 'index.js');

const fixture1 = path.join(__dirname, 'fixture1.js');
const fixture2 = path.join(__dirname, 'fixture2.js');

function parse(stdout) {
  return stdout.toString().trim().split('\n').map(line => JSON.parse(line));
}

test(async t => {
  let res = await spawn(ESLINT_BIN, [
    './fixture*.js',
    `--format=${FORMATTER_BIN}`,
    '--no-eslintrc',
    '--rule',
    'quotes: [2, double]',
  ]);

  console.log(res.stdout.toString());

  t.is(res.code, 1);

  let parsed = parse(res.stdout);
  let timestamps = [];

  parsed = parsed.map(event => {
    let { timestamp, ...rest } = event;
    t.not(new Date(timestamp).toString(), 'Invalid Date');
    return rest;
  });

  t.deepEqual(parsed, [
    { event: 'passed', id: '0.0', kind: 'test', source: fixture1 },
    { event: 'failed', id: '0.1.0', kind: 'assertion', source: fixture2 + ':1:1-1:16', message: 'Strings must use doublequote.' },
    { event: 'failed', id: '0.1', kind: 'test', source: fixture2 },
    { event: 'failed', id: '0', kind: 'suite' },
  ]);
});
