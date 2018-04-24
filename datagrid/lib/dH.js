'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DH = _react2.default.createClass({
	displayName: 'DH',


	propTypes: {
		className: _react2.default.PropTypes.string
	},

	render: function render() {
		var _props = this.props,
		    width = _props.width,
		    style = _props.style,
		    hidden = _props.hidden,
		    label = _props.label,
		    props = _objectWithoutProperties(_props, ['width', 'style', 'hidden', 'label']);
		// var componentClass = classNames('datagrid-body', className);


		style = style || {};

		if (hidden === true) {
			style.display = 'none';
		}

		return _react2.default.createElement(
			'td',
			{ style: style },
			_react2.default.createElement(
				'div',
				{ style: { width: width } },
				label
			)
		);
	}
});

exports.default = DH;