import * as fs from 'fs';
import * as path from 'path';
import * as which from 'which';

// NPM Directories
export let GLOBAL_NPM_BIN;
export let GLOBAL_NPM_PATH;

const throwNotFoundError = () => {
    const err = new Error("Cannot find module 'npm'")
    err.code = 'MODULE_NOT_FOUND'
    throw err;
};

try {
    GLOBAL_NPM_BIN = process.env.GLOBAL_NPM_BIN || fs.realpathSync(which.sync('npm'));
} catch (e) {
    console.error(e);
    throwNotFoundError();
}

GLOBAL_NPM_PATH = process.env.GLOBAL_NPM_PATH || path.join(
    GLOBAL_NPM_BIN,
    process.platform === 'win32' ? '../node_modules/npm' : '../..'
);

/**
 * Run an npm package, equivalent to running 'npx create-react-app'
 */
export default (npmPackage, args) => {
    try {
        const npx = require(GLOBAL_NPM_PATH + '/node_modules/libnpx');
        const NPM_PATH = path.join(GLOBAL_NPM_PATH, 'bin', 'npm-cli.js')
        const parsedArgs = npx.parseArgs(['npx', '', npmPackage, args], NPM_PATH);

        return npx(parsedArgs);
    } catch (e) {
        console.error(e);
        if (e.code !== 'MODULE_NOT_FOUND') {
            throw e;
        }
    }
    throwNotFoundError();
};