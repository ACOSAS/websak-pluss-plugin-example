/// <reference types="../contact" />

function submitRecipients(recipient: Recipient[]): void {
    window.parent.postMessage({
        submit: true,
        recipients: [recipient],
    }, '*');
}

function submitSize(height?: string | number): void {
    if (typeof height === 'undefined') {
        height = getComputedStyle(document.documentElement).height;
    } else if (typeof height === 'number') {
        height = `${height}px`;
    }

    window.parent.postMessage({
        resize: true,
        height: height,
    }, '*');
}

(function () {
    switch (document.readyState) {
        case 'complete':
        case 'interactive':
            submitSize();
        case 'loading':
        default:
            window.addEventListener('DOMContentLoaded', () => submitSize(), { once: true });
    }
}());