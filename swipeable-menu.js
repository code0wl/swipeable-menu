(function (w, d) {

    'use strict';

    /**
     * @param {object} state
     * @constructor SwipeableList
     */
    w.SwipeableList = function SwipeableList(state) {
        this.state = state;
        this.threshold = state.threshold;
        this.menuIsOpen = false;
        this.DOMElement = d.querySelector(state.element);
        this.closeMenu = this.closeMenu.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.handleTouch = this.handleTouch.bind(this);
        this.handler(this.DOMElement, 'addEventListener', ['touchstart', 'touchmove', 'touchend'], this.handleTouch);
    };

    SwipeableList.prototype = {
        handler: function (element, method, events, fn) {
            events.forEach(function (event) {
                element[method](event, fn);
            });
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
            this.handler(this.DOMElement, 'removeEventListener', ['touchstart', 'touchmove', 'touchend'], this.handleTouch);
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
            this.handler(this.DOMElement, 'addEventListener', ['touchstart', 'touchmove', 'touchend'], this.handleTouch);
        }
    };

    return {
        SwipeableList: SwipeableList
    }

})(window, document);