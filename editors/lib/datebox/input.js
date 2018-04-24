'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateInput = function (_Component) {
  _inherits(DateInput, _Component);

  function DateInput(props, context) {
    _classCallCheck(this, DateInput);

    var _this = _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call(this, props, context));

    _this.componentWillReceiveProps = function (newProps) {
      if (!(0, _utils.isSameDay)(newProps.date, _this.props.date) || newProps.locale !== _this.props.locale || newProps.dateFormat !== _this.props.dateFormat) {
        _this.setState({
          value: _this.safeDateFormat(newProps)
        });
      }
    };

    _this.handleChange = function (event) {
      if (_this.props.onChange) {
        _this.props.onChange(event);
      }
      if (!event.isDefaultPrevented()) {
        _this.handleChangeDate(event.target.value);
      }
    };

    _this.handleChangeDate = function (value) {
      if (_this.props.onChangeDate) {
        var date = (0, _moment2.default)(value, _this.props.dateFormat, _this.props.locale || _moment2.default.locale(), true);
        if (date.isValid() && !(0, _utils.isDayDisabled)(date, _this.props)) {
          _this.props.onChangeDate(date);
        } else if (value === '') {
          _this.props.onChangeDate(null);
        }
      }
      _this.setState({
        value: value
      });
    };

    _this.handleBlur = function (event) {
      _this.setState({
        value: _this.safeDateFormat(_this.props)
      });
      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
    };

    _this.state = {
      value: _this.safeDateFormat(_this.props)
    };
    return _this;
  }

  _createClass(DateInput, [{
    key: 'safeDateFormat',
    value: function safeDateFormat(props) {
      return props.date && props.date.clone().locale(props.locale || _moment2.default.locale()).format(props.dateFormat) || '';
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.refs.input.focus();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          date = _props.date,
          dateFormat = _props.dateFormat,
          excludeDates = _props.excludeDates,
          filterDate = _props.filterDate,
          includeDates = _props.includeDates,
          locale = _props.locale,
          disabled = _props.disabled,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          name = _props.name,
          onChange = _props.onChange,
          onChangeDate = _props.onChangeDate,
          props = _objectWithoutProperties(_props, ['date', 'dateFormat', 'excludeDates', 'filterDate', 'includeDates', 'locale', 'disabled', 'maxDate', 'minDate', 'name', 'onChange', 'onChangeDate']);

      return _react2.default.createElement('input', _extends({}, props, {
        ref: 'input',
        type: 'text',
        name: name,
        readOnly: true,
        disabled: disabled,
        value: this.state.value,
        onBlur: this.handleBlur,
        onChange: this.handleChange }));
    }
  }]);

  return DateInput;
}(_react.Component);

DateInput.propTypes = {
  date: _react.PropTypes.object,
  dateFormat: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  excludeDates: _react.PropTypes.array,
  filterDate: _react.PropTypes.func,
  includeDates: _react.PropTypes.array,
  locale: _react.PropTypes.string,
  maxDate: _react.PropTypes.object,
  minDate: _react.PropTypes.object,
  onBlur: _react.PropTypes.func,
  onChange: _react.PropTypes.func,
  onChangeDate: _react.PropTypes.func
};
DateInput.defaultProps = {
  dateFormat: 'L'
};
exports.default = DateInput;