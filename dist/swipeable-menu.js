!function(t,e){"use strict";return t.SwipeableList=function(t){this.threshold=t.threshold,this.state=t,this.DOMElement=e.querySelector(t.element),this.dragDropHandler=this.dragDropHandler.bind(this),this.drop=this.drop.bind(this),this.closeMenu=this.closeMenu.bind(this),this.openMenu=this.openMenu.bind(this),this.handleTouch=this.handleTouch.bind(this),this.unbindEvents=this.unbindEvents.bind(this),this.bindEvents()},SwipeableList.prototype={bindEvents:function(){this.DOMElement.addEventListener("touchstart",this.handleTouch),this.DOMElement.addEventListener("touchmove",this.handleTouch),this.DOMElement.addEventListener("touchend",this.handleTouch)},unbindEvents:function(){this.DOMElement.removeEventListener("touchstart",this.handleTouch),this.DOMElement.removeEventListener("touchmove",this.handleTouch),this.DOMElement.removeEventListener("touchend",this.handleTouch)},handleTouch:function(t){switch(this.state.touchPositionX=t.originalEvent?t.originalEvent.changedTouches[0].clientX:t.changedTouches[0].clientX,t.type){case"touchstart":this.state.startTouchPosition=this.state.touchPositionX;break;case"touchend":this.drop();break;default:this.state.startTouchPosition-this.state.touchPositionX>=this.threshold&&this.drag(t)}this.dragDropHandler(t)},dragDropHandler:function(t){t.stopImmediatePropagation(),t.preventDefault();var e=t.currentTarget;this.state.containerSize=e.clientWidth,this.state.item=t.srcElement},openMenu:function(){this.state.menuIsOpen=!0,this.state.item.style["-webkit-transform"]="translateX(-25%)",this.state.item.style["-webkit-transition"]="-webkit-transform .5s",this.unbindEvents(),this.DOMElement.addEventListener("touchend",this.closeMenu)},drag:function(t){this.state.isDragging=!0,this.state.draggedEl=this.state.startTouchPosition-this.state.touchPositionX,this.state.item.style["-webkit-transform"]="translateX(-"+this.state.draggedEl+"px)",this.state.item.style["-webkit-transition"]="none"},drop:function(){return console.log("dropped"),this.state.isDragging=!1,this.state.menuIsOpen||(this.state.draggedEl>=2*this.threshold?(this.openMenu(),this.state.draggedEl=0):this.closeMenu()),!0},closeMenu:function(){this.bindEvents(),this.state.menuIsOpen=!1,this.state.item.style["-webkit-transform"]="translateX(0)",this.state.item.style["-webkit-transition"]="-webkit-transform .5s"}},{SwipeableList:SwipeableList}}(window,document);