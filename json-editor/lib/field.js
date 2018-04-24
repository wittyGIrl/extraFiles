'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _colors = require('./common/colors');

var _colors2 = _interopRequireDefault(_colors);

var _flatButton = require('./common/flatButton');

var _flatButton2 = _interopRequireDefault(_flatButton);

var _clear = require('./svg/clear');

var _clear2 = _interopRequireDefault(_clear);

var _textbox = require('editors/lib/editor/textbox');

var _textbox2 = _interopRequireDefault(_textbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  root: {
    margin: '0.25em 0 ',
    position: 'relative'
  },
  rightBtn: {
    width: 25,
    height: 25,
    padding: '0px',
    margin: '0px 3px',
    verticalAlign: 'middle',
    float: 'right'
  },
  svg: {
    width: 18,
    height: 18,
    margin: '0'
  }
};

var Field = _react2.default.createClass({
  displayName: 'Field',
  render: function render() {
    var _props = this.props,
        label = _props.label,
        index = _props.index,
        editable = _props.editable,
        className = _props.className,
        children = _props.children,
        labelStyle = _props.labelStyle,
        style = _props.style;

    var componentClass = (0, _classnames2.default)('x-json-field', className);
    var labelElem, deleteBtn;
    if (editable) {
      labelElem = _react2.default.createElement(_textbox2.default, { value: index,
        delay: 1000,
        onChange: this._handleLabelChange,
        width: 100,
        style: { minWidth: 100 } });
      deleteBtn = _react2.default.createElement(
        _flatButton2.default,
        { style: styles.rightBtn,
          onClick: this._handleRemove },
        _react2.default.createElement(_clear2.default, { color: _colors2.default.grey500, style: styles.svg })
      );
    } else if (label) {
      labelElem = _react2.default.createElement(
        'label',
        { className: 'x-json-label', style: labelStyle },
        label
      );
    }
    return _react2.default.createElement(
      'div',
      { className: className, style: Object.assign(styles.root, style) },
      labelElem,
      children,
      deleteBtn
    );
  },
  _handleLabelChange: function _handleLabelChange(value) {
    if (!value || !this.props.owner) return;
    var _props2 = this.props,
        owner = _props2.owner,
        index = _props2.index,
        onLabelChange = _props2.onLabelChange;

    if (value !== index) {
      owner[value] = owner[index];
      delete owner[index];
      if (onLabelChange) {
        onLabelChange();
      }
    }
  },
  _handleRemove: function _handleRemove() {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.index);
    }
  }
});

exports.default = Field;