require("module-alias/register");

const { cli } = require("src/helpers/backend.cjs");

cli.execSyncSilently("git branch gh-pages");
