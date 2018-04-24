(function() {
  var Button, React, Svg, Title, classnames;

  React = require('react');

  classnames = require('classnames');

  Button = require('./Button');

  Svg = require('./svg/Svg');

  Title = React.createClass({displayName: "Title",
    handleRemove: function() {
      if (this.props.onRemove) {
        return this.props.onRemove(this.props.index);
      }
    },
    render: function() {
      var buttons, className, index;
      className = classnames('x-title', this.props.className);
      buttons = [];
      index = 0;
      buttons.push(React.createElement(Button, {className: "Button--link-text", 
        label: this.props.text, 
        key: index++, 
        onClick: this.props.onClick}, 
        React.createElement("span", null, " "), 
        React.createElement(Svg, {svg: this.props.collaped ? 'rightarrow' : 'downarrow'})
      ));
      if (this.props.addable) {
        buttons.push(React.createElement(Button, {className: "Button--link-text", 
          key: index++, 
          disableRipple: true, 
          onClick: this.props.onAdd}, 
          React.createElement(Svg, {svg: "add"})
        ));
      }
      if (this.props.removable) {
        buttons.push(React.createElement(Button, {className: "Button--link-text u-float-right", 
          key: index++, 
          disableRipple: true, 
          onClick: this.handleRemove}, 
          React.createElement(Svg, {svg: "delete"})
        ));
      }
      return React.createElement("div", {className: className}, 
      buttons
    );
    }
  });

  module.exports = Title;

}).call(this);
