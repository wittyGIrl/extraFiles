(function() {
  var React, TabTemplate, classnames;

  React = require('react');

  classnames = require('classnames');

  TabTemplate = React.createClass({displayName: "TabTemplate",
    render: function() {
      var className, style;
      className = classnames('TabTemplate', this.props.className);
      style = {};
      if (!this.props.selected) {
        style.height = '0px';
      }
      return React.createElement("div", {className: className, style: style}, 
      this.props.children
    );
    }
  });

  module.exports = TabTemplate;

}).call(this);
