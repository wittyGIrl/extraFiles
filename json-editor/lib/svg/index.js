'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Svg = _react2.default.createClass({
  displayName: 'Svg',

  propTypes: {
    /**
     * Elements passed into the SVG Icon.
     */
    children: _react.PropTypes.node,
    /**
     * This is the fill color of the svg icon.
     * If not specified, this component will default
     * to muiTheme.palette.textColor.
     */
    color: _react.PropTypes.string,
    /**
     * This is the icon color when the mouse hovers over the icon.
     */
    hoverColor: _react.PropTypes.string,
    /**
     * Function called when mouse enters this element.
     */
    onMouseEnter: _react.PropTypes.func,
    /**
     * Function called when mouse leaves this element.
     */
    onMouseLeave: _react.PropTypes.func,
    /**
     * Override the inline-styles of the root element.
     */
    style: _react.PropTypes.object,
    /**
     * Allows you to redifine what the coordinates
     * without units mean inside an svg element. For example,
     * if the SVG element is 500 (width) by 200 (height), and you
     * pass viewBox="0 0 50 20", this means that the coordinates inside
     * the svg will go from the top left corner (0,0) to bottom right (50,20)
     * and each unit will be worth 10px.
     */
    viewBox: _react.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onMouseEnter: function onMouseEnter() {},
      onMouseLeave: function onMouseLeave() {},
      viewBox: '0 0 24 24'
    };
  },
  getInitialState: function getInitialState() {
    return {
      hovered: false
    };
  },
  handleMouseLeave: function handleMouseLeave(event) {
    this.setState({ hovered: false });
    this.props.onMouseLeave(event);
  },
  handleMouseEnter: function handleMouseEnter(event) {
    this.setState({ hovered: true });
    this.props.onMouseEnter(event);
  },
  render: function render() {
    var _props = this.props,
        children = _props.children,
        color = _props.color,
        hoverColor = _props.hoverColor,
        onMouseEnter = _props.onMouseEnter,
        onMouseLeave = _props.onMouseLeave,
        style = _props.style,
        viewBox = _props.viewBox,
        other = _objectWithoutProperties(_props, ['children', 'color', 'hoverColor', 'onMouseEnter', 'onMouseLeave', 'style', 'viewBox']);

    var offColor = color ? color : style && style.fill;
    var onColor = hoverColor ? hoverColor : offColor;

    var mergedStyles = Object.assign({
      display: 'inline-block',
      fill: this.state.hovered ? onColor : offColor,
      height: 24,
      width: 24,
      userSelect: 'none'
    }, style);

    return _react2.default.createElement(
      'svg',
      _extends({}, other, {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        style: mergedStyles,
        viewBox: viewBox
      }),
      children
    );
  }
});

exports.default = Svg;