(function() {
  var Actions, Nav, React, classnames;

  React = require('react');

  classnames = require('classnames');

  Actions = require('../actions/Actions');

  Nav = React.createClass({displayName: "Nav",
    getDefaultProps: function() {
      return {
        open: false
      };
    },
    close: function() {
      Actions.closeNav();
      if (this.props.onClose) {
        return this.props.onClose();
      }
    },
    open: function() {
      Actions.openNav();
      if (this.props.onOpen) {
        return this.props.onOpen();
      }
    },
    toggle: function() {
      Actions.toggleNav();
      if (this.props.onToggle) {
        return this.props.onToggle();
      }
    },
    stopPropagation: function(e) {
      return e.stopPropagation();
    },
    render: function() {
      var className, modalClass, style;
      className = classnames('Nav', this.props.className);
      modalClass = classnames('Modal');
      style = null;
      if (this.props.open) {
        style = {
          transform: 'translate3d(0px, 0px, 0px)'
        };
      }
      return React.createElement("div", {className: className, style: style, onClick: this.stopPropagation}, 
			this.props.children
		);
    }
  });

  module.exports = Nav;

}).call(this);
