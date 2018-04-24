'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _yearDropdown = require('./yearDropdown');

var _yearDropdown2 = _interopRequireDefault(_yearDropdown);

var _month = require('./month');

var _month2 = _interopRequireDefault(_month);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props, context) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props, context));

    _this.increaseMonth = function () {
      _this.setState({
        date: _this.state.date.clone().add(1, 'month')
      });
    };

    _this.decreaseMonth = function () {
      _this.setState({
        date: _this.state.date.clone().subtract(1, 'month')
      });
    };

    _this.handleDayClick = function (day) {
      _this.props.onSelect(day);
    };

    _this.changeYear = function (year) {
      _this.setState({
        date: _this.state.date.clone().set('year', year)
      });
    };

    _this.state = {
      date: _this.localizeMoment(_this.getDateInView())
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.selected && !(0, _utils.isSameDay)(nextProps.selected, this.props.selected)) {
        this.setState({
          date: this.localizeMoment(nextProps.selected)
        });
      }
    }
  }, {
    key: 'getDateInView',
    value: function getDateInView() {
      var _props = this.props,
          selected = _props.selected,
          openToDate = _props.openToDate;

      var minDate = (0, _utils.getEffectiveMinDate)(this.props);
      var maxDate = (0, _utils.getEffectiveMaxDate)(this.props);
      var current = (0, _moment2.default)();
      if (selected) {
        return selected;
      } else if (minDate && minDate.isAfter(current)) {
        return minDate;
      } else if (maxDate && maxDate.isBefore(current)) {
        return maxDate;
      } else if (openToDate) {
        return openToDate;
      } else {
        return current;
      }
    }
  }, {
    key: 'localizeMoment',
    value: function localizeMoment(date) {
      return date.clone().locale(this.props.locale || _moment2.default.locale());
    }
  }, {
    key: 'header',
    value: function header() {
      var startOfWeek = this.state.date.clone().startOf('week');
      return [0, 1, 2, 3, 4, 5, 6].map(function (offset) {
        var day = startOfWeek.clone().add(offset, 'days');
        return _react2.default.createElement(
          'div',
          { key: offset, className: 'x-datebox-day-name' },
          day.localeData().weekdaysMin(day)
        );
      });
    }
  }, {
    key: 'renderPreviousMonthButton',
    value: function renderPreviousMonthButton() {
      if ((0, _utils.allDaysDisabledBefore)(this.state.date, 'month', this.props)) {
        return;
      }
      return _react2.default.createElement('a', {
        className: 'x-datebox-navigation x-datebox-navigation-prev',
        onClick: this.decreaseMonth });
    }
  }, {
    key: 'renderNextMonthButton',
    value: function renderNextMonthButton() {
      if ((0, _utils.allDaysDisabledAfter)(this.state.date, 'month', this.props)) {
        return;
      }
      return _react2.default.createElement('a', {
        className: 'x-datebox-navigation x-datebox-navigation-next',
        onClick: this.increaseMonth });
    }
  }, {
    key: 'renderCurrentMonth',
    value: function renderCurrentMonth() {
      var classes = ['x-datebox-current-month'];
      if (this.props.showYearDropdown) {
        classes.push('x-datebox-current-month-hasYearDropdown');
      }
      return _react2.default.createElement(
        'div',
        { className: classes.join(' ') },
        this.state.date.format(this.props.dateFormat)
      );
    }
  }, {
    key: 'renderYearDropdown',
    value: function renderYearDropdown() {
      if (!this.props.showYearDropdown) {
        return;
      }
      return _react2.default.createElement(_yearDropdown2.default, {
        onChange: this.changeYear,
        year: this.state.date.year() });
    }
  }, {
    key: 'renderTodayButton',
    value: function renderTodayButton() {
      var _this2 = this;

      if (!this.props.todayButton) {
        return;
      }
      return _react2.default.createElement(
        'div',
        { className: 'x-datebox-today-btn', onClick: function onClick() {
            return _this2.props.onSelect((0, _moment2.default)());
          } },
        this.props.todayButton
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'x-datebox' },
        _react2.default.createElement('div', { className: 'x-datebox-triangle' }),
        _react2.default.createElement(
          'div',
          { className: 'x-datebox-header' },
          this.renderPreviousMonthButton(),
          this.renderCurrentMonth(),
          this.renderYearDropdown(),
          this.renderNextMonthButton(),
          _react2.default.createElement(
            'div',
            null,
            this.header()
          )
        ),
        _react2.default.createElement(_month2.default, {
          day: this.state.date,
          onDayClick: this.handleDayClick,
          minDate: this.props.minDate,
          maxDate: this.props.maxDate,
          excludeDates: this.props.excludeDates,
          includeDates: this.props.includeDates,
          filterDate: this.props.filterDate,
          selected: this.props.selected,
          startDate: this.props.startDate,
          endDate: this.props.endDate }),
        this.renderTodayButton()
      );
    }
  }]);

  return Calendar;
}(_react.Component);

Calendar.propTypes = {
  dateFormat: _react.PropTypes.string.isRequired,
  endDate: _react.PropTypes.object,
  excludeDates: _react.PropTypes.array,
  filterDate: _react.PropTypes.func,
  includeDates: _react.PropTypes.array,
  locale: _react.PropTypes.string,
  maxDate: _react.PropTypes.object,
  minDate: _react.PropTypes.object,
  onSelect: _react.PropTypes.func.isRequired,
  openToDate: _react.PropTypes.object,
  selected: _react.PropTypes.object,
  showYearDropdown: _react.PropTypes.bool,
  startDate: _react.PropTypes.object,
  todayButton: _react.PropTypes.string
};
exports.default = Calendar;