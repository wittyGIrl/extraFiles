(function() {
  var Field, React, classnames;

  React = require('react');

  classnames = require('classnames');

  Field = React.createClass({displayName: "Field",
    render: function() {
      var className, label;
      className = classnames('FormField', this.props.className);
      label = null;
      if (this.props.label) {
        label = React.createElement("label", {className: "FormLabel", style: this.props.labelStyle}, 
              this.props.label
            );
      }
      return React.createElement("div", {className: className, style: this.props.style}, 
      label, 
			this.props.children
		);
    }
  });

  module.exports = Field;

}).call(this);
