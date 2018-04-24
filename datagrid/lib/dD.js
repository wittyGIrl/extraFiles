'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _editor = require('./common/editor');

var _editor2 = _interopRequireDefault(_editor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DD = function (_Component) {
	_inherits(DD, _Component);

	function DD() {
		_classCallCheck(this, DD);

		return _possibleConstructorReturn(this, (DD.__proto__ || Object.getPrototypeOf(DD)).apply(this, arguments));
	}

	_createClass(DD, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    value = _props.value,
			    row = _props.row,
			    field = _props.field,
			    hidden = _props.hidden,
			    editing = _props.editing,
			    formatter = _props.formatter,
			    editor = _props.editor,
			    width = _props.width,
			    striped = _props.striped,
			    className = _props.className,
			    style = _props.style;

			var componentClass = (0, _classnames2.default)(className, {
				striped: striped
			});
			style = style || {};
			if (hidden === true) {
				style.display = 'none';
			}

			if ((0, _utils.isBoolean)(value)) {
				value = value.toString();
			}
			var valueElem = (0, _utils.isNil)(formatter) ? value : typeof formatter === 'function' ? formatter(value, row) : (0, _utils.formate)(formatter, row);
			if (editing) {
				var editorOpts = {};
				if (typeof editor === 'string') {
					editorOpts = { type: editor };
				} else if ((typeof editor === 'undefined' ? 'undefined' : _typeof(editor)) === 'object') {
					editorOpts = editor;
				}

				valueElem = _react2.default.createElement(_editor2.default, _extends({}, editorOpts, { className: 'x-editor-xs',
					value: value, width: width,
					owner: row, target: field
				}));
			}
			return _react2.default.createElement(
				'td',
				{ className: componentClass, style: style },
				_react2.default.createElement(
					'div',
					{ style: { width: width } },
					valueElem
				)
			);
		}
	}]);

	return DD;
}(_react.Component);

DD.propTypes = {
	className: _react.PropTypes.string

};
DD.defaultProps = {};
exports.default = DD;