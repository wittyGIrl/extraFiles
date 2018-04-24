(function() {
  var CircleRipple, PureRenderMixin, React;

  React = require('react');

  PureRenderMixin = React.addons.PureRenderMixin;

  CircleRipple = React.createClass({displayName: "CircleRipple",
    mixins: [PureRenderMixin],
    getDefaultProps: function() {
      return {
        opacity: 0.16
      };
    },
    componentWillAppear: function(callback) {
      return this._initializeAnimation(callback);
    },
    componentWillEnter: function(callback) {
      return this._initializeAnimation(callback);
    },
    componentDidAppear: function() {
      return this._animate();
    },
    componentDidEnter: function() {
      return this._animate();
    },
    componentWillLeave: function(callback) {
      var me, style;
      style = ReactDOM.findDOMNode(this).style;
      style.opacity = 0;
      me = this;
      return setTimeout(function() {
        if (me.isMounted()) {
          return callback();
        }
      }, 2000);
    },
    render: function() {
      var color, opacity, ref, style;
      ref = this.props, color = ref.color, opacity = ref.opacity, style = ref.style;
      if (typeof color !== 'undefined' && color !== null) {
        style.backgroundColor = color;
      }
      return React.createElement("div", {className: "circle-ripple", style: style});
    },
    _animate: function() {
      var style;
      style = ReactDOM.findDOMNode(this).style;
      style.opacity = 1;
      style.transition = 'opacity 3s cubic-bezier(0.23, 1, 0.32, 1) 0ms , ' + 'transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms';
      return style.transform = 'scale(1)';
    },
    _initializeAnimation: function(callback) {
      var me, style;
      style = ReactDOM.findDOMNode(this).style;
      style.opacity = this.props.opacity;
      style.transform = 'scale(0)';
      me = this;
      return setTimeout(function() {
        if (me.isMounted()) {
          return callback();
        }
      }, 0);
    }
  });

  module.exports = CircleRipple;

}).call(this);
