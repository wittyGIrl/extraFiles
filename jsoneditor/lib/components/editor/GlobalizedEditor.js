(function() {
  var Actions, DefaultEditor, Field, GlobalizedEditor, React, classnames;

  React = require('react');

  classnames = require('classnames');

  Field = require('../Field');

  DefaultEditor = require('./DefaultEditor');

  Actions = require('../../actions/Actions');

  GlobalizedEditor = React.createClass({displayName: "GlobalizedEditor",
    getDefaultProps: function() {
      return {
        required: false,
        options: [
          {
            text: '中文',
            value: 'zh-cn'
          }, {
            text: '英文',
            value: 'en'
          }
        ],
        value: ''
      };
    },
    getInitialState: function() {
      return {
        value: this.parse(this.props.value || '')
      };
    },
    componentWillReceiveProps: function(nextProps) {
      return this.setState({
        value: this.parse(nextProps.value)
      });
    },
    handleChange: function(value, oldValue, data, target) {
      var flag, wholeValue;
      if (this.props.onBeforeChange) {
        flag = this.props.onBeforeChange(value, this.oldValue, this.props.owner);
      }
      if (flag === false) {
        return;
      }
      wholeValue = this.stringify();
      this._onUpdateValue(wholeValue);
      if (target) {
        target = this.props.owner.name + "." + target;
      } else {
        target = this.props.owner.name;
      }
      if (this.props.onChange) {
        return this.props.onChange(value, oldValue, target);
      }
    },
    parse: function(value) {
      var error;
      if (value == null) {
        value = this.state.value;
      }
      if (value) {
        try {
          value = JSON.parse(value);
        } catch (error) {
          value = {};
        }
      } else {
        value = {};
      }
      return value;
    },
    stringify: function() {
      return JSON.stringify(this.state.value);
    },
    render: function() {
      var autofocus, className, i, index, len, opt, options, rows, value;
      className = classnames("x-default-editor", this.props.className);
      options = this.props.options;
      rows = [];
      value = this.state.value;
      index = 0;
      autofocus = this.props.autofocus;
      for (i = 0, len = options.length; i < len; i++) {
        opt = options[i];
        rows.push(
        React.createElement("div", {className: "FormRow", key: index++}, 
          React.createElement(Field, {label: opt.text, className: "horizontal", 
            labelStyle: {paddingLeft:'0px', width: '70px'}, 
            style: {marginLeft:'0px'}}, 
            React.createElement(DefaultEditor, {className: "FormInput", style: {marginLeft:'0px'}, 
              required: this.props.required, 
              autofocus: autofocus, 
              onChange: this.handleChange, 
              owner: value, 
              target: opt.value, 
              value: value[opt.value]})
          )
         ));
        autofocus = false;
      }
      return React.createElement("div", null, 
      rows
    );
    },
    _onUpdateValue: function(value) {
      return Actions.updateValue(this.props.owner, this.props.target, value);
    }
  });

  module.exports = GlobalizedEditor;

}).call(this);
