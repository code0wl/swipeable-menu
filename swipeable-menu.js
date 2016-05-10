(function (w, d) {

    'use strict';

    /**
     * @param {object} state
     * @constructor SwipeableList
     */
    w.SwipeableList = function SwipeableList(state) {
        this.threshold = state.threshold;
        this.state = state;
        this.menuIsOpen = false;
        this.DOMElement = d.querySelector(state.element);
        this.dragDropHandler = this.dragDropHandler.bind(this);
        this.drop = this.drop.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.handleTouch = this.handleTouch.bind(this);
        this.unbindEvents = this.unbindEvents.bind(this);
        this.bindEvents();
    };

    SwipeableList.prototype = {
        
        bindEvents: function () {
            this.DOMElement.addEventListener('touchstart', this.handleTouch);
            this.DOMElement.addEventListener('touchmove', this.handleTouch);
            this.DOMElement.addEventListener('touchend', this.handleTouch);
        },

        unbindEvents: function () {
            this.DOMElement.removeEventListener('touchstart', this.handleTouch);
            this.DOMElement.removeEventListener('touchmove', this.handleTouch);
            this.DOMElement.removeEventListener('touchend', this.handleTouch);
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
            this.state.menuIsOpen = true;
            this.state.item.style['-webkit-transform'] = 'translateX(' + -25 + '%)';
            this.state.item.style['-webkit-transition'] = '-webkit-transform .5s';
            this.unbindEvents();
            this.DOMElement.addEventListener('touchend', this.closeMenu);
        },

        drag: function (e) {
            this.state.isDragging = true;
            this.state.draggedEl = this.state.startTouchPosition - this.state.touchPositionX;
            this.state.item.style["-webkit-transform"] = 'translateX(-' + this.state.draggedEl + 'px)';
            this.state.item.style["-webkit-transition"] = 'none';
            e.preventDefault();
        },

        drop: function () {
            console.log('dropped');
            this.state.isDragging = false;
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
            this.state.menuIsOpen = false;
            this.state.item.style["-webkit-transform"] = 'translateX(' + 0 + ')';
            this.state.item.style["-webkit-transition"] = '-webkit-transform .5s';
            this.DOMElement.removeEventListener('touchend', this.closeMenu);
            this.bindEvents();
        }
    };

    return {
        SwipeableList: SwipeableList
    }

})(window, document);