'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _renderToLayer = require('./renderToLayer');

var _renderToLayer2 = _interopRequireDefault(_renderToLayer);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * popover layer
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


var Popover = function (_Component) {
  _inherits(Popover, _Component);

  function Popover(props, context) {
    _classCallCheck(this, Popover);

    var _this = _possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).call(this, props, context));

    _this.renderLayer = function () {
      var _this$props = _this.props,
          style = _this$props.style,
          className = _this$props.className,
          children = _this$props.children;


      style = Object.assign({}, style, {
        position: 'fixed'
      });

      return _react2.default.createElement(
        'div',
        { className: className, style: style },
        children
      );
    };

    _this.componentClickAway = function () {
      _this.requestClose('clickAway');
    };

    _this.handleResize = (0, _utils.debounce)(_this.setPlacement, 100);
    _this.handleScroll = (0, _utils.debounce)(_this.setPlacement.bind(_this, true), 100);
    return _this;
  }

  _createClass(Popover, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.setPlacement();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          open = _props.open,
          useLayerForClickAway = _props.useLayerForClickAway,
          depth = _props.depth;

      return _react2.default.createElement(
        'div',
        { style: { display: 'none' } },
        _react2.default.createElement(_reactEventListener2.default, {
          target: document,
          onScroll: this.handleScroll,
          onResize: this.handleResize
        }),
        _react2.default.createElement(_renderToLayer2.default, {
          ref: 'layer',
          open: open,
          depth: depth,
          componentClickAway: this.componentClickAway,
          useLayerForClickAway: useLayerForClickAway,
          render: this.renderLayer
        })
      );
    }
  }, {
    key: 'requestClose',
    value: function requestClose(reason) {
      if (this.props.onRequestClose) {
        this.props.onRequestClose(reason);
      }
    }
  }, {
    key: 'getAnchorPosition',
    value: function getAnchorPosition(el) {
      if (!el) {
        el = _reactDom2.default.findDOMNode(this);
      }

      var rect = el.getBoundingClientRect();
      var a = {
        top: rect.top,
        left: rect.left,
        width: el.offsetWidth,
        height: el.offsetHeight
      };

      a.right = rect.right || a.left + a.width;
      a.bottom = rect.bottom || a.top + a.height;
      a.middle = a.left + (a.right - a.left) / 2;
      a.center = a.top + (a.bottom - a.top) / 2;

      return a;
    }
  }, {
    key: 'getTargetPosition',
    value: function getTargetPosition(targetEl) {
      return {
        top: 0,
        center: targetEl.offsetHeight / 2,
        bottom: targetEl.offsetHeight,
        left: 0,
        middle: targetEl.offsetWidth / 2,
        right: targetEl.offsetWidth
      };
    }
  }, {
    key: 'setPlacement',
    value: function setPlacement(scrolling) {
      if (!this.props.open) {
        return;
      }

      var anchorEl = this.props.anchorEl || this.anchorEl;

      if (!this.refs.layer.getLayer()) {
        return;
      }

      var targetEl = this.refs.layer.getLayer().children[0];
      if (!targetEl) {
        return;
      }

      var _props2 = this.props,
          targetOrigin = _props2.targetOrigin,
          anchorOrigin = _props2.anchorOrigin;


      var anchor = this.getAnchorPosition(anchorEl);
      var target = this.getTargetPosition(targetEl);

      var targetPosition = {
        top: anchor[anchorOrigin.vertical] - target[targetOrigin.vertical],
        left: anchor[anchorOrigin.horizontal] - target[targetOrigin.horizontal]
      };

      if (scrolling && this.props.autoCloseWhenOffScreen) {
        this.autoCloseWhenOffScreen(anchor);
      }

      if (this.props.canAutoPosition) {
        target = this.getTargetPosition(targetEl); // update as height may have changed
        targetPosition = this.applyAutoPositionIfNeeded(anchor, target, targetOrigin, anchorOrigin, targetPosition);
      }

      targetEl.style.top = Math.max(0, targetPosition.top) + 'px';
      targetEl.style.left = Math.max(0, targetPosition.left) + 'px';
      targetEl.style.maxHeight = window.innerHeight + 'px';
    }
  }, {
    key: 'autoCloseWhenOffScreen',
    value: function autoCloseWhenOffScreen(anchorPosition) {
      if (anchorPosition.top < 0 || anchorPosition.top > window.innerHeight || anchorPosition.left < 0 || anchorPosition.left > window.innerWith) {
        this.requestClose('offScreen');
      }
    }
  }, {
    key: 'getOverlapMode',
    value: function getOverlapMode(anchor, target, median) {
      if ([anchor, target].indexOf(median) >= 0) return 'auto';
      if (anchor === target) return 'inclusive';
      return 'exclusive';
    }
  }, {
    key: 'getPositions',
    value: function getPositions(anchor, target) {
      var a = _extends({}, anchor);
      var t = _extends({}, target);

      var positions = {
        x: ['left', 'right'].filter(function (p) {
          return p !== t.horizontal;
        }),
        y: ['top', 'bottom'].filter(function (p) {
          return p !== t.vertical;
        })
      };

      var overlap = {
        x: this.getOverlapMode(a.horizontal, t.horizontal, 'middle'),
        y: this.getOverlapMode(a.vertical, t.vertical, 'center')
      };

      positions.x.splice(overlap.x === 'auto' ? 0 : 1, 0, 'middle');
      positions.y.splice(overlap.y === 'auto' ? 0 : 1, 0, 'center');

      if (overlap.y !== 'auto') {
        a.vertical = a.vertical === 'top' ? 'bottom' : 'top';
        if (overlap.y === 'inclusive') {
          t.vertical = t.vertical;
        }
      }

      if (overlap.x !== 'auto') {
        a.horizontal = a.horizontal === 'left' ? 'right' : 'left';
        if (overlap.y === 'inclusive') {
          t.horizontal = t.horizontal;
        }
      }

      return {
        positions: positions,
        anchorPos: a
      };
    }
  }, {
    key: 'applyAutoPositionIfNeeded',
    value: function applyAutoPositionIfNeeded(anchor, target, targetOrigin, anchorOrigin, targetPosition) {
      var _getPositions = this.getPositions(anchorOrigin, targetOrigin),
          positions = _getPositions.positions,
          anchorPos = _getPositions.anchorPos;

      if (targetPosition.top < 0 || targetPosition.top + target.bottom > window.innerHeight) {
        var newTop = anchor[anchorPos.vertical] - target[positions.y[0]];
        if (newTop + target.bottom <= window.innerHeight) {
          targetPosition.top = Math.max(0, newTop);
        } else {
          newTop = anchor[anchorPos.vertical] - target[positions.y[1]];
          if (newTop + target.bottom <= window.innerHeight) targetPosition.top = Math.max(0, newTop);
        }
      }
      if (targetPosition.left < 0 || targetPosition.left + target.right > window.innerWidth) {
        var newLeft = anchor[anchorPos.horizontal] - target[positions.x[0]];
        if (newLeft + target.right <= window.innerWidth) {
          targetPosition.left = Math.max(0, newLeft);
        } else {
          newLeft = anchor[anchorPos.horizontal] - target[positions.x[1]];
          if (newLeft + target.right <= window.innerWidth) targetPosition.left = Math.max(0, newLeft);
        }
      }
      return targetPosition;
    }
  }]);

  return Popover;
}(_react.Component);

Popover.propTypes = {
  anchorOrigin: _react.PropTypes.object,
  animated: _react.PropTypes.bool,
  autoCloseWhenOffScreen: _react.PropTypes.bool,
  canAutoPosition: _react.PropTypes.bool,
  onRequestClose: _react.PropTypes.func,
  open: _react.PropTypes.bool,
  style: _react.PropTypes.object,
  targetOrigin: _react.PropTypes.object,
  useLayerForClickAway: _react.PropTypes.bool,
  zDepth: _react.PropTypes.number
};
Popover.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left'
  },
  animated: true,
  autoCloseWhenOffScreen: true,
  canAutoPosition: true,
  onRequestClose: function onRequestClose() {},
  open: false,
  style: {
    overflowY: 'auto'
  },
  targetOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  useLayerForClickAway: true,
  zDepth: 1
};
exports.default = Popover;