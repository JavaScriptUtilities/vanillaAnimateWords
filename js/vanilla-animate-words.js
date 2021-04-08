/*
 * Plugin Name: Vanilla Animate Words
 * Version: 0.4.0
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
        wrapEl: 'SPAN',
        innerEl: 'SPAN',
        triggerReady: function(el) {
            el.setAttribute('data-vawjs-ready', '1');
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

        var _HTML = el.innerHTML,
            _sideTags = [];

        /* Extract tags content to avoid problems with spaces */
        (function() {
            var _matches = _HTML.match(/<([^>]*?)>/gi),
                _tmpTag;
            for (var i = 0, len = _matches.length; i < len; i++) {
                _tmpTag = '<__tmptag' + i + '__>';
                _sideTags.push({
                    'tag': _tmpTag,
                    'original': _matches[i],
                });
                _HTML = _HTML.replace(_matches[i], _tmpTag);
            }
        }());

        /* Extract words */
        var _words = splitSpaces(_HTML),
            _newHTML = '';

        /* Purge element content */
        el.innerHTML = '';

        /* Extract words from parts */
        var ii = 0;
        for (var i = 0, len = _words.length; i < len; i++) {
            _newHTML += callBuildWord(_words[i], ii++);
        }

        /* Reset tags content */
        (function() {
            for (var i = 0, len = _sideTags.length; i < len; i++) {
                _newHTML = _newHTML.replace(_sideTags[i].tag, _sideTags[i].original);
            }
        }());

        el.innerHTML = _newHTML;
    };

    var readyWords = function() {
        el.style.height = '';
    };

    /* ----------------------------------------------------------
      Helpers
    ---------------------------------------------------------- */

    var callBuildWord = function(wordContent, ii) {

        var _html = '';
        var rawString = wordContent.replace(/(<([^>]+)>)/gi, '').trim(),
            htmlString = wordContent.replace(rawString, '').trim();

        /* No HTML */
        if (!htmlString) {
            return buildWord(wordContent, ii);
        }

        /* Only HTML */
        if (htmlString && !rawString) {
            return htmlString.trim();
        }

        /* HTML & Words */
        var _words = splitSpaces(wordContent);
        for (var i = 0, len = _words.length; i < len; i++) {
            _html += callBuildWord(_words[i], ii);
        }

        return _html;
    };

    var buildWord = function(wordContent, ii) {

        var _html = '<' + _settings.wrapEl + ' class="vawjs-word-wrapper">';
        _html += '<' + _settings.innerEl + ' class="vawjs-word" style="animation-delay:' + (ii * _settings.delay) + 's">';
        _html += wordContent;
        _html += '</' + _settings.innerEl + '>';
        _html += '</' + _settings.wrapEl + '>';

        return _html;
    };

    function splitSpaces(string) {
        string = string.trim();
        var words = string.replace('>', '> ').replace('<', ' <').replace('</', ' </').split(' ');
        return words.filter(function(el) {
            return el;
        });
    }

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
