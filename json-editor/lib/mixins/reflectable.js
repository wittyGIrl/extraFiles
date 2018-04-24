"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
* reflect the value
*/

var Reflectable = {
  _reflect: function _reflect(value) {
    if (this.props.owner && this.props.target) {
      this.props.owner[this.props.target] = value;
    }
  }
};

exports.default = Reflectable;