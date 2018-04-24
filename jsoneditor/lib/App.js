(function() {
  var App, AppStore, CollapsableField, Nav, React, Tab, Tabs, classnames;

  React = require('react');

  classnames = require('classnames');

  Nav = require('./components/Nav');

  Tabs = require('./components/tabs/Tabs');

  Tab = require('./components/tabs/Tab');

  CollapsableField = require('./components/CollapsableField');

  AppStore = require('./stores/AppStore');

  App = React.createClass({displayName: "App",
    getInitialState: function() {
      return AppStore.getData();
    },
    close: function() {
      return this.refs.nav.close();
    },
    open: function() {
      return this.refs.nav.open();
    },
    toggle: function() {
      return this.refs.nav.toggle();
    },
    isOpen: function() {
      return this.state.open;
    },
    componentDidMount: function() {
      return AppStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
      return AppStore.removeChangeListener(this._onChange);
    },
    render: function() {
      var className, formatter, onAddChild, onBeforeChange, onChange, onClose, onOpen, onRemoveChild, onToggle, ref, tabs;
      ref = this.props, className = ref.className, onOpen = ref.onOpen, onClose = ref.onClose, onToggle = ref.onToggle, onChange = ref.onChange, onBeforeChange = ref.onBeforeChange, onAddChild = ref.onAddChild, onRemoveChild = ref.onRemoveChild, formatter = ref.formatter;
      className = classnames('Tab', className);
      tabs = [];
      if (this.state.tabs && this.state.tabs.length) {
        this.state.tabs.forEach(function(tab, index) {
          return tabs.push(
          React.createElement(Tab, {label: tab.name, key: index}, 
            React.createElement(CollapsableField, {data: tab.data, 
              style: {marginLeft: '0px'}, 
              formatter: formatter, 
              onChange: onChange, 
              onBeforeChange: onBeforeChange, 
              onAddChild: onAddChild, 
              onRemoveChild: onRemoveChild})
          )
        );
        });
      }
      return React.createElement(Nav, {ref: "nav", open: this.state.open, 
      onOpen: onOpen, 
      onClose: onClose, 
      onToggle: onToggle
      }, 
      React.createElement(Tabs, {selectedIndex: this.state.selectedTabIndex}, 
        tabs
      )
    );
    },
    _onChange: function() {
      return this.setState(AppStore.getData());
    }
  });

  module.exports = App;

}).call(this);
