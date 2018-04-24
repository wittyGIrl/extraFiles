(function() {
  var Actions, Combobox, React, classnames;

  React = require('react');

  classnames = require('classnames');

  Actions = require('../../actions/Actions');

  Combobox = React.createClass({displayName: "Combobox",
    getDefaultProps: function() {
      return {
        value: ''
      };
    },
    getInitialState: function() {
      return {
        value: typeof this.props.value === 'undefined' || this.props.value === null ? '' : this.props.value
      };
    },
    componentDidMount: function() {
      if (this.props.options && this.props.options.length > 0 && this.props.options[0].value !== '' && this.state.value === '') {
        Actions.updateValue(this.props.owner, this.props.target, this.props.options[0].value);
      }
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
      value = e.target.value;
      if (this.oldValue === void 0 || this.oldValue === null) {
        this.oldValue = this.state.value;
      }
      if (this.props.onBeforeChange) {
        flag = this.props.onBeforeChange(value, this.oldValue, this.props.owner);
      }
      if (flag === false) {
        return;
      }
      this.setState({
        value: value
      });
      this._onUpdateValue(value);
      return this.oldValue = value;
    },
    focus: function() {
      return this.refs.select.focus();
    },
    render: function() {
      var className, i, index, len, opt, optionElems, options;
      this.mapText = {};
      this.mapValue = {};
      optionElems = [];
      index = 0;
      options = this.props.options || [];
      for (i = 0, len = options.length; i < len; i++) {
        opt = options[i];
        optionElems.push(
        React.createElement("option", {key: index++, value: opt.value}, opt.text)
      );
      }
      className = classnames("x-combobox", "FormInput", this.props.className);
      return React.createElement("select", React.__spread({},  this.props, {className: className, 
      ref: "select", 
      onChange: this.handleChange, 
      onDoubleClick: this.props.onDoubleClick, 
      onClick: this.props.onClick, 
      value: this.state.value}), 
      optionElems
    );
    },
    _onUpdateValue: function(value) {
      Actions.updateValue(this.props.owner, this.props.target, value);
      if (this.props.onChange) {
        return this.props.onChange(value, this.oldValue, this.props.owner);
      }
    }
  });

  module.exports = Combobox;

}).call(this);
