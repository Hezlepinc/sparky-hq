/* Sparky HQ - PWA, Install Banner, Share, Analytics */

// ── Service Worker ──
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

// ── Analytics (GoatCounter — privacy-friendly, no cookies) ──
// Sign up free: https://www.goatcounter.com  →  set SITE_CODE below
var GC_SITE = 'sparky-hq'; // ← your goatcounter site code
(function() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') return;
    if (localStorage.getItem('sparky_unlock') === '1') return; // skip owner traffic
    var s = document.createElement('script');
    s.async = true;
    s.dataset.goatcounter = 'https://' + GC_SITE + '.goatcounter.com/count';
    s.src = '//gc.zgo.at/count.js';
    document.head.appendChild(s);
})();

// ── Install Banner ──
var deferredPrompt;
var DISMISS_KEY = 'sparky-install-dismissed';

window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
});

function showInstallBanner() {
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    if (navigator.standalone) return;

    var dismissed = localStorage.getItem(DISMISS_KEY);
    if (dismissed && Date.now() - parseInt(dismissed) < 7 * 86400000) return;

    var isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    if (!deferredPrompt && !isIOS) return;

    var banner = document.createElement('div');
    banner.id = 'install-banner';
    banner.innerHTML =
        '<span>Add Sparky HQ to your home screen for offline access</span>' +
        '<button id="install-btn">' + (isIOS ? 'How' : 'Install') + '</button>' +
        '<button id="install-x" aria-label="Dismiss">&times;</button>';
    document.body.prepend(banner);

    document.getElementById('install-x').addEventListener('click', function() {
        banner.remove();
        localStorage.setItem(DISMISS_KEY, Date.now().toString());
    });

    var btn = document.getElementById('install-btn');
    if (deferredPrompt) {
        btn.addEventListener('click', function() {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(function() { banner.remove(); });
        });
    } else if (isIOS) {
        btn.addEventListener('click', function() {
            banner.querySelector('span').innerHTML =
                'Tap <strong>Share</strong> <span style="font-size:1.1em">&#x2191;</span> then <strong>Add to Home Screen</strong>';
            btn.style.display = 'none';
        });
    }
}

window.addEventListener('load', function() {
    setTimeout(showInstallBanner, 1500);
});

// ── Tool Visibility (edit DEFAULT_ENABLED and push to publish) ──
var ALL_TOOLS = [
    { path: '/tools/voltage-drop/',    name: 'Voltage Drop' },
    { path: '/tools/wire-size/',       name: 'Wire Size' },
    { path: '/tools/conduit-fill/',    name: 'Conduit Fill' },
    { path: '/tools/box-fill/',        name: 'Box Fill' },
    { path: '/tools/residential-load/', name: 'Dwelling Load' },
    { path: '/tools/generator-sizing/', name: 'Generator Sizing' },
    { path: '/tools/circuit-design/',  name: 'Circuit Design' },
    { path: '/tools/ohms-law/',        name: 'Ohms Law' },
    { path: '/tools/conduit-bending/', name: 'Conduit Bending' },
    { path: '/tables/conduit-bending/', name: 'Conduit Bending Tables' }
];

// Add a tool path here and push to make it public
var DEFAULT_ENABLED = ['/tools/voltage-drop/', '/tools/wire-size/', '/tools/conduit-fill/', '/tools/box-fill/', '/tools/ohms-law/', '/tools/conduit-bending/', '/tables/conduit-bending/'];

// Owner bypass: visit any page with ?key=sparky to unlock all tools in this browser
(function() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('key') === 'sparky') {
        localStorage.setItem('sparky_unlock', '1');
    }
})();

function isOwnerUnlocked() {
    return localStorage.getItem('sparky_unlock') === '1';
}

function checkToolLock() {
    if (isOwnerUnlocked()) return;

    var path = window.location.pathname;
    if (!path.endsWith('/')) path += '/';

    var isTool = ALL_TOOLS.some(function(t) { return path.indexOf(t.path) !== -1; });
    if (!isTool) return;

    var enabled = ALL_TOOLS.some(function(t) {
        return path.indexOf(t.path) !== -1 && DEFAULT_ENABLED.indexOf(t.path) !== -1;
    });
    if (enabled) return;

    var main = document.querySelector('main') || document.querySelector('.calc-page');
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

function lockCards() {
    if (isOwnerUnlocked()) return;
    var cards = document.querySelectorAll('.tool-card');
    cards.forEach(function(card) {
        var href = card.getAttribute('href') || '';
        var match = ALL_TOOLS.find(function(t) { return href.indexOf(t.path) !== -1; });
        if (match && DEFAULT_ENABLED.indexOf(match.path) === -1) {
            card.style.opacity = '0.5';
            card.style.pointerEvents = 'none';
            var badge = document.createElement('span');
            badge.textContent = 'Coming Soon';
            badge.style.cssText = 'display:inline-block;background:#f2f1ef;color:#888;font-size:0.75rem;font-weight:600;padding:2px 10px;border-radius:10px;margin-top:8px;';
            var body = card.querySelector('.card-body');
            if (body) body.appendChild(badge);
        }
    });
}

// ── Share Button on Calculator Pages ──
document.addEventListener('DOMContentLoaded', function() {
    checkToolLock();
    lockCards();

    var calcPage = document.querySelector('.calc-page');
    if (!calcPage) return;

    var h1 = calcPage.querySelector('h1');
    if (!h1) return;

    var wrap = document.createElement('div');
    wrap.className = 'calc-header';

    var shareBtn = document.createElement('button');
    shareBtn.className = 'btn-share';
    shareBtn.innerHTML = '&#x2197; Share';

    h1.parentNode.insertBefore(wrap, h1);
    wrap.appendChild(h1);
    wrap.appendChild(shareBtn);

    shareBtn.addEventListener('click', function() {
        var title = document.title;
        var url = window.location.href;

        if (navigator.share) {
            navigator.share({ title: title, url: url });
        } else {
            navigator.clipboard.writeText(url).then(function() {
                shareBtn.textContent = 'Copied!';
                setTimeout(function() { shareBtn.innerHTML = '&#x2197; Share'; }, 2000);
            });
        }
    });
});
