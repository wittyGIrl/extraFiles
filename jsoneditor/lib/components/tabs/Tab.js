(function() {
  var React, Tab, classnames;

  React = require('react');

  classnames = require('classnames');

  Tab = React.createClass({displayName: "Tab",
    handleClick: function() {
      if (this.props.onClick) {
        return this.props.onClick(this.props.tabIndex);
      }
    },
    render: function() {
      var className, style;
      className = classnames('Tab', {
        'selected': this.props.selected
      }, this.props.className);
      style = {
        width: this.props.width
      };
      return React.createElement("div", React.__spread({},  this.props, {className: className, style: style, 
      onClick: this.handleClick}), 
      this.props.label
    );
    }
  });

  module.exports = Tab;

}).call(this);
