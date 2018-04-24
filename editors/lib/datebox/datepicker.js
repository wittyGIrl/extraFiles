'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _calendar = require('./calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _popover = require('../common/popover');

var _popover2 = _interopRequireDefault(_popover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * General datepicker component.
 */
var DatePicker = function (_Component) {
  _inherits(DatePicker, _Component);

  function DatePicker(props, context) {
    _classCallCheck(this, DatePicker);

    var _this = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props, context));

    _this.handleFocus = function (event) {
      _this.props.onFocus(event);
      _this.setOpen(true);
    };

    _this.handleBlur = function (event) {
      if (_this.state.open) {
        _this.refs.input.focus();
      } else {
        _this.props.onBlur(event);
      }
    };

    _this.handleSelect = function (date) {
      _this.setSelected(date);
      _this.setOpen(false);
    };

    _this.setSelected = function (date) {
      if (!(0, _utils.isSameDay)(_this.props.selected, date)) {
        _this.props.onChange(date);
      }
    };

    _this.onInputClick = function () {
      if (!_this.props.disabled) {
        _this.setOpen(true);
      }
    };

    _this.onInputKeyDown = function (event) {
      if (event.key === 'Enter' || event.key === 'Escape') {
        event.preventDefault();
        _this.setOpen(false);
      } else if (event.key === 'Tab') {
        _this.setOpen(false);
      }
    };

    _this.onClearClick = function (event) {
      event.preventDefault();
      _this.props.onChange(null);
    };

    _this.state = {
      open: false,
      anchorEl: null
    };
    return _this;
  }

  _createClass(DatePicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        anchorEl: this.refs.root
      });
      if (this.props.autofocus) {
        this.focus();
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.refs.input.focus();
    }
  }, {
    key: 'setOpen',
    value: function setOpen(open) {
      this.setState({ open: open });
    }
  }, {
    key: 'renderCalendar',
    value: function renderCalendar() {
      return _react2.default.createElement(_calendar2.default, {
        locale: this.props.locale,
        dateFormat: this.props.dateFormatCalendar,
        selected: this.props.selected,
        onSelect: this.handleSelect,
        openToDate: this.props.openToDate,
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        excludeDates: this.props.excludeDates,
        filterDate: this.props.filterDate,
        onClickOutside: this.handleCalendarClickOutside,
        includeDates: this.props.includeDates,
        showYearDropdown: this.props.showYearDropdown,
        todayButton: this.props.todayButton
      });
    }
  }, {
    key: 'renderDateInput',
    value: function renderDateInput() {
      var _props = this.props,
          className = _props.className,
          width = _props.width,
          style = _props.style;


      style = Object.assign({}, style, { width: width ? width - 2 : null });

      return _react2.default.createElement(_input2.default, {
        ref: 'input',
        id: this.props.id,
        name: this.props.name,
        date: this.props.selected,
        locale: this.props.locale,
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
        excludeDates: this.props.excludeDates,
        includeDates: this.props.includeDates,
        filterDate: this.props.filterDate,
        dateFormat: this.props.dateFormat,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onClick: this.onInputClick,
        onKeyDown: this.onInputKeyDown,
        onChangeDate: this.setSelected,
        placeholder: this.props.placeholderText,
        disabled: this.props.disabled,
        className: className,
        title: this.props.title,
        readOnly: this.props.readOnly,
        required: this.props.required,
        tabIndex: this.props.tabIndex,
        style: style
      });
    }
  }, {
    key: 'renderClearButton',
    value: function renderClearButton() {
      if (this.props.isClearable && this.props.selected !== null) {
        return _react2.default.createElement('a', { className: 'x-datebox-close-icon', href: '#', onClick: this.onClearClick });
      } else {
        return null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          inline = _props2.inline,
          disabled = _props2.disabled,
          depth = _props2.depth,
          readOnly = _props2.readOnly;

      if (inline) {
        var calendar = this.renderCalendar();
        return calendar;
      } else {
        var _state = this.state,
            open = _state.open,
            anchorEl = _state.anchorEl;

        return _react2.default.createElement(
          'span',
          { ref: 'root' },
          this.renderDateInput(),
          this.renderClearButton(),
          _react2.default.createElement(
            _popover2.default,
            { open: open && !readOnly,
              depth: depth,
              anchorEl: anchorEl,
              onRequestClose: function onRequestClose() {
                return _this2.setOpen(false);
              }
            },
            this.renderCalendar()
          )
        );
      }
    }
  }]);

  return DatePicker;
}(_react.Component);

DatePicker.propTypes = {
  className: _react.PropTypes.string,
  dateFormat: _react.PropTypes.string,
  dateFormatCalendar: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  endDate: _react.PropTypes.object,
  excludeDates: _react.PropTypes.array,
  filterDate: _react.PropTypes.func,
  id: _react.PropTypes.string,
  includeDates: _react.PropTypes.array,
  inline: _react.PropTypes.bool,
  isClearable: _react.PropTypes.bool,
  locale: _react.PropTypes.string,
  maxDate: _react.PropTypes.object,
  minDate: _react.PropTypes.object,
  name: _react.PropTypes.string,
  onBlur: _react.PropTypes.func,
  onChange: _react.PropTypes.func.isRequired,
  onFocus: _react.PropTypes.func,
  openToDate: _react.PropTypes.object,
  placeholderText: _react.PropTypes.string,
  popoverAttachment: _react.PropTypes.string,
  popoverTargetAttachment: _react.PropTypes.string,
  popoverTargetOffset: _react.PropTypes.string,
  readOnly: _react.PropTypes.bool,
  renderCalendarTo: _react.PropTypes.any,
  required: _react.PropTypes.bool,
  selected: _react.PropTypes.object,
  showYearDropdown: _react.PropTypes.bool,
  startDate: _react.PropTypes.object,
  tabIndex: _react.PropTypes.number,
  tetherConstraints: _react.PropTypes.array,
  title: _react.PropTypes.string,
  todayButton: _react.PropTypes.string
};
DatePicker.defaultProps = {
  depth: 9999,
  dateFormatCalendar: 'MMMM YYYY',
  onChange: function onChange() {},

  disabled: false,
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},

  popoverAttachment: 'top left',
  popoverTargetAttachment: 'bottom left',
  popoverTargetOffset: '10px 0',
  tetherConstraints: [{
    to: 'window',
    attachment: 'together'
  }]
};
exports.default = DatePicker;