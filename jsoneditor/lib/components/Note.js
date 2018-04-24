(function() {
  var Note, React, classnames, noteType;

  React = require('react');

  classnames = require('classnames');

  noteType = ['default', 'primary', 'success', 'warning', 'danger'];

  Note = React.createClass({displayName: "Note",
    getDefaultProps: function() {
      return {
        type: 'default'
      };
    },
    render: function() {
      var className;
      className = classnames('FormNote', this.props.type ? "FormNote--" + this.props.type : null, this.props.className);
      return React.createElement("div", React.__spread({},  this.props, {className: className}), 
      this.props.children
    );
    }
  });

  module.exports = Note;

}).call(this);
