/* Sparky HQ - PWA, Install Banner, Share */

// ── Service Worker ──
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

// ── Install Banner ──
let deferredPrompt;
const DISMISS_KEY = 'sparky-install-dismissed';

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

function showInstallBanner() {
    // Already installed
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    if (navigator.standalone) return;

    // Dismissed within last 7 days
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (dismissed && Date.now() - parseInt(dismissed) < 7 * 86400000) return;

    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    if (!deferredPrompt && !isIOS) return; // Desktop with no prompt — skip

    const banner = document.createElement('div');
    banner.id = 'install-banner';
    banner.innerHTML =
        '<span>Add Sparky HQ to your home screen for offline access</span>' +
        '<button id="install-btn">' + (isIOS ? 'How' : 'Install') + '</button>' +
        '<button id="install-x" aria-label="Dismiss">&times;</button>';
    document.body.prepend(banner);

    document.getElementById('install-x').addEventListener('click', () => {
        banner.remove();
        localStorage.setItem(DISMISS_KEY, Date.now().toString());
    });

    const btn = document.getElementById('install-btn');

    if (deferredPrompt) {
        // Android / Chrome
        btn.addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(() => { banner.remove(); });
        });
    } else if (isIOS) {
        btn.addEventListener('click', () => {
            banner.querySelector('span').innerHTML =
                'Tap <strong>Share</strong> <span style="font-size:1.1em">&#x2191;</span> then <strong>Add to Home Screen</strong>';
            btn.style.display = 'none';
        });
    }
}

window.addEventListener('load', () => {
    setTimeout(showInstallBanner, 1500);
});

// ── Share Button on Calculator Pages ──
document.addEventListener('DOMContentLoaded', () => {
    const calcPage = document.querySelector('.calc-page');
    if (!calcPage) return;

    const h1 = calcPage.querySelector('h1');
    if (!h1) return;

    const wrap = document.createElement('div');
    wrap.className = 'calc-header';

    const shareBtn = document.createElement('button');
    shareBtn.className = 'btn-share';
    shareBtn.innerHTML = '&#x2197; Share';

    h1.parentNode.insertBefore(wrap, h1);
    wrap.appendChild(h1);
    wrap.appendChild(shareBtn);

    shareBtn.addEventListener('click', () => {
        const title = document.title;
        const url = window.location.href;

        if (navigator.share) {
            navigator.share({ title: title, url: url });
        } else {
            navigator.clipboard.writeText(url).then(() => {
                shareBtn.textContent = 'Copied!';
                setTimeout(() => { shareBtn.innerHTML = '&#x2197; Share'; }, 2000);
            });
        }
    });
});
