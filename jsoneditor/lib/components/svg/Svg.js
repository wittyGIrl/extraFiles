(function() {
  var AddSvg, DeleteSvg, DownArrowSvg, React, RightArrowSvg, Svg;

  React = require('react');

  AddSvg = require('./Add');

  DeleteSvg = require('./Delete');

  DownArrowSvg = require('./DownArrow');

  RightArrowSvg = require('./RightArrow');

  Svg = React.createClass({displayName: "Svg",
    render: function() {
      var svg;
      svg = this.props.svg;
      switch (svg.toLowerCase()) {
        case 'add':
          return React.createElement(AddSvg, null);
        case 'delete':
          return React.createElement(DeleteSvg, null);
        case 'downarrow':
          return React.createElement(DownArrowSvg, null);
        case 'rightarrow':
          return React.createElement(RightArrowSvg, null);
      }
    }
  });

  module.exports = Svg;

}).call(this);
