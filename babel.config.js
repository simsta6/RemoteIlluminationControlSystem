module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
    env: {
        production: {
            plugins: ["react-native-paper/babel"],
        },
        test: {
            plugins: ["@babel/plugin-transform-modules-commonjs"]
        }
    },
};
