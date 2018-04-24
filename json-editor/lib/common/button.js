'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Button = _react2.default.createClass({
  displayName: 'Button',

  propTypes: {
    className: _react2.default.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      type: 'flat-button'
    };
  },
  render: function render() {
    var _props = this.props,
        type = _props.type,
        label = _props.label,
        labelStyle = _props.labelStyle,
        children = _props.children,
        disabled = _props.disabled,
        className = _props.className,
        props = _objectWithoutProperties(_props, ['type', 'label', 'labelStyle', 'children', 'disabled', 'className']);

    var componentClass = (0, _classnames2.default)(type, className, {
      disabled: disabled
    });

    return _react2.default.createElement(
      'button',
      _extends({}, props, { type: 'button', className: componentClass, onClick: this._handleClick }),
      _react2.default.createElement(
        'span',
        { style: labelStyle },
        label
      ),
      children
    );
  },
  _handleClick: function _handleClick(e) {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick(e, this.props);
    }
  }
});

exports.default = Button;