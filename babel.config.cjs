module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "usage",
                corejs: { version: "3.29" }
            }
        ]
    ],
    plugins: ["@babel/transform-runtime"]
};
