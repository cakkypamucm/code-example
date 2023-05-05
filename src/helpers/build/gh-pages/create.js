require("module-alias/register");

const { cli } = require("@/helpers/backend");

cli.execSyncSilently("git branch gh-pages");
