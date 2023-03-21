const posthtml = require('posthtml');
const { Transform } = require('node:stream');

module.exports = function (eleventyConfig) {
    prepareThemes(eleventyConfig);

    eleventyConfig.addPassthroughCopy({'public': '/'});

    eleventyConfig.addPassthroughCopy({
       'node_modules/html5-test-page/index.html': 'index.html',
    }, {
        transform: () => {
            return new Transform({
                transform(chunk, encoding, callback) {
                    callback(
                        null,
                        posthtml()
                            .use(tree => {
                                tree.match({tag: "body"}, node => {
                                    node.content.push({
                                       tag: 'script',
                                       attrs: {
                                           src: 'theme-switcher.js',
                                       },
                                    });

                                    return node;
                                })
                            })
                            .process(chunk, {
                                sync: true,
                            })
                            .html
                    )
                }
            });
        }
    });

    return {
        dir: {
            input: 'src',
            output: '_site',
            layouts: '_layouts',
        }
    };
};

function prepareThemes(eleventyConfig) {
    let themes = {noClassCss: [], resets: []};

    // No-Class

    // Resets
    eleventyConfig.addPassthroughCopy({'node_modules/normalize.css/normalize.css': 'resets/normalize.css'});
    themes.resets.push({name: 'normalize.css', css: 'resets/normalize.css'});

    eleventyConfig.addGlobalData('noClassCss', themes.noClassCss);
    eleventyConfig.addGlobalData('resets', themes.resets);
}
