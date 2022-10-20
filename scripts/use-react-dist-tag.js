/* eslint-disable no-console */
/**
 * Given the dist tag fetch the corresponding
 * version and make sure this version is used throughout the repository.
 *
 * If you work on this file:
 * WARNING: This script can only use built-in modules since it has to run before
 * `yarn install`
 */
const childProcess = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { promisify } = require('util');

const exec = promisify(childProcess.exec);

// packages published from the react monorepo using the same version
const reactPackageNames = ['react', 'react-dom', 'react-is', 'react-test-renderer', 'scheduler'];

async function main(options) {
  const { distTag } = options;
  if (typeof distTag !== 'string') {
    throw new TypeError(`expected distTag: string but got '${distTag}'`);
  }

  if (distTag === 'stable') {
    console.log('nothing to do with stable');
    return;
  }

  const packageJsonPath = path.resolve(__dirname, '../package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf8' }));

  await Promise.all(
    reactPackageNames.map(async (reactPackageName) => {
      const { stdout: versions } = await exec(`npm dist-tag ls ${reactPackageName} ${distTag}`);
      const tagMapping = versions.split('\n').find((mapping) => {
        return mapping.startsWith(`${distTag}: `);
      });
      if (tagMapping === undefined) {
        throw new Error(`Could not find '${distTag}' in "${versions}"`);
      }

      const version = tagMapping.replace(`${distTag}: `, '');

      packageJson.resolutions[reactPackageName] = version;
    }),
  );

  // https://github.com/enzymejs/enzyme/issues/2358
  packageJson.devDependencies['enzyme-adapter-react-16'] = 'npm:@eps1lon/enzyme-adapter-react-next';

  // add newline for clean diff
  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}${os.EOL}`);

  await exec(`git apply ${path.resolve(__dirname, `./react-${distTag}.diff`)}`);
}

const [distTag = process.env.REACT_DIST_TAG] = process.argv.slice(2);
main({ distTag }).catch((error) => {
  console.error(error);
  process.exit(1);
});
