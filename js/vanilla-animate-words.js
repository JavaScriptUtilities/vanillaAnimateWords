/*
 * Plugin Name: Vanilla Animate Words
 * Version: 0.2.0
 * Plugin URL: https://github.com/JavaScriptUtilities/vanillaAnimateWords
 * JavaScriptUtilities Vanilla Animate Words may be freely distributed under the MIT license.
 */

var vanillaAnimateWords = function(el, settings) {
    'use strict';
    var _words = [];

    /* ----------------------------------------------------------
      Settings
    ---------------------------------------------------------- */

    /* Default settings */
    var _settings = {
        delay: 0.05,
        partDelimiter: '<br>',
        wrapEl: 'SPAN',
        innerEl: 'SPAN',
        triggerReady: function(el) {
            el.setAttribute('data-vawjs-ready', '1');
        },
        partEl: function() {
            return document.createElement('BR');
        }
    };

    /* ----------------------------------------------------------
      Set Elements
    ---------------------------------------------------------- */

    var prepareWords = function() {
        /* Freeze height */
        el.style.height = el.offsetHeight;
    };

    var splitWords = function() {

        /* Extract words */
        var _parts = el.innerHTML.trim().split(_settings.partDelimiter),
            _words;

        /* Purge element content */
        el.innerHTML = '';

        /* Extract words from parts */
        var documentFragment = document.createDocumentFragment();

        var ii = 0,
            i, len,
            y, len2;
        for (i = 0, len = _parts.length; i < len; i++) {
            _words = _parts[i].split(' ');
            if (i > 0) {
                documentFragment.appendChild(_settings.partEl());
            }
            /* Append each word */
            for (y = 0, len2 = _words.length; y < len2; y++) {
                documentFragment.appendChild(buildWord(_words[y], ii++));
            }
        }

        el.appendChild(documentFragment);
    };

    var readyWords = function() {
        el.style.height = '';
    };

    /* ----------------------------------------------------------
      Helpers
    ---------------------------------------------------------- */

    var buildWord = function(wordContent, ii) {
        var $elWrapper = document.createElement(_settings.wrapEl),
            $tmpEl = document.createElement(_settings.innerEl);
        /* Build element */
        $tmpEl.className = 'vawjs-word';
        $tmpEl.innerHTML = wordContent + ' ';
        $tmpEl.style.animationDelay = (ii * _settings.delay) + 's';
        /* Build wrapper */
        $elWrapper.className = 'vawjs-word-wrapper';
        $elWrapper.appendChild($tmpEl);
        return $elWrapper;
    };

    /* ----------------------------------------------------------
      Init script
    ---------------------------------------------------------- */
    (function(settings) {
        if (typeof settings == 'object') {
            for (var attr in settings) {
                _settings[attr] = settings[attr];
            }
        }
        if (el.getAttribute('data-vawjs-delay')) {
            _settings.delay = parseInt(el.getAttribute('data-vawjs-delay'), 10) / 1000;
        }
        prepareWords();
        splitWords();
        readyWords();
        _settings.triggerReady(el);
    }(settings));

    return this;
};
