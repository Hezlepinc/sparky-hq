/* Sparky HQ - PWA, Install Banner, Share, Admin */

// ── Service Worker ──
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

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

// ── Admin Tool Lock System ──
var ALL_TOOLS = [
    { path: '/tools/voltage-drop/',    name: 'Voltage Drop' },
    { path: '/tools/wire-size/',       name: 'Wire Size' },
    { path: '/tools/conduit-fill/',    name: 'Conduit Fill' },
    { path: '/tools/box-fill/',        name: 'Box Fill' },
    { path: '/tools/residential-load/', name: 'Dwelling Load Calc' },
    { path: '/tools/generator-sizing/', name: 'Generator Sizing' }
];

// Default: only voltage-drop is live
var DEFAULT_ENABLED = ['/tools/voltage-drop/'];

var ADMIN_KEY = 'sparky-admin';
var ENABLED_KEY = 'sparky-enabled-tools';

function isAdmin() {
    return localStorage.getItem(ADMIN_KEY) === '1';
}

function getEnabledTools() {
    var stored = localStorage.getItem(ENABLED_KEY);
    if (stored) {
        try { return JSON.parse(stored); } catch(e) {}
    }
    return DEFAULT_ENABLED;
}

function setEnabledTools(list) {
    localStorage.setItem(ENABLED_KEY, JSON.stringify(list));
}

function isToolEnabled(path) {
    return getEnabledTools().indexOf(path) !== -1;
}

function checkToolLock() {
    if (isAdmin()) return;
    var path = window.location.pathname;
    if (!path.endsWith('/')) path += '/';

    var isTool = ALL_TOOLS.some(function(t) { return path.indexOf(t.path) !== -1; });
    if (!isTool) return;

    var enabled = ALL_TOOLS.some(function(t) {
        return path.indexOf(t.path) !== -1 && isToolEnabled(t.path);
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
    if (isAdmin()) return;
    var cards = document.querySelectorAll('.tool-card');
    cards.forEach(function(card) {
        var href = card.getAttribute('href') || '';
        var match = ALL_TOOLS.find(function(t) { return href.indexOf(t.path) !== -1; });
        if (match && !isToolEnabled(match.path)) {
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

// ── Admin Login (Ctrl+Shift+A) ──
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        if (isAdmin()) {
            localStorage.removeItem(ADMIN_KEY);
            location.reload();
            return;
        }
        var user = prompt('Username:');
        if (!user) return;
        var pass = prompt('Password:');
        if (!pass) return;
        if (user === 'johnhezlep' && pass === 'admin123') {
            localStorage.setItem(ADMIN_KEY, '1');
            location.reload();
        } else {
            alert('Invalid credentials.');
        }
    }
});

// ── Admin Panel UI ──
function buildAdminPanel() {
    if (!isAdmin()) return;

    var enabled = getEnabledTools();

    var panel = document.createElement('div');
    panel.id = 'admin-panel';

    var header = '<div class="ap-header">' +
        '<strong>Admin Panel</strong>' +
        '<button id="ap-close" title="Minimize">&ndash;</button>' +
        '</div>';

    var rows = '';
    ALL_TOOLS.forEach(function(tool) {
        var on = enabled.indexOf(tool.path) !== -1;
        rows +=
            '<label class="ap-row">' +
            '<span>' + tool.name + '</span>' +
            '<input type="checkbox" data-path="' + tool.path + '"' + (on ? ' checked' : '') + '>' +
            '<span class="ap-toggle"></span>' +
            '</label>';
    });

    var footer = '<div class="ap-footer">' +
        '<button id="ap-logout">Log Out</button>' +
        '</div>';

    panel.innerHTML = header + '<div class="ap-body">' + rows + '</div>' + footer;
    document.body.appendChild(panel);

    // Toggle handler
    panel.querySelectorAll('input[type="checkbox"]').forEach(function(cb) {
        cb.addEventListener('change', function() {
            var path = cb.getAttribute('data-path');
            var list = getEnabledTools();
            if (cb.checked) {
                if (list.indexOf(path) === -1) list.push(path);
            } else {
                list = list.filter(function(p) { return p !== path; });
            }
            setEnabledTools(list);
            // Update card visuals if on homepage
            updateCardStates();
        });
    });

    // Minimize/expand
    var minimized = false;
    document.getElementById('ap-close').addEventListener('click', function() {
        minimized = !minimized;
        panel.querySelector('.ap-body').style.display = minimized ? 'none' : '';
        panel.querySelector('.ap-footer').style.display = minimized ? 'none' : '';
        this.innerHTML = minimized ? '+' : '&ndash;';
    });

    // Logout
    document.getElementById('ap-logout').addEventListener('click', function() {
        localStorage.removeItem(ADMIN_KEY);
        location.reload();
    });
}

function updateCardStates() {
    var cards = document.querySelectorAll('.tool-card');
    cards.forEach(function(card) {
        var href = card.getAttribute('href') || '';
        var match = ALL_TOOLS.find(function(t) { return href.indexOf(t.path) !== -1; });
        if (!match) return;

        var on = isToolEnabled(match.path);
        card.style.opacity = on ? '' : '0.5';

        // Update or add/remove badge
        var existing = card.querySelector('.coming-soon-badge');
        if (!on && !existing) {
            var badge = document.createElement('span');
            badge.className = 'coming-soon-badge';
            badge.textContent = 'Coming Soon';
            badge.style.cssText = 'display:inline-block;background:#f2f1ef;color:#888;font-size:0.75rem;font-weight:600;padding:2px 10px;border-radius:10px;margin-top:8px;';
            var body = card.querySelector('.card-body');
            if (body) body.appendChild(badge);
        } else if (on && existing) {
            existing.remove();
        }
    });
}

// ── Share Button on Calculator Pages ──
document.addEventListener('DOMContentLoaded', function() {
    checkToolLock();
    lockCards();
    buildAdminPanel();

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
