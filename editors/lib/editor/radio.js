'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Radio = function (_Component) {
	_inherits(Radio, _Component);

	function Radio(props, context) {
		_classCallCheck(this, Radio);

		var _this = _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).call(this, props, context));

		_initialiseProps.call(_this);

		var value = props.value,
		    options = props.options;

		if ((0, _utils.isNil)(value)) {
			if (options && options.length > 0) {
				value = options[0].value;
			} else {
				value = '';
			}
		}
		_this.state = { value: value };
		return _this;
	}

	_createClass(Radio, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.autofocus) {
				this.focus();
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.value !== this.state.value) {
				this.setState({ value: nextProps.value });
			}
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.refs.radio.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    name = _props.name,
			    noedit = _props.noedit,
			    inline = _props.inline,
			    options = _props.options,
			    disabled = _props.disabled,
			    autofocus = _props.autofocus,
			    readOnly = _props.readOnly;
			var value = this.state.value;

			var componentClass = (0, _classnames2.default)('x-radio-container', className);

			var spanStyle = {
				display: inline ? 'inline-block' : 'block'
			};

			var onChange = noedit ? null : this._handleChange;
			var children = [];
			var text;
			options = options || [];
			options.forEach(function (opt, i) {
				text = opt.text;
				children.push(_react2.default.createElement(
					'label',
					{ key: i },
					_react2.default.createElement('input', { type: 'radio', className: 'x-editor x-radio',
						ref: i === 0 ? 'radio' : null,
						name: name,
						value: opt.value,
						checked: opt.value === value,
						readOnly: noedit || readOnly,
						disabled: disabled,
						onChange: onChange
					}),
					text && _react2.default.createElement(
						'span',
						{ className: 'x-radio-label' },
						text
					)
				));
			}, this);

			return _react2.default.createElement(
				'span',
				{ className: componentClass, style: spanStyle },
				children
			);
		}
	}]);

	return Radio;
}(_react.Component);

Radio.propTypes = {
	className: _react.PropTypes.string,
	disabled: _react.PropTypes.bool,
	readOnly: _react.PropTypes.bool,
	inline: _react.PropTypes.bool,
	autofocus: _react.PropTypes.bool,
	noedit: _react.PropTypes.bool,
	style: _react.PropTypes.object
};
Radio.defaultProps = {
	inline: true
};

var _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this._handleChange = function (e) {
		var _props2 = _this2.props,
		    onBeforeChange = _props2.onBeforeChange,
		    onChange = _props2.onChange;

		var flag,
		    value = e.target.value;

		var oldValue = _this2.state.value;
		if (onBeforeChange) {
			flag = onBeforeChange(value, oldValue);
		}
		if (flag === false) return;

		_this2.setState({ value: value });
		if (onChange) {
			onChange(value, oldValue);
		}
	};
};

exports.default = Radio;