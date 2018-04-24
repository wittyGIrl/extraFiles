'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _textbox = require('./editor/textbox');

var _textbox2 = _interopRequireDefault(_textbox);

var _checkbox = require('./editor/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _combobox = require('./editor/combobox');

var _combobox2 = _interopRequireDefault(_combobox);

var _radio = require('./editor/radio');

var _radio2 = _interopRequireDefault(_radio);

var _datebox = require('./editor/datebox');

var _datebox2 = _interopRequireDefault(_datebox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var types = ['textbox', 'checkbox', 'combobox', 'radio', 'datebox'];

var Editor = function (_Component) {
  _inherits(Editor, _Component);

  function Editor() {
    _classCallCheck(this, Editor);

    return _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).apply(this, arguments));
  }

  _createClass(Editor, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          type = _props.type,
          label = _props.label,
          containerStyle = _props.containerStyle,
          labelStyle = _props.labelStyle,
          delay = _props.delay,
          props = _objectWithoutProperties(_props, ['type', 'label', 'containerStyle', 'labelStyle', 'delay']);

      var labelElem = null;
      if (label) {
        labelElem = _react2.default.createElement(
          'lable',
          { className: 'x-editor-label', style: labelStyle, key: 'label' },
          label
        );
      }

      var editor = void 0;
      switch (type.toLowerCase()) {
        case 'checkbox':
          editor = _react2.default.createElement(_checkbox2.default, props);
          break;
        case 'combobox':
          editor = _react2.default.createElement(_combobox2.default, props);
          break;
        case 'radio':
          editor = _react2.default.createElement(_radio2.default, props);
          break;
        case 'datebox':
          editor = _react2.default.createElement(_datebox2.default, props);
          break;
        default:
          editor = _react2.default.createElement(_textbox2.default, _extends({}, props, { delay: delay }));
          break;
      }

      containerStyle = Object.assign({ padding: '2px 0' }, containerStyle);
      return _react2.default.createElement(
        'span',
        { style: containerStyle },
        labelElem,
        editor
      );
    }
  }]);

  return Editor;
}(_react.Component);

Editor.propTypes = {
  type: _react.PropTypes.oneOf(types)
};
Editor.defaultProps = {
  type: 'textbox'
};
exports.default = Editor;