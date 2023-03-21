document.onreadystatechange = () => {
    if (document.readyState === 'interactive') {
        init();
    }
};

function init() {
    if (window.top !== window.self) {
        messenger();

        return;
    }

    controls();
    listener();
}

function messenger() {
    const select = document.getElementsByTagName('select')[0];
    select.onchange = () => {
        window.parent.postMessage(select.value, '*');
    };
}

function controls() {
    const iframe = document.createElement('iframe');
    iframe.src = 'switcher.html';
    iframe.style.backgroundColor = 'none';
    iframe.style.borderRadius = '0 0 0 21px';
    iframe.style.borderWidth = '0';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.top = '0';
    iframe.style.width = 'unset';

    document.body.appendChild(iframe);
}

function listener() {
    window.addEventListener('message', event => {
        retheme(event.data);
    });
}

function retheme(stylesheet) {
    let style = document.getElementById('theme');

    if (style === null) {
        style = document.createElement('link');
        style.id = 'theme';
        style.rel = 'stylesheet';
        document.head.append(style);
    }

    style.href = stylesheet;
}
