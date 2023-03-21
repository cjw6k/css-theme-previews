module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({'public': '/'});

    return {
        dir: {
            input: 'src',
            output: '_site',
        }
    };
};
