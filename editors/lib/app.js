'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _editor = require('./editor');

var _editor2 = _interopRequireDefault(_editor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("../less/index.less");

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_editor2.default, { label: 'test', value: '', required: true, disabled: false, noedit: false }),
        _react2.default.createElement(_editor2.default, { type: 'combobox', label: 'test', noedit: false, disabled: false, readOnly: true, value: 2, options: [{ text: 'opt1', vlaue: 1 }, { text: 'opt2', value: 2 }] }),
        _react2.default.createElement(_editor2.default, { type: 'datebox', showYearDropdown: false, disabled: false, readOnly: true }),
        _react2.default.createElement(_editor2.default, { type: 'datebox', autofocus: false, value: '2017-1-3', noedit: false, showYearDropdown: true }),
        _react2.default.createElement(_editor2.default, { type: 'radio', width: 100, value: 'f', noedit: false, disabled: false, options: [{ text: 'male', value: 'm' }, { text: 'female', value: 'f' }] }),
        _react2.default.createElement(_editor2.default, { type: 'checkbox', label: 'test', noedit: false, value: true })
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;