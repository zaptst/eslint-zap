'use strict';

function formatLoc(line, column) {
  let res = '';
  if (line) res += line;
  if (column) res += ':' + column;
  return res;
}

function formatRange(el) {
  let res = '';
  if (el.line || el.column) res += formatLoc(el.line, el.column);
  if (el.endLine || el.endColumn) res += '-' + formatLoc(el.endLine, el.endColumn);
  return res;
}

module.exports = results => {
  let output = '';
  let suitePassed = true;
  let timestamp = new Date().toISOString();
  let suiteId = '0';

  results.forEach((result, i) => {
    let filePath = result.filePath;
    let testId = `${suiteId}.${i}`;
    let testPassed = true;

    result.messages.forEach((el, i) => {
      let assertionId = `${testId}.${i}`;

      let event = 'passed';
      if (el.fatal || el.severity === 2) {
        event = 'failed';
        testPassed = false;
      }

      let source = filePath;
      let range = formatRange(el);
      if (range) source += ':' + range;

      output += JSON.stringify({
        kind: 'assertion',
        event,
        id: assertionId,
        source,
        message: el.message, // include el.ruleId?
        timestamp,
      });
      output += '\n';
    });

    output += JSON.stringify({
      kind: 'test',
      event: testPassed ? 'passed' : 'failed',
      id: testId,
      source: filePath,
      timestamp,
    });
    output += '\n';

    if (!testPassed) {
      suitePassed = false;
    }
  });

  output += JSON.stringify({
    kind: 'suite',
    event: suitePassed ? 'passed' : 'failed',
    id: suiteId,
    timestamp,
  });
  output += '\n';

  return output;
};
