(function() {
  var Actions, Note, React, SelectList, classnames;

  React = require('react');

  classnames = require('classnames');

  Note = require('../Note');

  Actions = require('../../actions/Actions');

  SelectList = React.createClass({displayName: "SelectList",
    getDefaultProps: function() {
      return {
        value: ''
      };
    },
    getInitialState: function() {
      return {
        value: this.props.value || ''
      };
    },
    componentDidMount: function() {
      if (this.props.autofocus) {
        return this.focus();
      }
    },
    componentWillReceiveProps: function(nextProps) {
      if (nextProps.value !== this.state.value) {
        return this.setState({
          value: nextProps.value
        });
      }
    },
    handleChange: function(e) {
      var flag, value;
      if (this.props.onBeforeChange) {
        flag = this.props.onBeforeChange(value, this.oldValue, this.props.owner);
      }
      if (flag === false) {
        return;
      }
      value = e.target.value;
      this.setState({
        value: value
      });
      if (this.props.onChange) {
        this.props.onChange(value, this.oldValue);
      }
      return this.oldValue = value;
    },
    focus: function() {
      return this.refs.select.focus();
    },
    render: function() {
      var className, currentOption, i, index, len, note, noteElem, opt, optionElems, options, value;
      optionElems = [];
      index = 0;
      options = this.props.options || [];
      currentOption = null;
      value = this.state.value || '';
      for (i = 0, len = options.length; i < len; i++) {
        opt = options[i];
        if (value === opt.value) {
          currentOption = opt;
        }
        optionElems.push(
        React.createElement("option", {key: index++, value: opt.value}, opt.text)
      );
      }
      if (currentOption) {
        value = currentOption.value;
        note = currentOption.description;
      }
      noteElem = null;
      if (note) {
        noteElem = React.createElement(Note, null, note);
      }
      className = classnames("x-selectlist", "FormInput", this.props.className);
      return React.createElement("div", null, 
      React.createElement("select", React.__spread({},  this.props, {className: className, 
        onChange: this.handleChange, 
        onDoubleClick: this.props.onDoubleClick, 
        onClick: this.props.onClick, 
        value: value}), 
        optionElems
      ), 
      noteElem
    );
    }
  });

  module.exports = SelectList;

}).call(this);
