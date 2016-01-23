/*
 *  Project: MagicButton
 *  Description: This is a button that i learn from VBPOPFlatButton.
 *  Author: god@liril.net
 *  License: MIT
 */
;(function($, window, document, undefined) {

  var pluginName = "MagicButton";
  var defaults = {
    'element': $('.MagicButton'),
    'color': '#2C97DE',
    'background-color': '#FFFFFF',
    'thickness': 10,
    'height': 100,
  };

  var DoubleSegmentState = {
    Default: ['0deg', '0deg'],          // |
    FirstQuadrant: ['0deg', '-90deg'],  // |_
    SecondQuadrant: ['0deg', '90deg'],  // _|
    ThridQuadrant: ['-90deg', '0deg'],  // -|
    FourthQuadrant: ['90deg', '0deg'],  // |-
    LessThan: ['45deg', '-45deg'],      // <
    MoreThan: ['-45deg', '45deg'],      // >
    UpArrow: [
      '-135deg',
      '-45deg'
    ],  // /\
    DownArrow: ['-45deg', '-135deg'],    // \/
    Minus: ['-90deg', '-90deg'],  // --
    Slash45: [
      '-45deg',
      '-45deg'
    ],  // \
    BackSlash45: ['45deg', '45deg'],     // /
    Slash30: [
      '-30deg',
      '-30deg'
    ],  // \
    BackSlash30: ['30deg', '30deg'],     // /
    Slash60: [
      '-60deg',
      '-60deg'
    ],  // \
    BackSlash60: ['60deg', '60deg']      // /
  };
  var ButtonType = [
    'Default',  // Vertical line
    'Add',      // +
    'Minus',    // -
    'Close',    // x
    'Back',     // <
    'Forward',  // >
    'Menu',     // 3horizontal lines
    'Download',
    'Share',
    'DownBasic',
    'UpBasic',
    'DownArrow',
    'Paused',
    'RightTriangle',
    'LeftTriangle',
    'UpTriangle',
    'DownTriangle',
    'Ok',
    'Rewind',
    'FastForward',
    'Square',
  ];


  function MagicButton(elem, options) {
    this.settings = $.extend({}, defaults, options);
    this.settings.thickness = Math.floor(this.settings.thickness / 2) * 2;
    this.css = {};
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }


  $.extend(MagicButton.prototype, {
    init: function() {
      this.html =
          '<div class="mb-wrap"><div class="line"><div class="topLine"></div><div class="bottomLine"></div></div><div class="line"><div class="topLine"></div><div class="bottomLine"></div></div><div class="line"><div class="topLine"></div><div class="bottomLine"></div></div></div>';
      this.css.elem = {
        'top': 0,
        'left': 0,
        'width': this.settings.height + 'px',
        'height': this.settings.height + 'px',
        'position': 'relative',
      };
      this.css.lineDiv = {
        'background': this.settings.color,
        'border-radius': this.settings.thickness + 'px',
        'position': 'absolute',
        'width': '100%'
      };
      this.css.lineTopLine = {
        'top': 0,
        'height':
            (this.settings.height / 2 + this.settings.thickness / 2) + 'px'
      };
      this.css.lineBottomeLine = {
        'bottom': 0,
        'height':
            (this.settings.height / 2 + this.settings.thickness / 2) + 'px'
      };
      this.css.line = {
        'width': this.settings.thickness + 'px',
        'height': this.settings.height + 'px',
        'position': 'absolute',
        'top': 0,
        'left': (this.settings.height - this.settings.thickness) / 2 + 'px'
      };
    },

    newButton: function(elem) {
      elem[0].innerHTML = this.html;
      elem.css('display', 'inline-block');
      elem.find('.mb-wrap').css(this.css.elem);
      var lines = $(elem).find('.line');
      for (var i = 0; i < lines.length; i++) {
        $(lines[i]).css(this.css.line);
        $(lines[i])
            .find('.topLine')
            .css(this.css.lineDiv)
            .css(this.css.lineTopLine)
            .css(
                this.prefixCSS(
                    'transform-origin',
                    'center ' + this.settings.height / 2 + 'px'));
        $(lines[i])
            .find('.bottomLine')
            .css(this.css.lineDiv)
            .css(this.css.lineBottomeLine)
            .css(
                this.prefixCSS(
                    'transform-origin',
                    'center ' + this.settings.thickness / 2 + 'px'));
      }

      this.changeTo(elem, elem.attr('data-mb'));
    },

    typeCounts: function() { return ButtonType.length; },

    prefixCSS: function(method, attr) {
      var prefix = ['', '-ms-', '-webkit-', '-moz-', '-o-'];
      var css = {};
      for (var index in prefix) {
        css[prefix[index] + method] = attr;
      }
      return css;
    },

    changeSegment: function(elem, type, animated) {
      if (animated) {
        transition = this.prefixCSS(
            'transition', 'all 600ms cubic-bezier(0.68, -1, 0.265, 1.55)');
      } else {
        transition = this.prefixCSS('transition', 'all 0');
      }
      var topValue = DoubleSegmentState[type][0];
      var bottomValue = DoubleSegmentState[type][1];
      $(elem)
          .find('.topLine')
          .css(transition)
          .css(this.prefixCSS('transform', 'rotate(' + topValue + ')'));
      $(elem)
          .find('.bottomLine')
          .css(transition)
          .css(this.prefixCSS('transform', 'rotate(' + bottomValue + ')'));
    },

    moveLine: function(line, top, left, animated) {
      var transition;
      if (animated) {
        transition = this.prefixCSS('transition', 'all 600ms ease');
      } else {
        transition = this.prefixCSS('transition', 'all 0');
      }
      $(line)
          .css(transition)
          .css('top', top)
          .css(
              'left',
              ((this.settings.height - this.settings.thickness) / 2) + left);
    },

    show: function(elem, animated) {
      var transition;
      if (animated) {
        transition = this.prefixCSS('transition', 'all 600ms ease');
      } else {
        transition = this.prefixCSS('transition', 'all 0');
      }
      $(elem).css(transition).css('opacity', '1.0');
    },

    hide: function(elem, animated) {
      var transition;
      if (animated) {
        transition = this.prefixCSS('transition', 'all 600ms ease');
      } else {
        transition = this.prefixCSS('transition', 'all 0');
      }
      $(elem).css(transition).css('opacity', '0.0');
    },

    changeTo: function(elem, type) {
      if (!type) return;
      var lines = $(elem).find('.line');
      var width = lines.width();
      var height = lines.height();
      this.show(lines[0], true);
      this.show(lines[1], true);
      this.hide(lines[2], true);
      this.moveLine(lines[0], 0, 0);
      this.moveLine(lines[1], 0, 0);
      this.moveLine(lines[2], 0, 0);
      switch (type) {
        case 'Add':
          this.changeSegment(lines[0], 'FirstQuadrant', true);
          this.changeSegment(lines[1], 'ThridQuadrant', true);
          break;
        case 'Back':
          this.changeSegment(lines[0], 'LessThan', true);
          this.changeSegment(lines[1], 'LessThan', true);
          this.hide(lines[1], true);
          this.moveLine(lines[0], 0, -height / 5);
          this.moveLine(lines[1], 0, -height / 5);
          break;
        case 'Close':
          this.changeSegment(lines[0], 'LessThan', true);
          this.changeSegment(lines[1], 'MoreThan', true);
          break;
        case 'Default':
          this.changeSegment(lines[0], 'Default', true);
          this.changeSegment(lines[1], 'Default', true);
          break;
        case 'Forward':
          this.changeSegment(lines[0], 'MoreThan', true);
          this.changeSegment(lines[1], 'MoreThan', true);
          this.hide(lines[1], true);
          this.moveLine(lines[0], 0, height / 5);
          this.moveLine(lines[1], 0, height / 5);
          break;
        case 'Menu':
          this.show(lines[2], true);
          this.changeSegment(lines[0], 'Minus', true);
          this.changeSegment(lines[1], 'Minus', true);
          this.changeSegment(lines[2], 'Minus', true);
          this.moveLine(lines[0], -height / 3, 0);
          this.moveLine(lines[2], height / 3, 0);
          break;
        case 'Minus':
          this.changeSegment(lines[0], 'Minus', true);
          this.changeSegment(lines[1], 'Minus', true);
          break;
        case 'Download':
          this.show(lines[2], true);
          this.changeSegment(lines[0], 'Default', true);
          this.changeSegment(lines[1], 'DownArrow', true);
          this.changeSegment(lines[2], 'Minus', true);
          this.moveLine(lines[1], height / 2, 0);
          this.moveLine(lines[2], height / 2, 0);
          break;
        case 'Share':
          this.changeSegment(lines[0], 'Default', true);
          this.changeSegment(lines[1], 'UpArrow', true);
          this.moveLine(lines[1], -height / 2, 0);
          break;
        case 'DownBasic':
          this.changeSegment(lines[0], 'DownArrow', true);
          this.changeSegment(lines[1], 'DownArrow', true);
          this.hide(lines[1], true);
          this.moveLine(lines[0], height / 5, 0);
          this.moveLine(lines[1], height / 5, 0);
          break;
        case 'DownArrow':
          this.changeSegment(lines[0], 'DownArrow', true);
          this.changeSegment(lines[1], 'DownArrow', true);
          this.moveLine(lines[1], height / 2, 0);
          break;
        case 'UpBasic':
          this.changeSegment(lines[0], 'UpArrow', true);
          this.changeSegment(lines[1], 'UpArrow', true);
          this.hide(lines[1], true);
          this.moveLine(lines[0], -height / 5, 0);
          this.moveLine(lines[1], -height / 5, 0);
          break;
        case 'Paused':
          this.changeSegment(lines[0], 'Default', true);
          this.changeSegment(lines[1], 'Default', true);
          this.moveLine(lines[0], 0, -height / 5);
          this.moveLine(lines[1], 0, height / 5);
          break;
        case 'RightTriangle':
          this.show(lines[2], true);
          this.changeSegment(lines[0], 'Slash60', true);
          this.changeSegment(lines[1], 'BackSlash60', true);
          this.changeSegment(lines[2], 'Default', true);
          this.moveLine(lines[0], -height * 0.24, height / 8);
          this.moveLine(lines[1], height * 0.24, height / 8);
          this.moveLine(lines[2], 0, -height * 0.30);
          break;
        case 'LeftTriangle':
          this.show(lines[2], true);
          this.changeSegment(lines[0], 'Slash60', true);
          this.changeSegment(lines[1], 'BackSlash60', true);
          this.changeSegment(lines[2], 'Default', true);
          this.moveLine(lines[0], height * 0.24, -height / 8);
          this.moveLine(lines[1], -height * 0.24, -height / 8);
          this.moveLine(lines[2], 0, height * 0.30);
          break;
        case 'UpTriangle':
          this.show(lines[2], true);
          this.changeSegment(lines[0], 'Slash30', true);
          this.changeSegment(lines[1], 'BackSlash30', true);
          this.changeSegment(lines[2], 'Minus', true);
          this.moveLine(lines[0], -height / 8, height * 0.24);
          this.moveLine(lines[1], -height / 8, -height * 0.24);
          this.moveLine(lines[2], height * 0.30, 0);
          break;
        case 'DownTriangle':
          this.show(lines[2], true);
          this.changeSegment(lines[0], 'Slash30', true);
          this.changeSegment(lines[1], 'BackSlash30', true);
          this.changeSegment(lines[2], 'Minus', true);
          this.moveLine(lines[0], height / 8, -height * 0.24);
          this.moveLine(lines[1], height / 8, height * 0.24);
          this.moveLine(lines[2], -height * 0.30, 0);
          break;
        case 'Ok':
          this.changeSegment(lines[0], 'BackSlash45', true);
          this.changeSegment(lines[1], 'DownArrow', true);
          this.moveLine(lines[0], height / 6, height * 0.2);
          this.moveLine(lines[1], height / 2, -height * 0.14);
          break;
        case 'Rewind':
          this.changeSegment(lines[0], 'LessThan', true);
          this.changeSegment(lines[1], 'LessThan', true);
          this.moveLine(lines[0], 0, -height * 0.4);
          break;
        case 'FastForward':
          this.changeSegment(lines[0], 'MoreThan', true);
          this.changeSegment(lines[1], 'MoreThan', true);
          this.moveLine(lines[0], 0, height * 0.4);
          break;
        case 'Square':
          this.changeSegment(lines[0], 'FourthQuadrant', true);
          this.changeSegment(lines[1], 'SecondQuadrant', true);
          var delta = height / 4 - width / 4;
          this.moveLine(lines[0], -delta, -delta);
          this.moveLine(lines[1], delta, delta);
          break;
        default:
          break;
      }
    }
  });

  $.fn.MagicButton = function(options) {
    return this.each(function() {
      var mb;
      if (!$.data(this, "plugin_" + pluginName)) {
        mb = new MagicButton(this,options);
        $.data(this, "plugin_" + pluginName, mb);
        mb.newButton($(this));
      } else {
        mb = $.data(this, "plugin_" + pluginName);
      }


      if (options && options.type) {
        mb.changeTo(this, options.type);
      }
    });
  };
})(jQuery, window, document);
