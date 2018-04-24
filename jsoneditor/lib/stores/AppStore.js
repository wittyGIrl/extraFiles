(function() {
  var AppDispatcher, AppStore, CHANGE_EVENT, Constants, EventEmitter, _data, _selectTabIndex, addChild, debounce, debouncedChange, removeChild, switchTab, toggleCollape, toggleNav, updateValue, utils;

  AppDispatcher = require('../dispatcher/AppDispatcher');

  EventEmitter = require('events').EventEmitter;

  Constants = require('../constants/Constants');

  debounce = require('lodash.debounce');

  utils = require('../utils');

  CHANGE_EVENT = 'change';

  _data = {};

  _selectTabIndex = 0;

  addChild = function(data) {
    var c, child, i, len;
    if (!data.children) {
      data.children = [];
    }
    child = data.defaultChild;
    if (typeof child === 'function') {
      child = child();
    }
    if (child.length) {
      for (i = 0, len = child.length; i < len; i++) {
        c = child[i];
        data.children.push(utils.extend({}, c, ['editor']));
      }
    } else {
      data.children.push(utils.extend({}, child, ['editor']));
    }
    return true;
  };

  removeChild = function(data, index) {
    return data.children.splice(index, 1);
  };

  toggleCollape = function(data) {
    return data.collaped = !data.collaped;
  };

  switchTab = function(index) {
    return _selectTabIndex = index;
  };

  toggleNav = function() {
    return _data.open = !_data.open;
  };

  updateValue = function(data, target, value) {
    return data[target] = value;
  };

  AppStore = $.extend({}, EventEmitter.prototype, {
    setData: function(data) {
      _data = data;
      return this.emitChange();
    },
    getData: function() {
      _data.selectedTabIndex = _selectTabIndex;
      return _data;
    },
    emitChange: function() {
      return this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
      return this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
      return this.removeListener(CHANGE_EVENT, callback);
    }
  });

  AppDispatcher.register(function(action) {
    var data, index, target, value;
    switch (action.actionType) {
      case Constants.ADD_CHILD:
        data = action.data;
        if (data && data.defaultChild) {
          addChild(data);
          return AppStore.emitChange();
        }
        break;
      case Constants.REMOVE_CHILD:
        data = action.data, index = action.index;
        if (data && data.children && data.children.length && index >= 0) {
          removeChild(data, index);
          return AppStore.emitChange();
        }
        break;
      case Constants.TOGGLE_COLLAPE:
        data = action.data;
        if (data) {
          toggleCollape(data);
          return AppStore.emitChange();
        }
        break;
      case Constants.SWITCH_TABS:
        index = action.index;
        if (index >= 0) {
          switchTab(index);
          return AppStore.emitChange();
        }
        break;
      case Constants.OPEN_NAV:
        if (!_data.open) {
          toggleNav();
          return AppStore.emitChange();
        }
        break;
      case Constants.CLOSE_NAV:
        if (_data.open) {
          toggleNav();
          return AppStore.emitChange();
        }
        break;
      case Constants.TOGGLE_NAV:
        toggleNav();
        return AppStore.emitChange();
      case Constants.UPDATE_VALUE:
        data = action.data, target = action.target, value = action.value;
        if (data) {
          updateValue(data, target, value);
          return debouncedChange();
        }
    }
  });

  debouncedChange = debounce(AppStore.emitChange, 300).bind(AppStore);

  module.exports = AppStore;

}).call(this);
