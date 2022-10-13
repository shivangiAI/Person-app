// const cucumber = require("cypress-cucumber-preprocessor").default;
// const browserify = require("@cypress/browserify-preprocessor");

// module.exports = (on:any) => {
//     const options = {
//         ...browserify.defaultOptions,
//         typescript: require.resolve("typescript"),
//     };

//     on("file:preprocessor", cucumber(options));
// };

const browserify = require('@cypress/browserify-preprocessor');
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = (on, config) => {
    const options = {
        ...browserify.defaultOptions,
        typescript: require.resolve('typescript'),
    };

    on('file:preprocessor', cucumber(options));
    on('task', {
        log(message) {
        console.log(message)

        return null
        },
    })
};