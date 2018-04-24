'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _editor = require('./editor');

var _editor2 = _interopRequireDefault(_editor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data = {
	label: '名称',
	on: true,
	off: false,
	basis: '20%',
	vertical: false,
	options: [{ text: '请选择', value: '' }, { text: '选项 1', value: '1' }],
	style: {},
	data: {
		computed: false,
		name: '',
		type: '',
		defaultValue: '',
		expression: '',
		hidden: '',
		onChange: '', //function name
		_options: {
			computed: {
				editor: { type: 'checkbox' }
			},
			name: {
				hidden: {
					targetName: 'computed',
					targetValues: false
				}
			},
			defaultValue: {
				hidden: {
					targetName: 'computed',
					targetValues: false
				}
			},
			expression: {
				hidden: {
					targetName: 'computed',
					targetValues: true
				}
			}
		}
	},
	//内置属性，用来设置属性的特殊属性 editor, hidden
	_options: {
		vertical: {
			editor: { type: 'checkbox' }
		},
		style: {
			keyEditable: true,
			defaultChild: { '': '' }
		},
		options: {
			defaultChild: {
				text: '', value: '',
				_options: {
					text: {
						editor: { autofocus: true }
					}
				}
			},
			//childOptions
			childName: 'option'
		}
	}
};

var App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_editor2.default, { data: data });
		}
	}]);

	return App;
}(_react.Component);

exports.default = App;