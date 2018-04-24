(function() {
  var Button, PureRenderMixin, React, Ripple, classnames;

  React = require('react');

  classnames = require('classnames');

  PureRenderMixin = React.addons.PureRenderMixin;

  Ripple = require('./animation/Ripple');

  Button = React.createClass({displayName: "Button",
    mixins: [PureRenderMixin],
    render: function() {
      var children, className, disableRipple, label, onClick, ref, style;
      ref = this.props, label = ref.label, children = ref.children, className = ref.className, style = ref.style, onClick = ref.onClick, disableRipple = ref.disableRipple;
      className = classnames('Button', className);
      if (disableRipple) {
        return React.createElement("button", {className: className, style: style, 
        onClick: onClick}, 
        label, 
        children
      );
      } else {
        return React.createElement("button", {className: className, style: style, 
        onClick: onClick}, 
        React.createElement(Ripple, null, 
          label, 
          children
        )
      );
      }
    }
  });

  module.exports = Button;

}).call(this);
