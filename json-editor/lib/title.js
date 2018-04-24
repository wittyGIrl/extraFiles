'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _flatButton = require('./common/flatButton');

var _flatButton2 = _interopRequireDefault(_flatButton);

var _colors = require('./common/colors');

var _colors2 = _interopRequireDefault(_colors);

var _add = require('./svg/add');

var _add2 = _interopRequireDefault(_add);

var _clear = require('./svg/clear');

var _clear2 = _interopRequireDefault(_clear);

var _arrowDown = require('./svg/arrowDown');

var _arrowDown2 = _interopRequireDefault(_arrowDown);

var _arrowRight = require('./svg/arrowRight');

var _arrowRight2 = _interopRequireDefault(_arrowRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  btn: {
    width: 20,
    height: 20,
    lineHeight: '20px',
    padding: '0px',
    margin: '0px 3px',
    verticalAlign: 'middle'
  },
  rightBtn: {
    width: 20,
    height: 20,
    lineHeight: '20px',
    padding: '0px',
    margin: '0px 3px',
    verticalAlign: 'middle',
    float: 'right'
  },
  label: {
    // width: '20px',
    height: 20,
    lineHeight: '20px',
    padding: '0 5px',
    textTransform: null,
    minWidth: 50
  },
  labelStyle: {
    paddingLeft: 0,
    paddingRight: 0,
    color: '#777',
    fontSize: '13px'
  },
  svg: {
    width: 18,
    height: 18,
    margin: '0'
  },
  svgTitle: {
    width: 18,
    height: 18,
    margin: '0',
    verticalAlign: 'middle'
  }
};

var Title = _react2.default.createClass({
  displayName: 'Title',
  render: function render() {
    var _props = this.props,
        text = _props.text,
        addable = _props.addable,
        collaped = _props.collaped,
        removable = _props.removable,
        style = _props.style;

    var buttons = [];
    var index = 0;

    buttons.push(_react2.default.createElement(
      _flatButton2.default,
      {
        label: text,
        key: index++,
        style: styles.label,
        labelStyle: styles.labelStyle,
        onClick: this._handleClick
      },
      this.props.collaped ? _react2.default.createElement(_arrowRight2.default, { color: _colors2.default.grey500, style: styles.svgTitle }) : _react2.default.createElement(_arrowDown2.default, { color: _colors2.default.grey500, style: styles.svgTitle })
    ));
    if (!collaped) {
      if (addable) {
        buttons.push(_react2.default.createElement(
          _flatButton2.default,
          { style: styles.btn,
            key: index++,
            onClick: this.props.onAdd },
          _react2.default.createElement(_add2.default, { color: _colors2.default.grey500, style: styles.svg })
        ));
      }

      if (removable) {
        buttons.push(_react2.default.createElement(
          _flatButton2.default,
          { style: styles.rightBtn,
            key: index++,
            onClick: this._handleRemove },
          _react2.default.createElement(_clear2.default, { color: _colors2.default.grey500, style: styles.svg })
        ));
      }
    }

    return _react2.default.createElement(
      'div',
      { style: style },
      buttons
    );
  },
  _handleRemove: function _handleRemove() {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.index);
    }
  },
  _handleClick: function _handleClick(event) {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }
});

exports.default = Title;