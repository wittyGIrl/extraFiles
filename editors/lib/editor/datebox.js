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

var _utils = require('../utils');

var _datepicker = require('../datebox/datepicker');

var _datepicker2 = _interopRequireDefault(_datepicker);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Datebox = function (_Component) {
  _inherits(Datebox, _Component);

  function Datebox(props, context) {
    _classCallCheck(this, Datebox);

    var _this = _possibleConstructorReturn(this, (Datebox.__proto__ || Object.getPrototypeOf(Datebox)).call(this, props, context));

    _this._handleChange = function (value) {
      var _this$props = _this.props,
          onBeforeChange = _this$props.onBeforeChange,
          onChange = _this$props.onChange,
          dateFormat = _this$props.dateFormat;

      var flag;

      var oldStr = _this.state.value && _this.state.value.format(dateFormat);

      var str = value.format(dateFormat);
      if (onBeforeChange) {
        flag = onBeforeChange(str, oldStr);
      }
      if (flag === false) return;

      _this.setState({ value: value });
      if (onChange) {
        onChange(str);
      }
    };

    _this.state = {
      value: _this._getMoment(_this.props.value),
      startDate: _this._getMoment(_this.props.startDate),
      endDate: _this._getMoment(_this.props.endDate)
    };
    return _this;
  }

  _createClass(Datebox, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.state.value) {
        this.setState({ value: this._getMoment(nextProps.value) });
      }
      if (nextProps.startDate !== this.state.startDate) {
        this.setState({ startDate: this._getMoment(nextProps.startDate) });
      }
      if (nextProps.endDate !== this.state.endDate) {
        this.setState({ endDate: this._getMoment(nextProps.endDate) });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          noedit = _props.noedit,
          placeholder = _props.placeholder,
          onChange = _props.onChange,
          todayButton = _props.todayButton,
          dateFormat = _props.dateFormat,
          props = _objectWithoutProperties(_props, ['className', 'noedit', 'placeholder', 'onChange', 'todayButton', 'dateFormat']);

      var _state = this.state,
          value = _state.value,
          startDate = _state.startDate,
          endDate = _state.endDate;

      var componentClass = (0, _classnames2.default)({
        'x-editor': !noedit,
        'x-editor-datebox': !noedit,
        'x-editor-noedit': noedit
      }, className);

      if (noedit) {
        return _react2.default.createElement(
          'span',
          { className: componentClass },
          value && value.format(dateFormat)
        );
      }

      return _react2.default.createElement(_datepicker2.default, _extends({}, props, { className: componentClass,
        locale: 'zh-cn',
        selected: value,
        startDate: startDate,
        endDate: endDate,
        todayButton: todayButton,
        dateFormat: dateFormat,
        placeholderText: placeholder,
        onChange: this._handleChange }));
    }
  }, {
    key: '_getMoment',
    value: function _getMoment(value) {
      if ((0, _utils.isDate)(value)) return (0, _moment2.default)(value);
      if (value && (0, _utils.isDate)(value._d)) return value;
      if ((0, _utils.isString)(value)) {
        var date = (0, _moment2.default)(value);
        if (date.isValid()) {
          return date;
        }
      }
      return null;
    }
  }]);

  return Datebox;
}(_react.Component);

Datebox.propTypes = {
  className: _react.PropTypes.string,
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]),
  startDate: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]),
  endDate: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]),
  name: _react.PropTypes.string,
  placeholder: _react.PropTypes.string,
  dateFormat: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  readOnly: _react.PropTypes.bool,
  autofocus: _react.PropTypes.bool,
  noedit: _react.PropTypes.bool,
  showYearDropdown: _react.PropTypes.bool,
  basis: _react.PropTypes.string
};
Datebox.defaultProps = {
  value: '',
  startDate: '',
  endDate: '',
  name: '',
  placeholder: '',
  dateFormat: 'YYYY-MM-DD',
  readOnly: false,
  disabled: false,
  showYearDropdown: false,
  basis: '20%'
};
exports.default = Datebox;