(function() {
  var Actions, Field, Note, React, SelectList, Template, classnames;

  React = require('react');

  classnames = require('classnames');

  Field = require('../Field');

  Note = require('../Note');

  SelectList = require('./SelectList');

  Actions = require('../../actions/Actions');

  Template = React.createClass({displayName: "Template",
    getDefaultProps: function() {
      return {
        required: false,
        requiredMessage: '该项为必填项',
        variables: [],
        template: '${flow.GetVariable("{0}")}',
        value: '',
        selectValue: ''
      };
    },
    getInitialState: function() {
      return {
        value: this.props.value
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
    onSelectChange: function(value) {
      if (this.selectValue !== value) {
        return this.selectValue = value;
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
      this._onUpdateValue(value);
      this.oldValue = value;
      this.selectionStart = e.target.selectionStart;
      return this.selectionEnd = e.target.selectionEnd;
    },
    handleDoubleSelect: function(e) {
      var endStr, startStr, temp, template, value;
      value = this.state.value;
      template = this.props.template.replace('{0}', this.selectValue || '');
      if (typeof this.selectionStart === 'undefined' || this.selectionStart === null) {
        value += template;
      } else {
        if (this.selectionStart > this.selectionEnd) {
          temp = this.selectionStart;
          this.selectionStart = this.selectionEnd;
          this.selectionEnd = temp;
        }
        startStr = value.substring(0, this.selectionStart);
        endStr = value.substring(this.selectionEnd);
        value = startStr + template + endStr;
      }
      this.setState({
        value: value
      });
      if (this.props.owner) {
        return this.props.owner[this.props.target] = value;
      }
    },
    handleClick: function(e) {
      this.selectionStart = e.target.selectionStart;
      return this.selectionEnd = e.target.selectionEnd;
    },
    focus: function() {
      return this.refs.textarea.focus();
    },
    render: function() {
      var className, requiredMessage, selectValue, value;
      value = this.state.value;
      requiredMessage = null;
      if (this.props.required && !this.state.value) {
        requiredMessage = React.createElement("div", {className: "form-validation is-invalid"}, 
          this.props.requiredMessage
        );
      }
      className = classnames("x-template-editor", {
        'is-invalid': requiredMessage !== null
      }, "FormInput", this.props.className);
      selectValue = this.selectValue || this.props.selectValue;
      this.oldValue = value;
      return React.createElement("div", {className: "FormRow"}, 
      React.createElement(Field, {label: "请插入变量", className: "horizontal"}, 
        React.createElement(SelectList, {ref: "select", size: "8", 
          value: selectValue, 
          options: this.props.variables, 
          onChange: this.onSelectChange, 
          onDoubleClick: this.handleDoubleSelect}
          )
      ), 
      React.createElement("textarea", {className: className, style: this.props.style, 
        ref: "textarea", 
        value: value, 
        onChange: this.handleChange, 
        onClick: this.handleClick}
        ), 
        requiredMessage
     );
    },
    _onUpdateValue: function(value) {
      Actions.updateValue(this.props.owner, this.props.target, value);
      if (this.props.onChange) {
        return this.props.onChange(value, this.oldValue, this.props.owner);
      }
    }
  });

  module.exports = Template;

}).call(this);
