'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _colors = require('./common/colors');

var _colors2 = _interopRequireDefault(_colors);

var _editor = require('./common/editor');

var _editor2 = _interopRequireDefault(_editor);

var _title = require('./title');

var _title2 = _interopRequireDefault(_title);

var _field = require('./field');

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  title: {
    padding: '2px',
    backgroundColor: _colors2.default.grey200,
    border: '1px solid #c1dce9',
    position: 'relative',
    marginBottom: '0.25em',
    lineHeight: '20px',
    borderRadius: '3px'
  }
};

var CollapsableField = _react2.default.createClass({
  displayName: 'CollapsableField',
  getDefaultProps: function getDefaultProps() {
    return {
      hiddenKeys: ['key', 'uniqueKey', '_options']
    };
  },
  getInitialState: function getInitialState() {
    return {
      collaped: (0, _utils.isNil)(this.props.collaped) ? false : this.props.collaped
    };
  },


  /* 检验属性是否显示
  * hidden为object时，{
  *   targetName: 'type',
  *   targetValues: ['a', 'b']
  * }
  * 适用于 当前属性是否显示取决于同级的另一个属性。如果这个属性为某些特定的值，那么当前属性显示。
  */
  _isHidden: function _isHidden(hidden, data) {
    if ((typeof hidden === 'undefined' ? 'undefined' : _typeof(hidden)) !== 'object') return hidden;

    for (var key in data) {
      if (!data.hasOwnProperty(key)) continue;
      if (key === hidden.targetName) {
        if ((0, _utils.isArray)(hidden.targetValues)) {
          return !~hidden.targetValues.indexOf(data[key]);
        } else {
          return data[key] !== hidden.targetValues;
        }
      }
    }
  },
  getText: function getText(text) {
    var formatter = this.props.formatter;
    return formatter ? formatter(text) : text;
  },
  render: function render() {
    //onRemove remove 整个collapsableField
    //onRemoveChild remove collapsableField下一个子节点
    var _props = this.props,
        data = _props.data,
        options = _props.options,
        title = _props.title,
        removable = _props.removable,
        style = _props.style,
        formatter = _props.formatter,
        hiddenKeys = _props.hiddenKeys,
        onAdd = _props.onAdd,
        onRemove = _props.onRemove,
        onRemoveChild = _props.onRemoveChild,
        onChange = _props.onChange;
    var collaped = this.state.collaped;


    var elems = [];
    if (!data) return _react2.default.createElement(_field2.default, null);

    var index = 0;
    var getText = this.getText;
    if (title) {
      elems.push(_react2.default.createElement(_title2.default, { text: getText(title), key: index++, style: styles.title,
        index: this.props.index,
        addable: options && options.defaultChild,
        removable: removable,
        collaped: collaped,
        onClick: this._handleClick,
        onAdd: this._handleAdd,
        onRemove: onRemove
      }));
    }

    var _options = data._options || {};
    var opt;
    if (!collaped) {
      if ((0, _utils.isArray)(data)) {
        data.forEach(function (item, i) {
          opt = options && options.childOptions;
          elems.push(_react2.default.createElement(CollapsableField, { data: item, options: opt, key: index++,
            collaped: opt && opt._collaped,
            title: getText(options && options.childName),
            removable: options && options.defaultChild,
            index: i,
            onAdd: onAdd,
            onRemove: this._handleRemove,
            onRemoveChild: onRemoveChild,
            onChange: onChange,
            formatter: formatter
          }));
        }, this);
      } else {
        for (var key in data) {
          if (!data.hasOwnProperty(key) || ~hiddenKeys.indexOf(key)) continue;
          opt = _options[key] || options && options[key];

          if (opt && opt.template) {
            if (data.name) {
              var compiled = (0, _utils.formate)(opt.template);
              data[key] = compiled(data);
            } else {
              data[key] = '';
            }
          }

          if (this._isHidden(opt && opt.hidden, data) === true) continue;

          if (_typeof(data[key]) === 'object' && opt && !opt.isValue) {
            elems.push(_react2.default.createElement(CollapsableField, { data: data[key], options: opt, key: index++,
              collaped: opt && opt._collaped,
              title: getText(key),
              index: key,
              onAdd: onAdd,
              onRemove: this._handleRemove,
              onRemoveChild: onRemoveChild,
              onChange: onChange,
              formatter: formatter
            }));
            continue;
          }

          elems.push(_react2.default.createElement(
            _field2.default,
            { label: getText(key), key: index++,
              editable: options && options.keyEditable,
              owner: data,
              index: key,
              onRemove: this._handleRemove,
              onLabelChange: onChange
            },
            _react2.default.createElement(_editor2.default, _extends({}, opt && opt.editor, {
              onChange: this._handleChange,
              owner: data,
              target: key,
              value: data[key]
            }))
          ));
        }
      }
    }

    var rootStyle = {
      marginLeft: title ? '0.5em' : 0
    };
    return _react2.default.createElement(
      'div',
      { style: Object.assign(rootStyle, style) },
      elems
    );
  },
  _handleClick: function _handleClick() {
    this.setState({ collaped: !this.state.collaped });
  },


  //add child
  _handleAdd: function _handleAdd() {
    if (this.props.onAdd) {
      var _props2 = this.props,
          data = _props2.data,
          options = _props2.options,
          onAdd = _props2.onAdd;

      var defaultChild = options.defaultChild;
      if (typeof defaultChild === 'function') {
        defaultChild = defaultChild();
      }
      onAdd(data, (0, _utils.extend)(true, {}, defaultChild));
    }
  },

  //remove child
  _handleRemove: function _handleRemove(index) {
    if (this.props.onRemoveChild) {
      var _props3 = this.props,
          data = _props3.data,
          onRemoveChild = _props3.onRemoveChild;

      onRemoveChild(data, index);
    }
  },
  _handleChange: function _handleChange(value, oldValue) {
    if (this.props.onChange) {
      var onChange = this.props.onChange;

      onChange(value, oldValue);
    }
  }
});

exports.default = CollapsableField;