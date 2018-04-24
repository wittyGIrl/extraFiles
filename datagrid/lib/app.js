'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _datagrid = require('./datagrid');

var _datagrid2 = _interopRequireDefault(_datagrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("editors/less/index.less");

var props = {
  data: {
    rows: [{ id: 8, name: 'Emma', age: 18, gender: 'F' }, { id: 9, name: 'Avril', age: 17, gender: 'F' }, { id: 10, name: 'Jerry', age: 17, gender: 'M' }, { id: 11, name: 'Mike', age: 17, gender: 'M' }],
    total: 4
  },
  columns: [{ field: 'id', label: 'id', width: '100', hidden: true }, { field: 'today', label: 'today', width: '50', editor: 'datebox' }, { field: 'name', label: 'name', width: '150', formatter: '{name}: {age}', editor: 'textbox' }, { field: 'age', label: 'age', width: '200', editor: { type: 'combobox', options: [{ text: '17', value: 17 }, { text: '18', value: 18 }] } }, { field: 'gnder', label: 'xingbie', width: '200', editor: { type: 'radio', options: [{ text: 'male', value: 'male' }, { text: 'female', value: 'female' }] } }, { field: 'gender', label: 'gender', width: '50', editor: { type: 'checkbox', on: 'M', off: 'F' } }, { field: 'date', label: 'date', width: '50', editor: 'datebox' }],
  fit: false,
  inlineEdit: false,
  pagination: true,
  readOnly: true
};
function formatter(value, row) {
  return 'name: ' + value;
}

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_datagrid2.default, props);
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;