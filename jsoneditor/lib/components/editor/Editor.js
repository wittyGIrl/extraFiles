(function() {
  var Checkbox, Combobox, DefaultEditor, Editor, GlobalizedEditor, Multicheckbox, React, Template;

  React = require('react');

  DefaultEditor = require('./DefaultEditor');

  Combobox = require('./Combobox');

  GlobalizedEditor = require('./GlobalizedEditor');

  Template = require('./Template');

  Checkbox = require('./Checkbox');

  Multicheckbox = require('./Multicheckbox');

  Editor = React.createClass({displayName: "Editor",
    handleClick: function() {
      if (this.props.onClick) {
        return this.props.onClick.call(this);
      }
    },
    render: function() {
      var className, type;
      type = this.props.type || 'default';
      className = this.props.className;
      switch (type) {
        case 'none':
          return React.createElement("div", null, React.createElement("label", {className: "FormLabel"}, this.props.value));
        case 'combobox':
          return React.createElement(Combobox, React.__spread({},  this.props, {className: className}));
        case 'globalizedEditor':
          return React.createElement(GlobalizedEditor, React.__spread({},  this.props, {className: className}));
        case 'template':
          return React.createElement(Template, React.__spread({},  this.props, {className: className}));
        case 'checkbox':
          return React.createElement(Checkbox, React.__spread({},  this.props, {className: className}));
        case 'multicheckbox':
          return React.createElement(Multicheckbox, React.__spread({},  this.props, {className: className}));
        case 'a':
          return React.createElement("button", {className: "Button Button--link", 
          onClick: this.handleClick}, 
          this.props.label
        );
        default:
          return React.createElement(DefaultEditor, React.__spread({},  this.props, {className: className}));
      }
    }
  });

  module.exports = Editor;

}).call(this);
