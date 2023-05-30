const { execSync } = require("child_process");

module.exports = {
    cli: {
        execSync(command) {
            execSync(command, { stdio: "inherit" });
        },
        execSyncSilently(command) {
            try {
                execSync(command, { stdio: "ignore" });
            } catch {
                /* eslint-disable-line no-empty */
            }
        }
    }
};
