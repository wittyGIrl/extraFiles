'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_Component) {
	_inherits(Button, _Component);

	function Button() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Button);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args))), _this), _this._handleClick = function (e) {
			if (_this.props.onClick && !_this.props.disabled) {
				_this.props.onClick(e, _this.props);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Button, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    label = _props.label,
			    icon = _props.icon,
			    disabled = _props.disabled,
			    className = _props.className,
			    width = _props.width,
			    hidden = _props.hidden,
			    style = _props.style;

			var componentClass = (0, _classnames2.default)('x-btn', className, { disabled: disabled });

			var iconElem = null;
			if (icon !== null && typeof icon !== 'undefined') {
				iconElem = _react2.default.createElement('span', { className: (0, _classnames2.default)('btn-icon', icon) });
			}

			return _react2.default.createElement(
				'button',
				{ type: 'button', className: componentClass, onClick: this._handleClick, style: style },
				label,
				iconElem
			);
		}
	}]);

	return Button;
}(_react.Component);

Button.propTypes = {
	className: _react.PropTypes.string,
	lable: _react.PropTypes.string,
	icon: _react.PropTypes.string,
	disabled: _react.PropTypes.bool,
	width: _react.PropTypes.number,
	hidden: _react.PropTypes.bool,
	style: _react.PropTypes.object
};
exports.default = Button;