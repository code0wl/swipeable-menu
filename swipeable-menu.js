'use strict';

var SwipeableList = function SwipeableList(state) {
	this.state = state;
	this.threshold = state.threshold;
	this.size = state.size;
	this.speed = state.speed;
	this.DOMElement = document.querySelector(state.element);

	this.animate = this.animate.bind(this);
	this.closeMenu = this.closeMenu.bind(this);
	this.openMenu = this.openMenu.bind(this);
	this.handleTouch = this.handleTouch.bind(this);

	this.handler(this.DOMElement, 'addEventListener', ['touchstart', 'touchmove', 'touchend'], this.handleTouch);
};

SwipeableList.prototype = {
	handler: function (element, method, events, fn) {
		events.forEach(function (event) {
			element[method](event, fn, {passive: true});
		});
	},

	animate: function (amount, speed, type) {
		this.state.item.style['transform'] = 'translate3d(' + -(amount) + type + ', 0, 0)';
		this.state.item.style['transition'] = 'transform ' + speed + 's';
	},

	handleTouch: function (e) {
		this.state.touchPositionX = e.originalEvent ? e.originalEvent.changedTouches[0].clientX : e.changedTouches[0].clientX;

		switch (e.type) {
			case 'touchstart':
				this.state.startTouchPosition = this.state.touchPositionX;
				break;

			case 'touchend':
				this.drop();
				break;

			default:
				if (this.state.startTouchPosition - this.state.touchPositionX >= this.threshold) {
					if (!this.menuIsOpen) {
						this.drag(e);
					}
				}
				break;
		}
		this.dragDropHandler(e);
	},

	dragDropHandler: function (e) {
		e.stopImmediatePropagation();
		var el = e.currentTarget;
		this.state.containerSize = el.clientWidth;
		this.state.item = e.srcElement;
	},

	openMenu: function () {
		this.state.menuIsOpen = 1;
		this.animate(this.state.size, this.state.speed, '%');
		this.handler(this.DOMElement, 'removeEventListener', ['touchstart', 'touchmove', 'touchend'], this.handleTouch);
		this.DOMElement.addEventListener('touchend', this.closeMenu);
	},

	drag: function () {
		this.state.isDragging = 1;
		this.state.draggedEl = this.state.startTouchPosition - this.state.touchPositionX;
		this.animate(this.state.draggedEl, 0, 'px');
	},

	drop: function () {
		this.state.isDragging = 0;
		if (!this.state.menuIsOpen) {
			if (this.state.draggedEl >= this.threshold * 2) {
				this.openMenu();
				this.state.draggedEl = 0;
			} else {
				this.closeMenu();
			}
		}
		return true;
	},

	closeMenu: function () {
		this.state.menuIsOpen = 0;
		this.animate(0, this.state.speed, '%');
		this.handler(this.DOMElement, 'addEventListener', ['touchstart', 'touchmove', 'touchend'], this.handleTouch);
	}
};

