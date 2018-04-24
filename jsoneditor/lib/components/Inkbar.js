(function() {
  var Inkbar, React, classnames;

  React = require('react');

  classnames = require('classnames');

  Inkbar = React.createClass({displayName: "Inkbar",
    render: function() {
      var className, style;
      className = classnames('Inkbar', this.props.className);
      style = {
        width: this.props.width,
        left: this.props.left
      };
      return React.createElement("div", {className: className, style: style}, 
      " "
    );
    }
  });

  module.exports = Inkbar;

}).call(this);
