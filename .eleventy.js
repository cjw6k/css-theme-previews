const posthtml = require('posthtml');
const { Transform } = require('node:stream');

module.exports = function (eleventyConfig) {
    const themes = prepareThemes(eleventyConfig);

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
                                });

                                tree.match({tag: "head"}, node => {
                                   for (let i in themes.resets) {
                                       node.content.push({
                                           tag: 'link',
                                           attrs: {
                                               rel: 'prefetch',
                                               href: themes.resets[i].css,
                                           }
                                       });
                                   }

                                   return node;
                                });
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
    eleventyConfig.addPassthroughCopy({'node_modules/water.css/out': 'noClassCss/water.css'});
    themes.noClassCss.push({name: 'water.css', css: 'noClassCss/water.css/water.css'});
    themes.noClassCss.push({name: 'water.css (light)', css: 'noClassCss/water.css/light.css'});
    themes.noClassCss.push({name: 'water.css (dark)', css: 'noClassCss/water.css/dark.css'});

    eleventyConfig.addPassthroughCopy({'node_modules/mvp.css/mvp.css': 'noClassCss/mvp.css/mvp.css'});
    themes.noClassCss.push({name: 'mvp.css', css: 'noClassCss/mvp.css/mvp.css'});

    // Resets
    eleventyConfig.addPassthroughCopy({'node_modules/normalize.css/normalize.css': 'resets/normalize.css'});
    themes.resets.push({name: 'normalize.css', css: 'resets/normalize.css'});

    eleventyConfig.addPassthroughCopy({'node_modules/sanitize.css/sanitize.css': 'resets/sanitize.css'});
    themes.resets.push({name: 'sanitize.css', css: 'resets/sanitize.css'});

    eleventyConfig.addGlobalData('noClassCss', themes.noClassCss);
    eleventyConfig.addGlobalData('resets', themes.resets);

    return themes;
}
