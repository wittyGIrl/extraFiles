'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox(props, context) {
    _classCallCheck(this, Checkbox);

    var _this = _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, props, context));

    _initialiseProps.call(_this);

    var value = props.value,
        off = props.off;

    if ((0, _utils.isNil)(value)) {
      value = off;
    }
    _this.state = {
      value: value
    };
    return _this;
  }

  _createClass(Checkbox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autofocus) {
        this.focus();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.state.value) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.refs.input.focus();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          label = _props.label,
          className = _props.className,
          name = _props.name,
          inline = _props.inline,
          on = _props.on,
          off = _props.off,
          noedit = _props.noedit,
          style = _props.style,
          autofocus = _props.autofocus,
          disabled = _props.disabled,
          readOnly = _props.readOnly;

      var componentClass = (0, _classnames2.default)('x-editor', 'x-checkbox', className);
      var rootStyle = Object.assign({
        display: inline ? 'inline-block' : 'block'
      }, style);

      var value = this.state.value;
      if ((0, _utils.isNil)(value)) {
        value = '';
      }
      var checkbox;
      if (noedit) {
        checkbox = _react2.default.createElement('input', { type: 'checkbox', ref: 'input', className: componentClass,
          name: name, value: value,
          readOnly: true, disabled: disabled,
          checked: this._isChecked(value)
        });
      } else {
        checkbox = _react2.default.createElement('input', { type: 'checkbox', ref: 'input', className: componentClass,
          name: name, value: value,
          readOnly: readOnly, disabled: disabled,
          checked: this._isChecked(value),
          onChange: this._handleChange });
      }
      if ((0, _utils.isNil)(label)) {
        return checkbox;
      }
      return _react2.default.createElement(
        'label',
        { className: 'x-checkbox-container', style: rootStyle },
        checkbox,
        label && _react2.default.createElement(
          'span',
          { className: 'x-checkbox-label' },
          label
        )
      );
    }
  }, {
    key: '_isChecked',
    value: function _isChecked(value) {
      var on = this.props.on;

      if (value === on) return true;
      if ((0, _utils.isString)(value)) {
        return value === on || value.toLowerCase() === on;
      }
      return false;
    }
  }]);

  return Checkbox;
}(_react.Component);

Checkbox.propTypes = {
  className: _react.PropTypes.string,
  on: _react.PropTypes.any,
  off: _react.PropTypes.any,
  inline: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  readOnly: _react.PropTypes.bool,
  style: _react.PropTypes.object,
  noedit: _react.PropTypes.bool,
  autofocus: _react.PropTypes.bool
};
Checkbox.defaultProps = {
  on: true,
  off: false,
  inline: true,
  value: null
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._handleChange = function (e) {
    var _props2 = _this2.props,
        on = _props2.on,
        off = _props2.off,
        onBeforeChange = _props2.onBeforeChange,
        onChange = _props2.onChange;

    var flag,
        value = e.target.checked ? on : off;

    var oldValue = _this2.state.value;
    if (onBeforeChange) {
      flag = onBeforeChange(value, oldValue);
    }
    if (flag === false) return;

    _this2.setState({ value: value });
    if (onChange) {
      onChange(value, oldValue);
    }
  };
};

exports.default = Checkbox;