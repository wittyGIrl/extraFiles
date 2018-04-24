'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.register = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _editors = require('editors');

var _editors2 = _interopRequireDefault(_editors);

var _linkButton = require('./linkButton');

var _linkButton2 = _interopRequireDefault(_linkButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataEditor = function (_Component) {
	_inherits(DataEditor, _Component);

	function DataEditor() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, DataEditor);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DataEditor.__proto__ || Object.getPrototypeOf(DataEditor)).call.apply(_ref, [this].concat(args))), _this), _this._handleChange = function (value, oldValue) {
			var _this$props = _this.props,
			    owner = _this$props.owner,
			    target = _this$props.target,
			    onChange = _this$props.onChange;

			if (owner && target) {
				owner[target] = value;
			}
			if (onChange) {
				onChange(value, oldValue);
			}
		}, _this._handleClick = function () {
			if (_this.props.onClick) {
				_this.props.onClick(_this.props);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(DataEditor, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    owner = _props.owner,
			    target = _props.target,
			    label = _props.label,
			    type = _props.type,
			    onChange = _props.onChange,
			    props = _objectWithoutProperties(_props, ['owner', 'target', 'label', 'type', 'onChange']);

			var Component = get(type);
			if (Component) {
				return _react2.default.createElement(Component, _extends({}, props, { type: type, label: label, onChange: onChange }));
			}
			if (!type || type === 'textbox') {
				props.delay = 1000;
			}
			return _react2.default.createElement(_editors2.default, _extends({}, props, { type: type, onChange: this._handleChange }));
		}
	}]);

	return DataEditor;
}(_react.Component);

DataEditor.propTypes = {
	className: _react.PropTypes.string,
	owner: _react.PropTypes.object,
	target: _react.PropTypes.string
};
exports.default = DataEditor;


var _registerd = {};

function get(key) {
	return _registerd[key];
}
function register(key, editor) {
	_registerd[key] = editor;
}
exports.register = register;