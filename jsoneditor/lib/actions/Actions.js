(function() {
  var Actions, AppDispatcher, Constants;

  AppDispatcher = require('../dispatcher/AppDispatcher');

  Constants = require('../constants/Constants');

  Actions = {
    addChild: function(data) {
      return AppDispatcher.dispatch({
        actionType: Constants.ADD_CHILD,
        data: data
      });
    },
    removeChild: function(data, index) {
      return AppDispatcher.dispatch({
        actionType: Constants.REMOVE_CHILD,
        data: data,
        index: index
      });
    },
    toggleCollape: function(data) {
      return AppDispatcher.dispatch({
        actionType: Constants.TOGGLE_COLLAPE,
        data: data
      });
    },
    switchTab: function(index) {
      return AppDispatcher.dispatch({
        actionType: Constants.SWITCH_TABS,
        index: index
      });
    },
    openNav: function() {
      return AppDispatcher.dispatch({
        actionType: Constants.OPEN_NAV
      });
    },
    closeNav: function() {
      return AppDispatcher.dispatch({
        actionType: Constants.CLOSE_NAV
      });
    },
    toggleNav: function() {
      return AppDispatcher.dispatch({
        actionType: Constants.TOGGLE_NAV
      });
    },
    updateValue: function(data, target, value) {
      return AppDispatcher.dispatch({
        actionType: Constants.UPDATE_VALUE,
        data: data,
        target: target,
        value: value
      });
    }
  };

  module.exports = Actions;

}).call(this);
