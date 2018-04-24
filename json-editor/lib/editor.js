'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _collapsableField = require('./collapsableField');

var _collapsableField2 = _interopRequireDefault(_collapsableField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

require("../less/index.less");

var JsonEditor = _react2.default.createClass({
  displayName: 'JsonEditor',
  getInitialState: function getInitialState() {
    return {
      data: this.props.data || {}
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ data: nextProps.data });
    }
  },
  render: function render() {
    var _props = this.props,
        data = _props.data,
        props = _objectWithoutProperties(_props, ['data']);

    var data = this.state.data;


    return _react2.default.createElement(_collapsableField2.default, _extends({}, props, {
      data: data,
      onAdd: this._handleAdd,
      onRemoveChild: this._handleRemove,
      onChange: this._handleChange
    }));
  },
  _handleAdd: function _handleAdd(target, child) {
    if ((0, _utils.isArray)(target)) {
      target.push(child);
    } else {
      Object.assign(target, child);
    }
    this.refresh();
  },
  _handleRemove: function _handleRemove(target, index) {
    if ((0, _utils.isArray)(target)) {
      target.splice(index, 1);
    } else {
      delete target[index];
    }
    this.refresh();
  },
  _handleChange: function _handleChange(value, oldValue) {
    if (this.props.onChange) {
      this.props.onChange(value, oldValue);
    }
    this.refresh();
  },
  refresh: function refresh() {
    this.setState({ data: this.state.data });
  }
});

exports.default = JsonEditor;