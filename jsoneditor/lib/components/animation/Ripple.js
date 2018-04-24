(function() {
  var CircleRipple, PureRenderMixin, React, Ripple, TransitionGroup, ref, update;

  React = require('react');

  ref = React.addons, PureRenderMixin = ref.PureRenderMixin, TransitionGroup = ref.TransitionGroup, update = ref.update;

  CircleRipple = require('./CircleRipple');

  Ripple = React.createClass({displayName: "Ripple",
    mixins: [PureRenderMixin],
    getInitialState: function() {
      return {
        nextKey: 0,
        ripples: []
      };
    },
    render: function() {
      var children, rippleGroup, ripples;
      children = this.props.children;
      ripples = this.state.ripples;
      rippleGroup = React.createElement(TransitionGroup, {className: "ripple"}, 
      ripples
    );
      return React.createElement("div", {className: "ripple-container", 
      onMouseUp: this._handleMouseUp, 
      onMouseDown: this._handleMouseDown, 
      onMouseLeave: this._handleMouseLeave, 
      onTouchStart: this._handleTouchStart, 
      onTouchEnd: this._handleTouchEnd}, 
      rippleGroup, 
      children
    );
    },
    start: function(e, isRippleTouchGenerated) {
      var newRipple, ripples;
      if (this._ignoreNextMouseDown && !isRippleTouchGenerated) {
        this._ignoreNextMouseDown = false;
        return;
      }
      ripples = this.state.ripples;
      newRipple = React.createElement(CircleRipple, {
      key: this.state.nextKey, 
      style: this._getRippleStyle(e), 
      color: this.props.color});
      ripples = update(ripples, {
        $push: [newRipple]
      });
      this._ignoreNextMouseDown = isRippleTouchGenerated;
      return this.setState({
        nextKey: ++this.state.nextKey,
        ripples: ripples
      });
    },
    end: function() {
      var currentRipples;
      currentRipples = this.state.ripples;
      return this.setState({
        ripples: update(currentRipples, {
          $splice: [[0, 1]]
        })
      });
    },
    _handleMouseDown: function(e) {
      if (e.button === 0) {
        return this.start(e, false);
      }
    },
    _handleMouseUp: function() {
      return this.end();
    },
    _handleMouseLeave: function() {
      return this.end();
    },
    _offset: function(el) {
      var rect;
      rect = el.getBoundingClientRect();
      return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
      };
    },
    _getRippleStyle: function(e) {
      var botLeftDiag, botRightDiag, el, left, offset, offsetHeight, offsetWidth, pageX, pageY, pointerX, pointerY, rippleRadius, rippleSize, top, topLeftDiag, topRightDiag;
      el = ReactDOM.findDOMNode(this);
      offsetHeight = el.offsetHeight, offsetWidth = el.offsetWidth;
      offset = this._offset(el);
      pageX = e.pageX, pageY = e.pageY;
      pointerX = pageX - offset.left;
      pointerY = pageY - offset.top;
      topLeftDiag = this._calcDiag(pointerX, pointerY);
      topRightDiag = this._calcDiag(offsetWidth - pointerX, pointerY);
      botRightDiag = this._calcDiag(offsetWidth - pointerX, offsetHeight - pointerY);
      botLeftDiag = this._calcDiag(pointerX, offsetHeight - pointerY);
      rippleRadius = Math.max(topLeftDiag, topRightDiag, botRightDiag, botLeftDiag);
      rippleSize = rippleRadius * 2;
      left = pointerX - rippleRadius;
      top = pointerY - rippleRadius;
      return {
        height: rippleSize + "px",
        width: rippleSize + "px",
        top: top + "px",
        left: left + "px"
      };
    },
    _calcDiag: function(a, b) {
      return Math.sqrt(a * a + b * b);
    }
  });

  module.exports = Ripple;

}).call(this);
