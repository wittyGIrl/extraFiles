'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FlatButton = _react2.default.createClass({
  displayName: 'FlatButton',

  propTypes: {
    className: _react2.default.PropTypes.string
  },

  render: function render() {
    return _react2.default.createElement(_button2.default, _extends({}, this.props, { onClick: this._handleClick, type: 'flat-button' }));
  },
  _handleClick: function _handleClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props);
    }
  }
});

exports.default = FlatButton;