(function() {
  var Actions, Multicheckbox, React, classnames;

  React = require('react');

  classnames = require('classnames');

  Actions = require('../../actions/Actions');

  Multicheckbox = React.createClass({displayName: "Multicheckbox",
    getInitialState: function() {
      return {
        value: this.props.value || 0
      };
    },
    componentWillReceiveProps: function(nextProps) {
      if (nextProps.value !== this.state.value) {
        return this.setState({
          value: nextProps.value
        });
      }
    },
    handleChange: function(index, e) {
      var flag, value;
      if (this.props.onBeforeChange) {
        flag = this.props.onBeforeChange(this.state.value, index, e.target.checked, this.props);
      }
      if (flag === false) {
        return;
      }
      this.oldValue = this.state.value;
      value = isNaN(flag) ? this.state.value : flag;
      value = e.target.checked ? value | Math.pow(2, index) : value & (Math.pow(2, this.props.data.count) - 1 - Math.pow(2, index));
      return this._onUpdateValue(value);
    },
    render: function() {
      var children, className, i, j, options, ref, style, target, value;
      className = classnames("x-multicheckbox-editor", this.props.className);
      value = this.state.value || 0;
      options = this.props.data.options || [];
      style = this.props.mode === 'vertical' ? {
        display: 'block'
      } : null;
      children = [];
      for (i = j = 0, ref = options.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        target = options[i];
        children.push(
        React.createElement("span", {key: i, style: style}, 
          React.createElement("input", {className: className, type: "checkbox", 
            checked: value & Math.pow(2, target.key), 
            onChange: this.handleChange.bind(this, target.key)}), 
          target.text
        ));
      }
      return React.createElement("div", {className: "x-multicheckbox-editor"}, 
      children
     );
    },
    _onUpdateValue: function(value) {
      Actions.updateValue(this.props.owner, this.props.target, value);
      if (this.props.onChange) {
        return this.props.onChange(value, this.oldValue, this.props.owner);
      }
    }
  });

  module.exports = Multicheckbox;

}).call(this);
