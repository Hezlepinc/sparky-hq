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

// ── Admin Tool Lock ──
// Tools listed here show "Coming Soon" to visitors. Admin can toggle.
const DISABLED_TOOLS = [
    '/tools/wire-size/',
    '/tools/conduit-fill/',
    '/tools/box-fill/',
    '/tools/residential-load/',
    '/tools/generator-sizing/'
];
const ADMIN_KEY = 'sparky-admin';

function isAdmin() {
    return localStorage.getItem(ADMIN_KEY) === '1';
}

function checkToolLock() {
    const path = window.location.pathname.replace(/\/$/, '/');
    const locked = DISABLED_TOOLS.some(function(t) { return path.indexOf(t) !== -1; });
    if (!locked || isAdmin()) return;

    // Replace page content with coming soon message
    const main = document.querySelector('main') || document.querySelector('.calc-page');
    if (main) {
        main.innerHTML =
            '<div style="max-width:600px;margin:80px auto;text-align:center;padding:0 24px;">' +
            '<h1 style="font-size:2rem;margin-bottom:12px;">Coming Soon</h1>' +
            '<p style="color:#5a5a5a;font-size:1.05rem;line-height:1.7;margin-bottom:24px;">' +
            'This tool is currently being built. Check back soon.</p>' +
            '<a href="/" style="color:#D4910D;font-weight:600;text-decoration:none;">&larr; Back to Sparky HQ</a>' +
            '</div>';
    }
}

// Lock cards on homepage/tools index
function lockCards() {
    if (isAdmin()) return;
    var cards = document.querySelectorAll('.tool-card');
    cards.forEach(function(card) {
        var href = card.getAttribute('href') || '';
        var locked = DISABLED_TOOLS.some(function(t) { return href.indexOf(t) !== -1; });
        if (locked) {
            card.style.opacity = '0.55';
            card.style.pointerEvents = 'none';
            var badge = document.createElement('span');
            badge.textContent = 'Coming Soon';
            badge.style.cssText = 'display:inline-block;background:#f2f1ef;color:#888;font-size:0.75rem;font-weight:600;padding:2px 10px;border-radius:10px;margin-top:8px;';
            var body = card.querySelector('.card-body');
            if (body) body.appendChild(badge);
        }
    });
}

// Admin panel: nav link to /admin.html or keyboard shortcut
// Ctrl+Shift+A opens admin login
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        if (isAdmin()) {
            localStorage.removeItem(ADMIN_KEY);
            alert('Logged out. Refresh to see changes.');
            return;
        }
        var user = prompt('Username:');
        var pass = prompt('Password:');
        if (user === 'johnhezlep' && pass === 'admin123') {
            localStorage.setItem(ADMIN_KEY, '1');
            alert('Logged in. Refresh to see all tools.');
        } else {
            alert('Invalid credentials.');
        }
    }
});

// ── Share Button on Calculator Pages ──
document.addEventListener('DOMContentLoaded', () => {
    // Check tool lock first
    checkToolLock();
    lockCards();

    // Admin indicator
    if (isAdmin()) {
        var indicator = document.createElement('div');
        indicator.style.cssText = 'position:fixed;bottom:12px;right:12px;background:#1c1c1c;color:#D4910D;padding:6px 14px;border-radius:6px;font-size:0.75rem;font-weight:600;z-index:9999;cursor:pointer;opacity:0.85;';
        indicator.textContent = 'Admin Mode';
        indicator.title = 'Ctrl+Shift+A to log out';
        document.body.appendChild(indicator);
    }

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
