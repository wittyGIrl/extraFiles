'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
* dom
*/
function isDescendant(parent, child) {
  var node = child.parentNode;

  while (node !== null) {
    if (node === parent) return true;
    node = node.parentNode;
  }

  return false;
}

// heavily inspired by https://github.com/Khan/react-components/blob/master/js/layered-component-mixin.jsx

var RenderToLayer = function (_Component) {
  _inherits(RenderToLayer, _Component);

  function RenderToLayer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RenderToLayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RenderToLayer.__proto__ || Object.getPrototypeOf(RenderToLayer)).call.apply(_ref, [this].concat(args))), _this), _this.onClickAway = function (event) {
      if (event.defaultPrevented) {
        return;
      }

      if (!_this.props.componentClickAway) {
        return;
      }

      if (!_this.props.open) {
        return;
      }

      var el = _this.layer;
      if (event.target !== el && event.target === window || document.documentElement.contains(event.target) && !isDescendant(el, event.target)) {
        _this.props.componentClickAway(event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RenderToLayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderLayer();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.renderLayer();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unrenderLayer();
    }
  }, {
    key: 'getLayer',
    value: function getLayer() {
      return this.layer;
    }
  }, {
    key: 'unrenderLayer',
    value: function unrenderLayer() {
      if (!this.layer) {
        return;
      }
      this.lifecycle('layerWillUnmount');

      if (this.props.useLayerForClickAway) {
        this.layer.style.position = 'relative';
        this.layer.removeEventListener('touchstart', this.onClickAway);
        this.layer.removeEventListener('click', this.onClickAway);
      } else {
        window.removeEventListener('touchstart', this.onClickAway);
        window.removeEventListener('click', this.onClickAway);
      }

      _reactDom2.default.unmountComponentAtNode(this.layer);
      document.body.removeChild(this.layer);
      this.layer = null;
    }
  }, {
    key: 'lifecycle',
    value: function lifecycle(stage) {
      var handler = this.props[stage];
      if (handler) handler(this.layer);
    }
  }, {
    key: 'createLayer',
    value: function createLayer() {
      var _this2 = this;

      this.layer = document.createElement('div');
      document.body.appendChild(this.layer);

      if (this.props.useLayerForClickAway) {
        this.layer.addEventListener('touchstart', this.onClickAway);
        this.layer.addEventListener('click', this.onClickAway);
        this.layer.style.position = 'fixed';
        this.layer.style.top = 0;
        this.layer.style.bottom = 0;
        this.layer.style.left = 0;
        this.layer.style.right = 0;
        this.layer.style.zIndex = this.props.depth;
      } else {
        setTimeout(function () {
          window.addEventListener('touchstart', _this2.onClickAway);
          window.addEventListener('click', _this2.onClickAway);
        }, 0);
      }
    }
  }, {
    key: 'renderLayer',
    value: function renderLayer() {
      var _props = this.props,
          open = _props.open,
          render = _props.render,
          componentDidUpdate = _props.componentDidUpdate;


      if (open) {
        var mounted = !!this.layer;
        if (mounted) {
          this.lifecycle('layerWillUpdate');
        } else {
          this.createLayer();
          this.lifecycle('layerWillMount');
        }
        // By calling this method in componentDidMount() and
        // componentDidUpdate(), you're effectively creating a "wormhole" that
        // funnels React's hierarchical updates through to a DOM node on an
        // entirely different part of the page.

        var layerElement = render();

        this.layerElement = _reactDom2.default.unstable_renderSubtreeIntoContainer(this, layerElement, this.layer, componentDidUpdate);
        if (mounted) {
          this.lifecycle('layerDidUpdate');
        } else {
          this.lifecycle('layerDidMount');
        }
      } else {
        this.unrenderLayer();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return RenderToLayer;
}(_react.Component);

RenderToLayer.propTypes = {
  open: _react.PropTypes.bool,
  depth: _react.PropTypes.number,
  useLayerForClickAway: _react.PropTypes.bool
};
RenderToLayer.defaultProps = {
  open: false,
  depth: 2000,
  useLayerForClickAway: true
};
exports.default = RenderToLayer;