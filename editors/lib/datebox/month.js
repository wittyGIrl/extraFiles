'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _week = require('./week');

var _week2 = _interopRequireDefault(_week);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Month = function (_Component) {
  _inherits(Month, _Component);

  function Month() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Month);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Month.__proto__ || Object.getPrototypeOf(Month)).call.apply(_ref, [this].concat(args))), _this), _this.handleDayClick = function (day) {
      if (_this.props.onDayClick) {
        _this.props.onDayClick(day);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Month, [{
    key: 'isWeekInMonth',
    value: function isWeekInMonth(startOfWeek) {
      var day = this.props.day;
      var endOfWeek = startOfWeek.clone().add(6, 'days');
      return startOfWeek.isSame(day, 'month') || endOfWeek.isSame(day, 'month');
    }
  }, {
    key: 'renderWeeks',
    value: function renderWeeks() {
      var _this2 = this;

      var startOfMonth = this.props.day.clone().startOf('month').startOf('week');
      return [0, 1, 2, 3, 4, 5].map(function (offset) {
        return startOfMonth.clone().add(offset, 'weeks');
      }).filter(function (startOfWeek) {
        return _this2.isWeekInMonth(startOfWeek);
      }).map(function (startOfWeek, offset) {
        return _react2.default.createElement(_week2.default, {
          key: offset,
          day: startOfWeek,
          month: _this2.props.day.month(),
          onDayClick: _this2.handleDayClick,
          minDate: _this2.props.minDate,
          maxDate: _this2.props.maxDate,
          excludeDates: _this2.props.excludeDates,
          includeDates: _this2.props.includeDates,
          filterDate: _this2.props.filterDate,
          selected: _this2.props.selected,
          startDate: _this2.props.startDate,
          endDate: _this2.props.endDate });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'x-datebox-month' },
        this.renderWeeks()
      );
    }
  }]);

  return Month;
}(_react.Component);

Month.propTypes = {
  day: _react.PropTypes.object.isRequired,
  endDate: _react.PropTypes.object,
  excludeDates: _react.PropTypes.array,
  filterDate: _react.PropTypes.func,
  includeDates: _react.PropTypes.array,
  maxDate: _react.PropTypes.object,
  minDate: _react.PropTypes.object,
  onDayClick: _react.PropTypes.func,
  selected: _react.PropTypes.object,
  startDate: _react.PropTypes.object
};
exports.default = Month;