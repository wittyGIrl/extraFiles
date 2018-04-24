'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactHotLoader = require('react-hot-loader');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootEl = document.getElementById('root');
_reactDom2.default.render(_react2.default.createElement(
  _reactHotLoader.AppContainer,
  null,
  _react2.default.createElement(_app2.default, null)
), rootEl);

if (module.hot) {
  module.hot.accept('./app', function () {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    var NextApp = require('./app').default;
    _reactDom2.default.render(_react2.default.createElement(
      _reactHotLoader.AppContainer,
      null,
      _react2.default.createElement(NextApp, null)
    ), rootEl);
  });
}