'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../utils');

var _renderToLayer = require('editors/lib/common/renderToLayer');

var _renderToLayer2 = _interopRequireDefault(_renderToLayer);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('./footer');

var _footer2 = _interopRequireDefault(_footer);

var _body = require('./body');

var _body2 = _interopRequireDefault(_body);

var _mask = require('./mask');

var _mask2 = _interopRequireDefault(_mask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dialog = function (_Component) {
	_inherits(Dialog, _Component);

	function Dialog(props, context) {
		_classCallCheck(this, Dialog);

		var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props, context));

		_initialiseProps.call(_this);

		_this.state = {
			width: 0,
			height: 0,
			top: 0,
			left: 0,
			diff: 0,
			maximized: false
		};
		return _this;
	}

	_createClass(Dialog, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_renderToLayer2.default, {
				ref: 'layer',
				open: this.props.open,
				depth: 2001,
				componentClickAway: this.props.onClose,
				render: this.renderLayer,
				layerDidMount: this.layerDidMount
			});
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _state = this.state,
			    width = _state.width,
			    height = _state.height;

			var containerHeight = (0, _utils.$)(window).height();
			var containerWidth = (0, _utils.$)(window).width();
			var scale = 0.7;
			if ((!height || height == 'auto') && (!width || width == 'auto')) {
				if (containerHeight > containerWidth) {
					width = Math.min(Math.ceil(containerWidth * scale), 800);
					height = Math.min(Math.ceil(width * (containerHeight / containerWidth)), 600);
				} else {
					height = Math.min(Math.ceil(containerHeight * scale), 600);
					width = Math.min(Math.ceil(height * (containerWidth / containerHeight)), 800);
				}
			} else if (!height || height == 'auto') {
				height = Math.ceil(width * (containerHeight / containerWidth));
			} else if (!width || width == 'auto') {
				width = Math.ceil(height * (containerWidth / containerHeight));
			}

			this.setState({ width: width, height: height });

			this._origin = { width: width, height: height };
			this.hcenter(width);
			this.vcenter(height);
		}
	}, {
		key: 'hcenter',
		value: function hcenter(width) {
			width = width || this.state.width;
			var left = Math.ceil(((0, _utils.$)(window).width() - width) / 2 + (0, _utils.$)(document).scrollLeft());
			this.setState({ left: left });
			this._origin.left = left;
		}
	}, {
		key: 'vcenter',
		value: function vcenter(height) {
			height = height || this.state.height;
			var top = Math.ceil(((0, _utils.$)(window).height() - height) / 2 + (0, _utils.$)(document).scrollTop());
			this.setState({ top: top });
			this._origin.top = top;
		}
	}]);

	return Dialog;
}(_react.Component);

Dialog.propTypes = {
	className: _react.PropTypes.string
};
Dialog.defaultProps = {
	open: true
};

var _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this.renderLayer = function () {
		var _props = _this2.props,
		    className = _props.className,
		    title = _props.title,
		    modal = _props.modal,
		    bodyStyle = _props.bodyStyle,
		    children = _props.children,
		    onOk = _props.onOk,
		    onClose = _props.onClose,
		    props = _objectWithoutProperties(_props, ['className', 'title', 'modal', 'bodyStyle', 'children', 'onOk', 'onClose']);

		var _state2 = _this2.state,
		    width = _state2.width,
		    height = _state2.height,
		    left = _state2.left,
		    top = _state2.top,
		    diff = _state2.diff,
		    maximized = _state2.maximized;

		var componentClass = (0, _classnames2.default)('x-dialog', className);

		var mask = null;
		if (modal) {
			mask = _react2.default.createElement(_mask2.default, null);
		}
		var style = { width: width, height: height, left: left, top: top };
		bodyStyle = Object.assign({}, bodyStyle, { height: height - diff });
		return _react2.default.createElement(
			'div',
			_extends({}, props, { className: componentClass, style: style }),
			_react2.default.createElement(_header2.default, { title: title, maximized: maximized,
				onTriggleMax: _this2._handleTriggleMax, onClose: _this2._handleClose
			}),
			_react2.default.createElement(
				_body2.default,
				{ style: bodyStyle },
				children
			),
			_react2.default.createElement(_footer2.default, { onOk: _this2._handleOk, onCancel: _this2._handleClose }),
			mask
		);
	};

	this._handleTriggleMax = function () {
		var maximized = _this2.state.maximized;

		var state = { maximized: !maximized };
		if (maximized) {
			state.width = _this2._origin.width;
			state.height = _this2._origin.height;
			state.top = _this2._origin.top;
			state.left = _this2._origin.left;
		} else {
			var dialog = (0, _utils.$)(_this2._layer).children();
			state.width = (0, _utils.$)(window).width() - (dialog.outerWidth() - dialog.width());
			state.height = (0, _utils.$)(window).height() - (dialog.outerHeight() - dialog.height());
			state.top = 0;
			state.left = 0;
		}
		_this2.setState(state);
	};

	this._handleClose = function () {
		if (_this2.props.onClose) {
			_this2.props.onClose();
		}
	};

	this._handleOk = function () {
		if (_this2.props.onOk) {
			_this2.props.onOk();
		}
	};

	this.layerDidMount = function (layer) {
		var target = (0, _utils.$)(layer);
		var body = target.find('.x-dialog-body');
		var footer = target.find('.x-dialog-footer');
		var diff = target.find('.x-dialog-header').outerHeight() + (body.outerHeight() - body.height()) + footer.outerHeight();
		_this2.setState({ diff: diff });
	};
};

exports.default = Dialog;