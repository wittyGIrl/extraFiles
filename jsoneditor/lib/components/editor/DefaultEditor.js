(function() {
  var Actions, DefaultEditor, React, Validatable, classnames;

  React = require('react');

  classnames = require('classnames');

  Validatable = require('../mixins/validatable');

  Actions = require('../../actions/Actions');

  DefaultEditor = React.createClass({displayName: "DefaultEditor",
    mixins: [Validatable],
    getDefaultProps: function() {
      return {
        required: false,
        requiredMessage: '该项为必填项',
        rule: '',
        invalidMessage: '请输入有效值',
        value: ''
      };
    },
    getInitialState: function() {
      return {
        isValid: true,
        value: this.props.value || ''
      };
    },
    componentDidMount: function() {
      var value;
      value = this.state.value;
      if (this.props.autofocus && (typeof value === 'undefined' || typeof value === null || value === '')) {
        return this.focus();
      }
    },
    componentWillReceiveProps: function(nextProps) {
      var newState;
      if (nextProps.value !== this.state.value) {
        newState = {
          value: nextProps.value
        };
        this.validateValue(nextProps.value, newState);
        return this.setState(newState);
      }
    },
    validateValue: function(value, newState) {
      var valid;
      if (typeof this.props.rule === 'function') {
        valid = this.props.rule(value);
      } else if (typeof this.props.rule === 'string') {
        valid = this.validate(this.props.rule, value);
      }
      if (typeof valid === 'boolean') {
        return newState.isValid = valid;
      } else if (typeof valid === 'object') {
        newState.isValid = valid.isValid;
        return this.props.invalidMessage = valid.message;
      }
    },
    handleChange: function(e) {
      var flag, newState, value;
      if (this.props.onBeforeChange) {
        flag = this.props.onBeforeChange(value, this.oldValue, this.props.owner);
      }
      if (flag === false) {
        return;
      }
      value = e.target.value;
      newState = {
        value: value
      };
      this.validateValue(value, newState);
      this.setState(newState);
      if (newState.isValid) {
        this._onUpdateValue(value);
      }
      return this.oldValue = value;
    },
    focus: function() {
      return this.refs.textInput.focus();
    },
    render: function() {
      var className, placeholder, requiredMessage, validationMessage, value;
      requiredMessage = null;
      if (this.props.required && !this.state.value) {
        requiredMessage = React.createElement("div", {className: "form-validation is-invalid"}, 
          this.props.requiredMessage
        );
      }
      validationMessage = null;
      if (!this.state.isValid) {
        validationMessage = React.createElement("div", {className: "form-validation is-invalid"}, 
          this.props.invalidMessage
        );
      }
      className = classnames("x-default-editor", 'FormInput', {
        'is-invalid': !this.state.isValid || requiredMessage !== null
      }, this.props.className);
      placeholder = this.props.placeholder || '请输入';
      value = this.state.value || '';
      if (this.props.multiline) {
        return React.createElement("div", null, 
        React.createElement("textarea", React.__spread({},  this.props, {className: className, 
          placeholder: placeholder, 
          ref: "textInput", 
          value: value, onChange: this.handleChange})), 
        requiredMessage, 
        validationMessage
       );
      } else {
        return React.createElement("div", null, 
        React.createElement("input", React.__spread({},   this.props, {className: className, 
          placeholder: placeholder, 
          ref: "textInput", 
          value: value, onChange: this.handleChange})), 
        requiredMessage, 
        validationMessage
       );
      }
    },
    _onUpdateValue: function(value) {
      Actions.updateValue(this.props.owner, this.props.target, value);
      if (this.props.onChange) {
        return this.props.onChange(value, this.oldValue, this.props.owner, this.props.target);
      }
    }
  });

  module.exports = DefaultEditor;

}).call(this);
