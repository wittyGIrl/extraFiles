(function() {
  var Actions, Checkbox, React, classnames;

  React = require('react');

  classnames = require('classnames');

  Actions = require('../../actions/Actions');

  Checkbox = React.createClass({displayName: "Checkbox",
    getDefaultProps: function() {
      return {
        on: 'true',
        off: 'false'
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
      value = e.target.checked;
      value = value ? this.props.on : this.props.off;
      this.setState({
        value: value
      });
      this._onUpdateValue(value);
      return this.oldValue = value;
    },
    focus: function() {
      return this.refs.textInput.focus();
    },
    render: function() {
      var className, value;
      className = classnames("x-checkbox-editor", this.props.className);
      value = this.state.value || '';
      return React.createElement("div", null, 
      React.createElement("input", React.__spread({},  this.props, {className: className, 
        ref: "textInput", checked: value === this.props.on || value.toLowerCase() == this.props.on, 
        value: value, onChange: this.handleChange}))
     );
    },
    _onUpdateValue: function(value) {
      Actions.updateValue(this.props.owner, this.props.target, value);
      if (this.props.onChange) {
        return this.props.onChange(value, this.oldValue, this.props.owner);
      }
    }
  });

  module.exports = Checkbox;

}).call(this);
