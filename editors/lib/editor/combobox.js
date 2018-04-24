'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Combobox = function (_Component) {
  _inherits(Combobox, _Component);

  function Combobox(props, context) {
    _classCallCheck(this, Combobox);

    var _this = _possibleConstructorReturn(this, (Combobox.__proto__ || Object.getPrototypeOf(Combobox)).call(this, props, context));

    _initialiseProps.call(_this);

    var value = props.value,
        options = props.options;

    if ((0, _utils.isNil)(value)) {
      if (options && options.length > 0) {
        value = options[0].value;
      } else {
        value = '';
      }
    }
    _this.state = { value: value };
    return _this;
  }

  _createClass(Combobox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autofocus && !this.props.noedit) {
        this.focus();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.state.value) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.refs.select.focus();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          name = _props.name,
          options = _props.options,
          inline = _props.inline,
          noedit = _props.noedit,
          width = _props.width,
          style = _props.style,
          autofocus = _props.autofocus,
          readOnly = _props.readOnly,
          disabled = _props.disabled;
      var value = this.state.value;

      if ((0, _utils.isNil)(value)) {
        value = '';
      }
      var text,
          optionElems = null;
      if (options && options.length > 0) {
        var optionElems = [];
        options.forEach(function (opt, i) {
          //当value不存在时，将其设置为第一个option
          if (i === 0 && ((0, _utils.isNil)(value) || value === '')) {
            value = opt.value;
            text = opt.text;
          } else if (opt.value === value) {
            text = opt.text;
          }
          optionElems.push(_react2.default.createElement(
            'option',
            { key: i, value: opt.value },
            opt.text
          ));
        });
      }

      var componentClass = (0, _classnames2.default)({
        "x-editor": !noedit,
        "x-combobox": !noedit,
        'x-editor-noedit': noedit,
        'disabled': disabled
      }, className);

      if (noedit) {
        return _react2.default.createElement(
          'span',
          { className: componentClass },
          text
        );
      }

      style = Object.assign({}, style);
      if (!(0, _utils.isNil)(width)) {
        style.width = width;
      }

      return _react2.default.createElement(
        'select',
        { className: componentClass, ref: 'select',
          name: name, value: value,
          disabled: readOnly || disabled,
          style: style,
          onChange: this._handleChange
        },
        optionElems
      );
    }
  }]);

  return Combobox;
}(_react.Component);

Combobox.propTypes = {
  className: _react.PropTypes.string,
  options: _react.PropTypes.array,
  inline: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  readOnly: _react.PropTypes.bool,
  style: _react.PropTypes.object,
  noedit: _react.PropTypes.bool,
  autofocus: _react.PropTypes.bool
};
Combobox.defaultProps = {
  value: ''
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._handleChange = function (e) {
    var _props2 = _this2.props,
        onBeforeChange = _props2.onBeforeChange,
        onChange = _props2.onChange;

    var flag,
        value = e.target.value;

    var oldValue = _this2.state.value;
    if (onBeforeChange) {
      flag = onBeforeChange(value, oldValue);
    }
    if (flag === false) return;

    _this2.setState({ value: value });
    if (onChange) {
      onChange(value, oldValue);
    }
  };
};

exports.default = Combobox;