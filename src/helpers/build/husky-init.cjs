require("module-alias/register");

const { cli } = require("src/helpers/backend.cjs");

cli.execSyncSilently("husky install");
cli.execSyncSilently('husky set .husky/pre-commit "npm run husky-precommit"');
