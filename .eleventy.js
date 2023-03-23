const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const posthtml = require('posthtml');
const outputDir = '_site';

module.exports = function (eleventyConfig) {
    publishHtmlTestPages(eleventyConfig);

    eleventyConfig.addPassthroughCopy({'public': '/'});

    return {
        dir: {
            input: 'src',
            output: outputDir,
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
    if (! fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    fs.writeFileSync(outputDir + '/index.html', html5TestPage);
}

function prepareThemes(eleventyConfig) {
    let themes = {noClassCss: [], resets: []};

    const cssnano = postcss([require('cssnano')({preset: require('cssnano-preset-default')})]);
    const minifyCss = (src, dest) => {
        cssnano.process(fs.readFileSync(src), {from: src, to: dest}).then(result => {
            let baseDir = path.dirname(outputDir + '/' + dest);
            if (! fs.existsSync(baseDir)) {
                fs.mkdirSync(baseDir, {recursive: true});
            }
            fs.writeFileSync(outputDir + '/' +dest, result.css)
        });
    };

    // No-Class
    eleventyConfig.addPassthroughCopy({'node_modules/water.css/out': 'noClassCss/water.css'});
    themes.noClassCss.push(
        {name: 'water.css', css: 'noClassCss/water.css/water.min.css'},
        {name: 'water.css (light)', css: 'noClassCss/water.css/light.min.css'},
        {name: 'water.css (dark)', css: 'noClassCss/water.css/dark.min.css'},
    );

    eleventyConfig.addPassthroughCopy({'node_modules/sakura.css/css': 'noClassCss/sakura.css'});
    minifyCss('node_modules/sakura.css/css/sakura.css', 'noClassCss/sakura.css/sakura.min.css');
    minifyCss('node_modules/sakura.css/css/sakura-dark.css', 'noClassCss/sakura.css/sakura-dark.min.css');
    minifyCss('node_modules/sakura.css/css/sakura-dark-solarized.css', 'noClassCss/sakura.css/sakura-dark-solarized.min.css');
    minifyCss('node_modules/sakura.css/css/sakura-earthly.css', 'noClassCss/sakura.css/sakura-earthly.min.css');
    minifyCss('node_modules/sakura.css/css/sakura-ink.css', 'noClassCss/sakura.css/sakura-ink.min.css');
    minifyCss('node_modules/sakura.css/css/sakura-pink.css', 'noClassCss/sakura.css/sakura-pink.min.css');
    minifyCss('node_modules/sakura.css/css/sakura-vader.css', 'noClassCss/sakura.css/sakura-vader.min.css');
    themes.noClassCss.push(
        {name: 'sakura.css', css: 'noClassCss/sakura.css/sakura.min.css'},
        {name: 'sakura.css (dark)', css: 'noClassCss/sakura.css/sakura-dark.min.css'},
        {name: 'sakura.css (dark solarized)', css: 'noClassCss/sakura.css/sakura-dark-solarized.min.css'},
        {name: 'sakura.css (earthly)', css: 'noClassCss/sakura.css/sakura-earthly.min.css'},
        {name: 'sakura.css (ink)', css: 'noClassCss/sakura.css/sakura-ink.min.css'},
        {name: 'sakura.css (pink)', css: 'noClassCss/sakura.css/sakura-pink.min.css'},
        {name: 'sakura.css (vader)', css: 'noClassCss/sakura.css/sakura-vader.min.css'},
    );

    eleventyConfig.addPassthroughCopy({'node_modules/bamboo.css/dist': 'noClassCss/bamboo.css'});
    themes.noClassCss.push(
        {name: 'bamboo.css', css: 'noClassCss/bamboo.css/bamboo.min.css'},
        {name: 'bamboo.css (light)', css: 'noClassCss/bamboo.css/light.min.css'},
        {name: 'bamboo.css (dark)', css: 'noClassCss/bamboo.css/dark.min.css'},
    );

    eleventyConfig.addPassthroughCopy({'node_modules/awsm.css/dist': 'noClassCss/awsm.css'});
    themes.noClassCss.push(
        {name: 'awsm.css', css: 'noClassCss/awsm.css/awsm.min.css'},
        {name: 'awsm.css (big stone)', css: 'noClassCss/awsm.css/awsm_theme_big-stone.min.css'},
        {name: 'awsm.css (black)', css: 'noClassCss/awsm.css/awsm_theme_black.min.css'},
        {name: 'awsm.css (gondola)', css: 'noClassCss/awsm.css/awsm_theme_gondola.min.css'},
        {name: 'awsm.css (mischka)', css: 'noClassCss/awsm.css/awsm_theme_mischka.min.css'},
        {name: 'awsm.css (pastel pink)', css: 'noClassCss/awsm.css/awsm_theme_pastel-pink.min.css'},
        {name: 'awsm.css (pearl lusta)', css: 'noClassCss/awsm.css/awsm_theme_pearl-lusta.min.css'},
        {name: 'awsm.css (tasman)', css: 'noClassCss/awsm.css/awsm_theme_tasman.min.css'},
        {name: 'awsm.css (white)', css: 'noClassCss/awsm.css/awsm_theme_white.min.css'},
    );

    eleventyConfig.addPassthroughCopy({'node_modules/holiday.css/dist': 'noClassCss/holiday.css'});
    themes.noClassCss.push({name: 'holiday.css', css: 'noClassCss/holiday.css/holiday.min.css'});
    minifyCss('node_modules/holiday.css/dist/holiday.css', 'noClassCss/holiday.css/holiday.min.css');

    eleventyConfig.addPassthroughCopy({'node_modules/mvp.css/mvp.css': 'noClassCss/mvp.css/mvp.css'});
    themes.noClassCss.push({name: 'mvp.css', css: 'noClassCss/mvp.css/mvp.min.css'});
    minifyCss('node_modules/mvp.css/mvp.css', 'noClassCss/mvp.css/mvp.min.css');

    eleventyConfig.addPassthroughCopy({'node_modules/marx-css/css': 'noClassCss/marx-css'});
    themes.noClassCss.push({name: 'marx-css', css: 'noClassCss/marx-css/marx.min.css'});

    eleventyConfig.addPassthroughCopy({
        'node_modules/style.css/style.css': 'noClassCss/style.css/style.css',
        'node_modules/style.css/serif.css': 'noClassCss/style.css/serif.css'
    });
    themes.noClassCss.push(
        {name: 'style.css', css: 'noClassCss/style.css/style.min.css'},
        {name: 'style.css (serif)', css: 'noClassCss/style.css/serif.min.css'},
    );
    minifyCss('node_modules/style.css/style.css', 'noClassCss/style.css/style.min.css');
    minifyCss('node_modules/style.css/style.css', 'noClassCss/style.css/serif.min.css');

    eleventyConfig.addPassthroughCopy({'node_modules/@exampledev/new.css/new.css': 'noClassCss/new.css/new.css'});
    themes.noClassCss.push({name: 'new.css', css: 'noClassCss/new.css/new.min.css'});
    minifyCss('node_modules/@exampledev/new.css/new.css', 'noClassCss/new.css/new.min.css');

    eleventyConfig.addPassthroughCopy({'node_modules/bullframe.css/dist/css': 'noClassCss/bullframe.css'});
    themes.noClassCss.push(
        {name: 'bullframe.css', css: 'noClassCss/bullframe.css/bullframe-classless.min.css'},
        {name: 'bullframe.css (dark)', css: 'noClassCss/bullframe.css/bullframe-classless-dark.min.css'},
    );

    eleventyConfig.addPassthroughCopy({'node_modules/boltcss/bolt.min.css': 'noClassCss/boltcss/bolt.min.css'});
    themes.noClassCss.push({name: 'boltcss', css: 'noClassCss/boltcss/bolt.min.css'});

    eleventyConfig.addPassthroughCopy({'node_modules/latex.css/style.min.css': 'noClassCss/latex.css/style.min.css'});
    themes.noClassCss.push({name: 'LaTeX.css', css: 'noClassCss/latex.css/style.min.css', preload: false});

    eleventyConfig.addPassthroughCopy({'node_modules/mine.css/dist/mine.css': 'noClassCss/mine.css/mine.css'});
    themes.noClassCss.push({name: 'mine.css', css: 'noClassCss/mine.css/mine.min.css'});
    minifyCss('node_modules/mine.css/dist/mine.css', 'noClassCss/mine.css/mine.min.css');

    // Resets
    eleventyConfig.addPassthroughCopy({'node_modules/normalize.css/normalize.css': 'resets/normalize.css'});
    themes.resets.push({name: 'normalize.css', css: 'resets/normalize.min.css'});
    minifyCss('node_modules/normalize.css/normalize.css', 'resets/normalize.min.css');

    // todo: bundle optionals
    eleventyConfig.addPassthroughCopy({'node_modules/sanitize.css/sanitize.css': 'resets/sanitize.css'});
    themes.resets.push({name: 'sanitize.css', css: 'resets/sanitize.min.css'});
    minifyCss('node_modules/sanitize.css/sanitize.css', 'resets/sanitize.min.css');

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
