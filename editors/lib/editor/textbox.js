'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../utils');

var _mixinsUtils = require('./mixinsUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Textbox = function (_Component) {
	_inherits(Textbox, _Component);

	function Textbox(props, context) {
		_classCallCheck(this, Textbox);

		var _this = _possibleConstructorReturn(this, (Textbox.__proto__ || Object.getPrototypeOf(Textbox)).call(this, props, context));

		_initialiseProps.call(_this);

		var value = props.value;

		if ((0, _utils.isNil)(value)) {
			value = '';
		}
		_this.state = { value: value, isValid: true };
		return _this;
	}

	_createClass(Textbox, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.autofocus && !this.props.noedit) {
				this.focus();
			}
			this._createDebouncedChange();
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.value !== this.state.value) {
				var nextState = { value: nextProps.value };
				this._validateValue(nextProps.value, nextState);
				this.setState(nextState);
			}
			if (nextProps.onChange !== this.props.onChange) {
				this._createDebouncedChange();
			}
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.refs.input.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    noedit = _props.noedit,
			    multiline = _props.multiline,
			    className = _props.className,
			    width = _props.width,
			    style = _props.style,
			    required = _props.required,
			    readOnly = _props.readOnly,
			    disabled = _props.disabled,
			    placeholder = _props.placeholder,
			    invalidMessage = _props.invalidMessage,
			    requiredMessage = _props.requiredMessage,
			    rule = _props.rule,
			    delay = _props.delay,
			    autofocus = _props.autofocus,
			    props = _objectWithoutProperties(_props, ['noedit', 'multiline', 'className', 'width', 'style', 'required', 'readOnly', 'disabled', 'placeholder', 'invalidMessage', 'requiredMessage', 'rule', 'delay', 'autofocus']);

			var _state = this.state,
			    isValid = _state.isValid,
			    value = _state.value;

			if ((0, _utils.isNil)(value)) {
				value = '';
			}
			style = style || {};
			var containerStyle = {};
			// classes
			var componentClass = (0, _classnames2.default)({
				'x-textbox': !noedit,
				'x-editor-noedit': noedit,
				'x-editor-noedit-multiline': noedit && multiline,
				'x-editor': !noedit,
				'disabled': disabled
			}, className);
			var rootClass = (0, _classnames2.default)('x-textbox-container', {
				'is-invalid': !isValid || required && !value
			});

			if (!(0, _utils.isNil)(width)) {
				style.width = width;
				containerStyle.width = width;
			}

			var textbox = void 0;
			if (noedit) {
				textbox = _react2.default.createElement(
					'span',
					{ className: componentClass },
					value
				);
			} else if (multiline) {
				textbox = _react2.default.createElement('textarea', { className: componentClass, ref: 'input',
					name: name, value: value, placeholder: placeholder,
					readOnly: readOnly, disabled: disabled,
					style: style,
					onChange: this._handleChange
				});
			} else {
				textbox = _react2.default.createElement('input', { className: componentClass, ref: 'input',
					name: name, value: value, placeholder: placeholder,
					readOnly: readOnly, disabled: disabled,
					style: style,
					onChange: this._handleChange
				});
			}

			var requiredMessageElem = null;
			if (required && !value) {
				requiredMessageElem = _react2.default.createElement(
					'div',
					{ className: 'x-editor-validation' },
					requiredMessage
				);
			}

			var validationMessageElem = null;
			if (!isValid) {
				validationMessageElem = _react2.default.createElement(
					'div',
					{ className: 'x-editor-validation' },
					invalidMessage
				);
			}

			return _react2.default.createElement(
				'span',
				{ className: rootClass, style: containerStyle },
				textbox,
				requiredMessageElem,
				validationMessageElem
			);
		}
	}, {
		key: '_validateValue',
		value: function _validateValue(value, nextState) {
			var rule = this.props.rule;

			var valid,
			    type = typeof rule === 'undefined' ? 'undefined' : _typeof(rule);
			if (type === 'function') {
				valid = rule(value);
			} else if (type === 'string') {
				valid = (0, _mixinsUtils.validate)(rule, value);
			}
			if (typeof valid === 'boolean') {
				nextState.isValid = valid;
				return;
			}
			if (valid) {
				nextState.isValid = valid.isValid;
				this.props.invalidMessage = valid.message;
			}
		}
	}, {
		key: '_createDebouncedChange',
		value: function _createDebouncedChange() {
			var _props2 = this.props,
			    onChange = _props2.onChange,
			    delay = _props2.delay;

			this._debouncedChange = (0, _mixinsUtils.debounced)(onChange, delay);
		}
	}]);

	return Textbox;
}(_react.Component);

Textbox.propTypes = {
	type: _react.PropTypes.string,
	placeholder: _react.PropTypes.string,
	required: _react.PropTypes.bool,
	requiredMessage: _react.PropTypes.string,
	rule: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
	invalidMessage: _react.PropTypes.string,
	readOnly: _react.PropTypes.bool,
	delay: _react.PropTypes.number,
	autofocus: _react.PropTypes.bool
};
Textbox.defaultProps = {
	type: 'text',
	placeholder: '',
	required: false,
	requiredMessage: '该项为必填项',
	rule: '',
	invalidMessage: '请输入有效值',
	value: '',
	readOnly: false,
	delay: 1000
};

var _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this._handleChange = function (e) {
		var onBeforeChange = _this2.props.onBeforeChange;

		var flag;
		var value = e.target.value;

		var oldValue = _this2.state.value;
		if (onBeforeChange) {
			flag = onBeforeChange(value, oldValue);
		}
		if (flag === false) return;

		var nextState = { value: value };
		_this2._validateValue(value, nextState);
		_this2.setState(nextState);

		if (_this2._debouncedChange) {
			_this2._debouncedChange(value, oldValue);
		}
	};
};

exports.default = Textbox;