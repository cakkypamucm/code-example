require("module-alias/register");

const { cli } = require("@/helpers/backend");

const releaseVersion = process.env.npm_package_version;

[
    "npm run lint",
    "webpack --no-cache --node-env production",
    "git stash",
    "git checkout gh-pages",
    "git rm -rf .",
    "git checkout HEAD -- .gitignore",
    'copyfiles -u 1 "dist/**/*" .',
    "git add --all"
].forEach(cli.execSync);

// @see https://typicode.github.io/husky/#/?id=bypass-hooks --no-verify - для игнора husky
// обработка ситуации "два раза подряд запустить build" - поскольку файлы не изменятся, то и коммитить нечего
cli.execSyncSilently(`git commit -m "build gh-pages for release version ${releaseVersion}" --no-verify`);

cli.execSync("git checkout master");

// "git stash" при отсутствии изменений не выдаст ошибки, "git stash pop" - выдаст ошибку, если нечего возвращать
cli.execSyncSilently("git stash pop");
