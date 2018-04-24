'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils.js');

var _button = require('./common/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_Component) {
	_inherits(Pagination, _Component);

	function Pagination(props, context) {
		_classCallCheck(this, Pagination);

		//为什么将index作为state？因为index在props中的时候，无法将其修改修改为空。
		//index作为state的时候，如果index为空，则不会刷新datagrid，只有当index为有效值的时候才会刷新。
		var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props, context));

		_this._onChangeIndex = function (index) {
			if (typeof index !== 'number') return;
			if (index < 1) {
				index = 1;
			} else if (index > _this._pageTotal) {
				index = _this._pageTotal;
			}
			if (_this.props.onChangeIndex) {
				_this.props.onChangeIndex(index);
			}
		};

		_this._handleChangeSize = function (e) {
			var size = e.target.value - 0;
			if (_this.props.onChangeSize) {
				_this.props.onChangeSize(size);
			}
		};

		_this._handleEditIndex = function (e) {
			var index = e.target.value;
			if (!index) {
				_this.setState({ index: index });
			} else {
				_this._onChangeIndex(index - 0);
			}
		};

		_this.state = {
			index: props.index
		};
		return _this;
	}

	_createClass(Pagination, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var index = this.state.index;
			if (nextProps.index !== this.state.index) {
				index = nextProps.index;
			}
			if (nextProps.size !== this.props.size) {
				var pageTotal = Math.ceil(nextProps.total / nextProps.size);
				pageTotal = pageTotal === 0 ? 1 : pageTotal;
				index = index > pageTotal ? pageTotal : index;
			}
			if (index !== this.state.index) {
				this.setState({ index: index });
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this,
			    _React$createElement,
			    _React$createElement2,
			    _React$createElement3,
			    _React$createElement4;

			var _props = this.props,
			    total = _props.total,
			    index = _props.index,
			    size = _props.size,
			    label = _props.label,
			    options = _props.options,
			    className = _props.className,
			    readOnly = _props.readOnly,
			    onChangeSize = _props.onChangeSize,
			    onChangeIndex = _props.onChangeIndex,
			    onReload = _props.onReload;

			var componentClass = (0, _classnames2.default)('x-datagrid-pagination', className);
			var optionElems = [];

			options.forEach(function (opt, i) {
				optionElems.push(_react2.default.createElement(
					'option',
					{ value: opt, key: i },
					opt
				));
			});

			var pageTotal = Math.ceil(total / size);
			pageTotal = pageTotal === 0 ? 1 : pageTotal;
			this._pageTotal = pageTotal;
			index = index > pageTotal ? pageTotal : index;
			var start = size * (index - 1) + 1;
			var end = start + size;
			var text = (0, _utils.formate)(label, {
				start: start,
				end: end > total ? total : end,
				total: total
			});

			return _react2.default.createElement(
				'div',
				{ className: componentClass },
				_react2.default.createElement(
					'select',
					{ value: size, onChange: readOnly ? null : this._handleChangeSize },
					optionElems
				),
				_react2.default.createElement('div', { className: 'pagination-separator' }),
				_react2.default.createElement(_button2.default, (_React$createElement = { icon: 'first', disabled: index === 1 }, _defineProperty(_React$createElement, 'disabled', readOnly), _defineProperty(_React$createElement, 'onClick', function onClick() {
					return _this2._onChangeIndex(1);
				}), _React$createElement)),
				_react2.default.createElement(_button2.default, (_React$createElement2 = { icon: 'pre', disabled: index === 1 }, _defineProperty(_React$createElement2, 'disabled', readOnly), _defineProperty(_React$createElement2, 'onClick', function onClick() {
					return _this2._onChangeIndex(_this2.props.index - 1);
				}), _React$createElement2)),
				_react2.default.createElement('div', { className: 'pagination-separator' }),
				'Page ',
				_react2.default.createElement('input', { style: { width: '2em' }, value: this.state.index, onChange: readOnly ? null : this._handleEditIndex }),
				' of ',
				pageTotal,
				_react2.default.createElement('div', { className: 'pagination-separator' }),
				_react2.default.createElement(_button2.default, (_React$createElement3 = { icon: 'next', disabled: index === pageTotal }, _defineProperty(_React$createElement3, 'disabled', readOnly), _defineProperty(_React$createElement3, 'onClick', function onClick() {
					return _this2._onChangeIndex(_this2.props.index + 1);
				}), _React$createElement3)),
				_react2.default.createElement(_button2.default, (_React$createElement4 = { icon: 'last', disabled: index === pageTotal }, _defineProperty(_React$createElement4, 'disabled', readOnly), _defineProperty(_React$createElement4, 'onClick', function onClick() {
					return _this2._onChangeIndex(pageTotal);
				}), _React$createElement4)),
				_react2.default.createElement('div', { className: 'pagination-separator' }),
				_react2.default.createElement(_button2.default, { icon: 'load', disabled: readOnly, onClick: onReload }),
				_react2.default.createElement(
					'div',
					{ className: 'pagination-info' },
					text
				)
			);
		}
	}]);

	return Pagination;
}(_react.Component);

Pagination.propTypes = {
	className: _react.PropTypes.string,
	total: _react.PropTypes.number,
	index: _react.PropTypes.number,
	sizeL: _react.PropTypes.number,
	label: _react.PropTypes.string,
	options: _react.PropTypes.array,
	onChangeSize: _react.PropTypes.func,
	onChangeIndex: _react.PropTypes.func,
	onReload: _react.PropTypes.func
};
Pagination.defaultProps = {
	total: 0,
	index: 1,
	size: 10,
	readOnly: false,

	options: [10, 20, 30, 40, 50],

	label: 'Displaying {start} to {end} of {total} items'
};
exports.default = Pagination;