'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DR = function (_Component) {
	_inherits(DR, _Component);

	function DR() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, DR);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DR.__proto__ || Object.getPrototypeOf(DR)).call.apply(_ref, [this].concat(args))), _this), _this._handleClick = function (e) {
			if (_this.props.onClick) {
				_this.props.onClick(_this.props.data, _this.props);
			}
			e.stopPropagation();
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(DR, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    selected = _props.selected,
			    data = _props.data,
			    props = _objectWithoutProperties(_props, ['className', 'selected', 'data']);

			var componentClass = (0, _classnames2.default)('x-datagrid-row', className, {
				selected: selected
			});
			return _react2.default.createElement('tr', _extends({}, props, { className: componentClass, onClick: this._handleClick }));
		}
	}]);

	return DR;
}(_react.Component);

DR.propTypes = {
	className: _react.PropTypes.string,
	children: _react.PropTypes.node,
	selected: _react.PropTypes.bool
};
exports.default = DR;