(function() {
  var Actions, Inkbar, React, Tab, TabTemplate, Tabs, classnames;

  React = require('react');

  classnames = require('classnames');

  Tab = require('./Tab');

  TabTemplate = require('./TabTemplate');

  Inkbar = require('../Inkbar');

  Actions = require('../../actions/Actions');

  Tabs = React.createClass({displayName: "Tabs",
    getDefaultProps: function() {
      return {
        selectedIndex: 0
      };
    },
    handleRemove: function() {},
    handleSwitch: function(index) {
      if (index !== this.state.selectedIndex) {
        return this.setState({
          selectedIndex: index
        });
      }
    },
    getTabCount: function() {
      return React.Children.count(this.props.children);
    },
    render: function() {
      var children, claName, className, left, ref, selectedIndex, switchStyle, tabContent, tabs, width;
      ref = this.props, claName = ref.claName, children = ref.children;
      className = classnames('Tabs', claName);
      selectedIndex = this.props.selectedIndex || 0;
      if (selectedIndex >= children.length) {
        selectedIndex = 0;
      }
      this.props.selectedIndex = selectedIndex;
      width = (100 / this.getTabCount()) + "%";
      left = "calc(" + width + "*" + selectedIndex + ")";
      tabContent = [];
      tabs = [];
      React.Children.map(children, function(tab, index) {
        var selected;
        selected = selectedIndex === index;
        tabs.push(React.cloneElement(tab, {
          key: index,
          selected: selected,
          tabIndex: index,
          width: width,
          onClick: this._onHandleSwitch
        }));
        return tabContent.push(
        React.createElement(TabTemplate, {key: index, selected: selected}, 
          tab.props.children
        )
      );
      }, this);
      switchStyle = {
        transform: "translate3d(-" + (selectedIndex * 100) + "%, 0px, 0px)"
      };
      return React.createElement("div", {className: className}, 
      React.createElement("div", {className: "TabItemContainer"}, 
        tabs
      ), 
      React.createElement("div", {className: "InkbarContainer"}, 
        React.createElement(Inkbar, {width: width, left: left})
      ), 
      React.createElement("div", {className: "TabContent"}, 
        React.createElement("div", {className: "SwitchContainer", style: switchStyle}, 
          tabContent
        )
      )
    );
    },
    _onHandleSwitch: function(index) {
      return Actions.switchTab(index);
    }
  });

  module.exports = Tabs;

}).call(this);
