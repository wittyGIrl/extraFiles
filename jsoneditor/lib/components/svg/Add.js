(function() {
  var AddSvg, React;

  React = require('react');

  AddSvg = React.createClass({displayName: "AddSvg",
    render: function() {
      return (
      	React.createElement("svg", {viewBox: "0 0 128 128", width: "22pt", height: "22pt"}, 
          React.createElement("g", {"fill-rule": "evenodd"}, 
            React.createElement("path", {d: "M56,72 L8.00697327,72 C3.59075293,72 0,68.418278 0,64 C0,59.5907123 3.58484404,56 8.00697327,56 L56,56 L56,8.00697327 C56,3.59075293 59.581722,0 64,0 C68.4092877,0 72,3.58484404 72,8.00697327 L72,56 L119.993027,56 C124.409247,56 128,59.581722 128,64 C128,68.4092877 124.415156,72 119.993027,72 L72,72 L72,119.993027 C72,124.409247 68.418278,128 64,128 C59.5907123,128 56,124.415156 56,119.993027 L56,72 L56,72 Z"})
          )
        )
      );
    }
  });

  module.exports = AddSvg;

}).call(this);
