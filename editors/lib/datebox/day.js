'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Day = function (_Component) {
  _inherits(Day, _Component);

  function Day() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Day);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Day.__proto__ || Object.getPrototypeOf(Day)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
      if (!_this.isDisabled() && _this.props.onClick) {
        _this.props.onClick(event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Day, [{
    key: 'isSameDay',
    value: function isSameDay(other) {
      return (0, _utils.isSameDay)(this.props.day, other);
    }
  }, {
    key: 'isDisabled',
    value: function isDisabled() {
      return (0, _utils.isDayDisabled)(this.props.day, this.props);
    }
  }, {
    key: 'isInRange',
    value: function isInRange() {
      var _props = this.props,
          day = _props.day,
          startDate = _props.startDate,
          endDate = _props.endDate;

      if (!startDate || !endDate) return false;

      var before = startDate.clone().startOf('day').subtract(1, 'seconds');
      var after = endDate.clone().startOf('day').add(1, 'seconds');
      return day.clone().startOf('day').isBetween(before, after);
    }
  }, {
    key: 'isWeekend',
    value: function isWeekend() {
      var weekday = this.props.day.day();
      return weekday === 0 || weekday === 6;
    }
  }, {
    key: 'isOutsideMonth',
    value: function isOutsideMonth() {
      return this.props.month !== undefined && this.props.month !== this.props.day.month();
    }
  }, {
    key: 'getClassNames',
    value: function getClassNames() {
      return (0, _classnames2.default)('x-datebox-day', {
        'x-datebox-day-disabled': this.isDisabled(),
        'x-datebox-day-selected': this.isSameDay(this.props.selected),
        'x-datebox-day-in-range': this.isInRange(),
        'x-datebox-day-today': this.isSameDay((0, _moment2.default)()),
        'x-datebox-day-weekend': this.isWeekend(),
        'x-datebox-day-outside-month': this.isOutsideMonth()
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.getClassNames(), onClick: this.handleClick },
        this.props.day.date()
      );
    }
  }]);

  return Day;
}(_react.Component);

Day.propTypes = {
  day: _react.PropTypes.object.isRequired,
  endDate: _react.PropTypes.object,
  excludeDates: _react.PropTypes.array,
  filterDate: _react.PropTypes.func,
  includeDates: _react.PropTypes.array,
  maxDate: _react.PropTypes.object,
  minDate: _react.PropTypes.object,
  month: _react.PropTypes.number,
  onClick: _react.PropTypes.func,
  selected: _react.PropTypes.object,
  startDate: _react.PropTypes.object
};
exports.default = Day;