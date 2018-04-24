(function() {
  var Actions, CollapsableField, Editor, Field, React, Title, classnames, utils;

  React = require('react');

  classnames = require('classnames');

  Title = require('./Title');

  Editor = require('./editor/Editor');

  Field = require('./Field');

  utils = require('../utils');

  Actions = require('../actions/Actions');

  CollapsableField = React.createClass({displayName: "CollapsableField",
    handleBeforeChange: function(value, oldValue, data) {
      if (typeof data === 'string') {
        data = this.props.data.name + "." + data;
      } else {
        data = this.props.data.name + "." + data.name;
      }
      if (this.props.onBeforeChange) {
        return this.props.onBeforeChange.call(this, value, oldValue, data);
      }
    },
    handleChange: function(value, oldValue, data) {
      if (typeof data === 'string') {
        data = this.props.data.name + "." + data;
      } else {
        data = this.props.data.name + "." + data.name;
      }
      if (this.props.onChange) {
        return this.props.onChange.call(this, value, oldValue, data);
      }
    },
    checkAttr: function(attr, attributes) {
      var a, hidden, j, len;
      hidden = attr.hidden;
      if (hidden == null) {
        return false;
      }
      if (typeof hidden === 'object') {
        for (j = 0, len = attributes.length; j < len; j++) {
          a = attributes[j];
          if (a.name === hidden.targetName) {
            return !~hidden.targetValues.indexOf(a.value);
          }
        }
      } else {
        return hidden;
      }
    },
    check: function(data) {
      var attr, j, k, len, len1, ref, ref1, target;
      if (data.hidden) {
        return false;
      }
      if (!data.children || data.children.length === 0) {
        if (data.attributes && data.attributes.length) {
          ref = data.attributes;
          for (j = 0, len = ref.length; j < len; j++) {
            attr = ref[j];
            if (!this.checkAttr(attr, data.attributes)) {
              if (target) {
                return false;
              }
              target = attr;
            }
          }
          if (target) {
            return target;
          }
        }
      }
      if (!(data.children && data.children.length === 1)) {
        return false;
      }
      target = data.children[0];
      if (target.name === 'text') {
        if (data.attributes && data.attributes.length) {
          ref1 = data.attributes;
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            attr = ref1[k];
            if (!this.checkAttr(attr, data.attributes)) {
              return false;
            }
          }
        }
        return target;
      } else if (target.hideItself) {
        return this.check(target);
      }
    },
    getFieldClass: function(data, className) {
      return classnames({
        'horizontal': !data.vertical
      }, className);
    },
    render: function() {
      var attr, attributes, children, data, elems, index, j, len, me, onAddChild, onRemoveChild, ref, style, target, text;
      elems = [];
      ref = this.props, data = ref.data, onAddChild = ref.onAddChild, onRemoveChild = ref.onRemoveChild;
      if (!data) {
        return React.createElement(Field, null);
      }
      style = this.props.style || {};
      children = data.children;
      index = 0;
      if (!(children && children.length || data.attributes || data.variableChildren)) {
        text = this.props.formatter ? this.props.formatter(data.name) : data.name;
        elems.push(
        React.createElement(Field, {className: this.getFieldClass(data, 'leaf'), label: text, key: index}, 
          React.createElement(Editor, React.__spread({
            onChange: this.handleChange, 
            onBeforeChange: this.handleBeforeChange, 
            autofocus: data.autofocus}, 
            data.editor, 
            {owner: data, 
            target: "value", 
            value: data.value}))
        )
      );
      } else {
        target = this.check(data);
        if (target) {
          text = this.props.formatter ? this.props.formatter(data.name) : data.name;
          elems.push(
          React.createElement(Field, {className: this.getFieldClass(data, 'leaf'), label: text, key: index}, 
            React.createElement(Editor, React.__spread({
              onChange: this.handleChange, 
              onBeforeChange: this.handleBeforeChange, 
              autofocus: target.autofocus}, 
              target.editor, 
              {owner: target, 
              target: "value", 
              value: target.value}))
          )
        );
        } else {
          if (data.name && !data.hideItself && !data.hideTitle) {
            if (style.marginLeft == null) {
              style.marginLeft = '1em';
            }
            text = this.props.formatter ? this.props.formatter(data.name) : data.name;
            elems.push(
            React.createElement(Title, {className: "x-group-title", text: text, key: index++, 
              index: this.props.index, 
              addable: !data.collaped && data.variableChildren, 
              removable: this.props.removable, 
              collaped: data.collaped, 
              onClick: this._onHandleClick, 
              onAdd: this._onHandleAdd, 
              onRemove: this.props.onRemove})
          );
          }
          if (!data.collaped) {
            if (data.attributes && !data.hideItself) {
              attributes = data.attributes;
              for (j = 0, len = attributes.length; j < len; j++) {
                attr = attributes[j];
                if (this.checkAttr(attr, attributes)) {
                  continue;
                }
                text = this.props.formatter ? this.props.formatter(attr.name) : attr.name;
                elems.push(
                  React.createElement(Field, {className: this.getFieldClass(attr, 'leaf'), label: text, key: index++}, 
                    React.createElement(Editor, React.__spread({
                      onChange: this.handleChange, 
                      onBeforeChange: this.handleBeforeChange}, 
                      attr.editor, 
                      {owner: attr, 
                      target: "value", 
                      value: attr.value}))
                  )
                );
              }
            }
            me = this;
            if (children) {
              children.forEach(function(child, i) {
                if (child.hidden) {
                  return;
                }
                return elems.push(
                React.createElement(CollapsableField, {data: child, key: index++, 
                  index: i, 
                  formatter: me.props.formatter, 
                  onChange: me.handleChange, 
                  onBeforeChange: this.handleBeforeChange, 
                  onAddChild: onAddChild, 
                  onRemoveChild: onRemoveChild, 
                  removable: data.variableChildren, 
                  onRemove: me._onHandleRemove})
              );
              });
            }
          }
        }
      }
      return React.createElement("div", {style: style}, 
      elems
    );
    },
    _onHandleAdd: function() {
      var flag;
      if (this.props.onAddChild) {
        flag = this.props.onAddChild.call(this, this.props.data);
      }
      if (flag !== false) {
        Actions.addChild(this.props.data);
      }
      if (typeof flag === 'function') {
        return flag();
      }
    },
    _onHandleRemove: function(index) {
      var flag;
      if (this.props.onRemoveChild) {
        flag = this.props.onRemoveChild.call(this, this.props.data, index);
      }
      if (flag !== false) {
        Actions.removeChild(this.props.data, index);
      }
      if (typeof flag === 'function') {
        return flag();
      }
    },
    _onHandleClick: function() {
      return Actions.toggleCollape(this.props.data);
    }
  });

  module.exports = CollapsableField;

}).call(this);
