require("module-alias/register");

const { cli } = require("@/helpers/backend");

cli.execSyncSilently("husky install");
cli.execSyncSilently('husky set .husky/pre-commit "npm run husky-precommit"');
