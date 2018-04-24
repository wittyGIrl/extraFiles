"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function generateYears(year) {
  var list = [];
  for (var i = 0; i < 5; i++) {
    list.push(year - i);
  }
  return list;
}

var YearDropdownOptions = function (_Component) {
  _inherits(YearDropdownOptions, _Component);

  function YearDropdownOptions(props, context) {
    _classCallCheck(this, YearDropdownOptions);

    var _this = _possibleConstructorReturn(this, (YearDropdownOptions.__proto__ || Object.getPrototypeOf(YearDropdownOptions)).call(this, props, context));

    _this.onChange = function (year) {
      _this.props.onChange(year);
    };

    _this.handleClickOutside = function () {
      _this.props.onCancel();
    };

    _this.incrementYears = function () {
      return _this.shiftYears(1);
    };

    _this.decrementYears = function () {
      return _this.shiftYears(-1);
    };

    _this.state = {
      yearsList: generateYears(_this.props.year)
    };
    return _this;
  }

  _createClass(YearDropdownOptions, [{
    key: "renderOptions",
    value: function renderOptions() {
      var _this2 = this;

      var selectedYear = this.props.year;
      var options = this.state.yearsList.map(function (year) {
        return _react2.default.createElement(
          "div",
          { className: "x-datebox-year-option",
            key: year,
            onClick: _this2.onChange.bind(_this2, year) },
          selectedYear === year ? _react2.default.createElement(
            "span",
            { className: "x-datebox-year-option-selected" },
            "\u2713"
          ) : '',
          year
        );
      });

      options.unshift(_react2.default.createElement(
        "div",
        { className: "x-datebox-year-option",
          ref: "upcoming",
          key: "upcoming",
          onClick: this.incrementYears },
        _react2.default.createElement("a", { className: "x-datebox-navigation x-datebox-navigation-years x-datebox-navigation-years-upcoming" })
      ));
      options.push(_react2.default.createElement(
        "div",
        { className: "x-datebox-year-option",
          ref: "previous",
          key: "previous",
          onClick: this.decrementYears },
        _react2.default.createElement("a", { className: "x-datebox-navigation x-datebox-navigation-years x-datebox-navigation-years-prev" })
      ));
      return options;
    }
  }, {
    key: "shiftYears",
    value: function shiftYears(amount) {
      var years = this.state.yearsList.map(function (year) {
        return year + amount;
      });

      this.setState({
        yearsList: years
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "x-datebox-year-dropdown" },
        this.renderOptions()
      );
    }
  }]);

  return YearDropdownOptions;
}(_react.Component);

YearDropdownOptions.propTypes = {
  onCancel: _react2.default.PropTypes.func.isRequired,
  onChange: _react2.default.PropTypes.func.isRequired,
  year: _react2.default.PropTypes.number.isRequired
};
exports.default = YearDropdownOptions;