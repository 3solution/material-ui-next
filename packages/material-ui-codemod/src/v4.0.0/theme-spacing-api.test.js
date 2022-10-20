import fs from 'fs';
import path from 'path';
import { EOL } from 'os';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './theme-spacing-api';

function trim(str) {
  return str.replace(/^\s+|\s+$/, '').replace(/\r*\n/g, EOL);
}

function read(fileName) {
  return fs.readFileSync(path.join(__dirname, fileName), 'utf8').toString();
}

describe('@material-ui/codemod', () => {
  describe('v4.0.0', () => {
    describe('theme-spacing', () => {
      it('update theme spacing API', () => {
        const actual = transform(
          { source: read('./theme-spacing-api.test/actual.js') },
          { jscodeshift },
        );

        const expected = read('./theme-spacing-api.test/expected.js');
        expect(trim(actual)).to.equal(trim(expected), 'The transformed version should be correct');
      });

      it('update theme spacing API for destructured', () => {
        const actual = transform(
          { source: read('./theme-spacing-api.test/actual_destructured.js') },
          { jscodeshift },
        );

        const expected = read('./theme-spacing-api.test/expected_destructured.js');
        expect(trim(actual)).to.equal(trim(expected), 'The transformed version should be correct');
      });
    });
  });
});
