/* Sparky HQ - Input Validation Library
   Deterministic validation for all calculators.
   Zero cost, zero latency, works offline. */

var SparkyValidate = (function() {

    // ── Rule Processors ──

    function processRules(rules) {
        var errors = [];
        var warnings = [];

        rules.forEach(function(r) {
            var msg = null;
            var level = r.level || 'error';

            switch (r.rule) {
                case 'required':
                    if (r.value === null || r.value === undefined || r.value === '' || (typeof r.value === 'number' && isNaN(r.value))) {
                        msg = r.msg || ('Enter ' + (r.label || 'a value'));
                    }
                    break;

                case 'gt':
                    if (typeof r.value === 'number' && !isNaN(r.value) && r.value <= (r.min || 0)) {
                        msg = r.msg || ((r.label || 'Value') + ' must be greater than ' + (r.min || 0));
                    }
                    break;

                case 'range':
                    if (typeof r.value === 'number' && !isNaN(r.value)) {
                        if (r.min !== undefined && r.value < r.min) {
                            msg = r.msg || ((r.label || 'Value') + ' must be at least ' + r.min);
                        } else if (r.max !== undefined && r.value > r.max) {
                            msg = r.msg || ((r.label || 'Value') + ' exceeds ' + r.max.toLocaleString() + ' \u2014 verify input');
                        }
                    }
                    break;

                case 'maxForVoltage':
                    if (typeof r.value === 'number' && !isNaN(r.value) && r.voltage) {
                        var v = parseFloat(r.voltage);
                        var limit = null;
                        if (v <= 120 && r.value > 400) limit = 400;
                        else if (v <= 240 && r.value > 800) limit = 800;
                        else if (v <= 480 && r.value > 2000) limit = 2000;

                        if (limit !== null) {
                            level = 'warning';
                            msg = r.value.toLocaleString() + 'A on ' + v + 'V is unusual \u2014 verify input';
                        }
                    }
                    break;

                case 'custom':
                    if (r.test) {
                        msg = r.msg || 'Validation failed';
                        level = r.level || 'warning';
                    }
                    break;
            }

            if (msg) {
                if (level === 'error') {
                    errors.push(msg);
                } else {
                    warnings.push(msg);
                }
            }
        });

        return {
            valid: errors.length === 0,
            errors: errors,
            warnings: warnings
        };
    }

    // ── Display Functions ──

    function showMessages(containerId, result) {
        clearMessages(containerId);
        var container = document.getElementById(containerId);
        if (!container) return;

        if (result.errors.length > 0) {
            var box = document.createElement('div');
            box.className = 'validation-errors';
            var html = '<strong>Please fix the following:</strong><ul>';
            result.errors.forEach(function(e) {
                html += '<li>' + e + '</li>';
            });
            html += '</ul>';
            box.innerHTML = html;
            container.appendChild(box);
        }

        if (result.warnings.length > 0) {
            var box = document.createElement('div');
            box.className = 'validation-warnings';
            var html = '<strong>Heads up:</strong><ul>';
            result.warnings.forEach(function(w) {
                html += '<li>' + w + '</li>';
            });
            html += '</ul>';
            box.innerHTML = html;
            container.appendChild(box);
        }
    }

    function clearMessages(containerId) {
        var container = document.getElementById(containerId);
        if (!container) return;
        var boxes = container.querySelectorAll('.validation-errors, .validation-warnings');
        boxes.forEach(function(b) { b.remove(); });
    }

    // ── Session Logging (no PII) ──

    function logApply() {
        var key = 'sparky_apply_count';
        var count = parseInt(sessionStorage.getItem(key) || '0');
        sessionStorage.setItem(key, (count + 1).toString());
    }

    // ── Public API ──

    return {
        check: processRules,
        showMessages: showMessages,
        clearMessages: clearMessages,
        logApply: logApply
    };

})();
