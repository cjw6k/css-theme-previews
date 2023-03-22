const fs = require('fs');
const posthtml = require('posthtml');

module.exports = function (eleventyConfig) {
    publishHtmlTestPages(eleventyConfig);

    eleventyConfig.addPassthroughCopy({'public': '/'});

    return {
        dir: {
            input: 'src',
            output: '_site',
            layouts: '_layouts',
        }
    };
};

function publishHtmlTestPages(eleventyConfig) {
    const themes = prepareThemes(eleventyConfig);
    const html5TestPage = decorateHtml(
        themes,
        fs.readFileSync('node_modules/html5-test-page/index.html').toString()
    );
    fs.writeFileSync('_site/index.html', html5TestPage);
}

function prepareThemes(eleventyConfig) {
    let themes = {noClassCss: [], resets: []};

    // No-Class
    eleventyConfig.addPassthroughCopy({'node_modules/water.css/out': 'noClassCss/water.css'});
    themes.noClassCss.push({name: 'water.css', css: 'noClassCss/water.css/water.css'});
    themes.noClassCss.push({name: 'water.css (light)', css: 'noClassCss/water.css/light.css'});
    themes.noClassCss.push({name: 'water.css (dark)', css: 'noClassCss/water.css/dark.css'});

    eleventyConfig.addPassthroughCopy({'node_modules/sakura.css/css': 'noClassCss/sakura.css'});
    themes.noClassCss.push({name: 'sakura.css', css: 'noClassCss/sakura.css/sakura.css'});
    themes.noClassCss.push({name: 'sakura.css (dark)', css: 'noClassCss/sakura.css/sakura-dark.css'});
    themes.noClassCss.push({name: 'sakura.css (dark solarized)', css: 'noClassCss/sakura.css/sakura-dark-solarized.css'});
    themes.noClassCss.push({name: 'sakura.css (earthly)', css: 'noClassCss/sakura.css/sakura-earthly.css'});
    themes.noClassCss.push({name: 'sakura.css (ink)', css: 'noClassCss/sakura.css/sakura-ink.css'});
    themes.noClassCss.push({name: 'sakura.css (pink)', css: 'noClassCss/sakura.css/sakura-pink.css'});
    themes.noClassCss.push({name: 'sakura.css (vader)', css: 'noClassCss/sakura.css/sakura-vader.css'});

    eleventyConfig.addPassthroughCopy({'node_modules/bamboo.css/dist': 'noClassCss/bamboo.css'});
    themes.noClassCss.push({name: 'bamboo.css', css: 'noClassCss/bamboo.css/bamboo.min.css'});
    themes.noClassCss.push({name: 'bamboo.css (light)', css: 'noClassCss/bamboo.css/light.min.css'});
    themes.noClassCss.push({name: 'bamboo.css (dark)', css: 'noClassCss/bamboo.css/dark.min.css'});

    eleventyConfig.addPassthroughCopy({'node_modules/awsm.css/dist': 'noClassCss/awsm.css'});
    themes.noClassCss.push({name: 'awsm.css', css: 'noClassCss/awsm.css/awsm.css'});
    themes.noClassCss.push({name: 'awsm.css (big stone)', css: 'noClassCss/awsm.css/awsm_theme_big-stone.css'});
    themes.noClassCss.push({name: 'awsm.css (black)', css: 'noClassCss/awsm.css/awsm_theme_black.css'});
    themes.noClassCss.push({name: 'awsm.css (gondola)', css: 'noClassCss/awsm.css/awsm_theme_gondola.css'});
    themes.noClassCss.push({name: 'awsm.css (mischka)', css: 'noClassCss/awsm.css/awsm_theme_mischka.css'});
    themes.noClassCss.push({name: 'awsm.css (pastel pink)', css: 'noClassCss/awsm.css/awsm_theme_pastel-pink.css'});
    themes.noClassCss.push({name: 'awsm.css (pearl lusta)', css: 'noClassCss/awsm.css/awsm_theme_pearl-lusta.css'});
    themes.noClassCss.push({name: 'awsm.css (tasman)', css: 'noClassCss/awsm.css/awsm_theme_tasman.css'});
    themes.noClassCss.push({name: 'awsm.css (white)', css: 'noClassCss/awsm.css/awsm_theme_white.css'});

    eleventyConfig.addPassthroughCopy({'node_modules/holiday.css/dist': 'noClassCss/holiday.css'});
    themes.noClassCss.push({name: 'holiday.css', css: 'noClassCss/holiday.css/holiday.css'});

    eleventyConfig.addPassthroughCopy({'node_modules/mvp.css/mvp.css': 'noClassCss/mvp.css/mvp.css'});
    themes.noClassCss.push({name: 'mvp.css', css: 'noClassCss/mvp.css/mvp.css'});

    eleventyConfig.addPassthroughCopy({'node_modules/marx-css/css': 'noClassCss/marx-css'});
    themes.noClassCss.push({name: 'marx-css', css: 'noClassCss/marx-css/marx.css'});

    eleventyConfig.addPassthroughCopy({'node_modules/style.css/style.css': 'noClassCss/style.css/style.css'});
    eleventyConfig.addPassthroughCopy({'node_modules/style.css/serif.css': 'noClassCss/style.css/serif.css'});
    themes.noClassCss.push({name: 'style.css', css: 'noClassCss/style.css/style.css'});
    themes.noClassCss.push({name: 'style.css (serif)', css: 'noClassCss/style.css/serif.css'});

    eleventyConfig.addPassthroughCopy({'node_modules/@exampledev/new.css/new.css': 'noClassCss/new.css/new.css'});
    themes.noClassCss.push({name: 'new.css', css: 'noClassCss/new.css/new.css'});

    eleventyConfig.addPassthroughCopy({'node_modules/bullframe.css/dist/css/bullframe-classless.css': 'noClassCss/bullframe.css/bullframe-classless.css'});
    eleventyConfig.addPassthroughCopy({'node_modules/bullframe.css/dist/css/bullframe-classless-dark.css': 'noClassCss/bullframe.css/bullframe-classless-dark.css'});
    themes.noClassCss.push({name: 'bullframe.css', css: 'noClassCss/bullframe.css/bullframe-classless.css'});
    themes.noClassCss.push({name: 'bullframe.css (dark)', css: 'noClassCss/bullframe.css/bullframe-classless-dark.css'});

    eleventyConfig.addPassthroughCopy({'node_modules/boltcss/bolt.css': 'noClassCss/boltcss/bolt.css'});
    themes.noClassCss.push({name: 'boltcss', css: 'noClassCss/boltcss/bolt.css'});

    eleventyConfig.addPassthroughCopy({'node_modules/latex.css/style.min.css': 'noClassCss/latex.css/style.min.css'});
    themes.noClassCss.push({name: 'LaTeX.css', css: 'noClassCss/latex.css/style.min.css', preload: false});

    eleventyConfig.addPassthroughCopy({'node_modules/mine.css/dist/mine.css': 'noClassCss/mine.css/mine.css'});
    themes.noClassCss.push({name: 'mine.css', css: 'noClassCss/mine.css/mine.css'});

    // Resets
    eleventyConfig.addPassthroughCopy({'node_modules/normalize.css/normalize.css': 'resets/normalize.css'});
    themes.resets.push({name: 'normalize.css', css: 'resets/normalize.css'});

    eleventyConfig.addPassthroughCopy({'node_modules/sanitize.css/sanitize.css': 'resets/sanitize.css'});
    themes.resets.push({name: 'sanitize.css', css: 'resets/sanitize.css'});

    eleventyConfig.addGlobalData('noClassCss', themes.noClassCss);
    eleventyConfig.addGlobalData('resets', themes.resets);

    return themes;
}

function decorateHtml(themes, html) {
    return posthtml()
        .use(tree => {
            tree.match({tag: "head"}, node => prefetchThemes(themes, node));
            tree.match({tag: "body"}, addThemeSwitcherToBody);
        })
        .process(html, {sync: true}).html;
}

function addThemeSwitcherToBody(node) {
    node.content.push({
        tag: 'script',
        attrs: {
            src: 'theme-switcher.js',
        },
    });

    return node;
}

function prefetchThemes(themes, node) {
    for (let i in themes.resets) {
        node.content.push({
            tag: 'link',
            attrs: {
                rel: 'prefetch',
                href: themes.resets[i].css,
            }
        });
    }

    for (let i in themes.noClassCss) {
        if (
            typeof themes.noClassCss[i].preload !== 'undefined'
            && ! themes.noClassCss[i].preload
        ) {
            continue;
        }

        node.content.push({
            tag: 'link',
            attrs: {
                rel: 'prefetch',
                href: themes.noClassCss[i].css,
            }
        });
    }

    return node;
}
