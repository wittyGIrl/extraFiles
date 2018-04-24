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

var DHead = function (_Component) {
	_inherits(DHead, _Component);

	function DHead() {
		_classCallCheck(this, DHead);

		return _possibleConstructorReturn(this, (DHead.__proto__ || Object.getPrototypeOf(DHead)).apply(this, arguments));
	}

	_createClass(DHead, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    children = _props.children;

			var componentClass = (0, _classnames2.default)('x-datagrid-header', className);

			return _react2.default.createElement(
				'table',
				{ className: componentClass, cellSpacing: '0', cellPadding: '0' },
				_react2.default.createElement(
					'tbody',
					null,
					_react2.default.createElement(
						'tr',
						null,
						children
					)
				)
			);
		}
	}]);

	return DHead;
}(_react.Component);

DHead.propTypes = {
	className: _react.PropTypes.string,
	children: _react.PropTypes.node
};
DHead.defaultProps = {
	fileds: []
};
exports.default = DHead;