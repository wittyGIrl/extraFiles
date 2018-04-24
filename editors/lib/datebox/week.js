'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _day = require('./day');

var _day2 = _interopRequireDefault(_day);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Week = function (_Component) {
  _inherits(Week, _Component);

  function Week() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Week);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Week.__proto__ || Object.getPrototypeOf(Week)).call.apply(_ref, [this].concat(args))), _this), _this.handleDayClick = function (day) {
      if (_this.props.onDayClick) {
        _this.props.onDayClick(day);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Week, [{
    key: 'renderDays',
    value: function renderDays() {
      var _this2 = this;

      var startOfWeek = this.props.day.clone().startOf('week');
      return [0, 1, 2, 3, 4, 5, 6].map(function (offset) {
        var day = startOfWeek.clone().add(offset, 'days');
        return _react2.default.createElement(_day2.default, {
          key: offset,
          day: day,
          month: _this2.props.month,
          onClick: _this2.handleDayClick.bind(_this2, day),
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
        { className: 'x-datebox-week' },
        this.renderDays()
      );
    }
  }]);

  return Week;
}(_react.Component);

Week.propTypes = {
  day: _react.PropTypes.object.isRequired,
  endDate: _react.PropTypes.object,
  excludeDates: _react.PropTypes.array,
  filterDate: _react.PropTypes.func,
  includeDates: _react.PropTypes.array,
  maxDate: _react.PropTypes.object,
  minDate: _react.PropTypes.object,
  month: _react.PropTypes.number,
  onDayClick: _react.PropTypes.func,
  selected: _react.PropTypes.object,
  startDate: _react.PropTypes.object
};
exports.default = Week;