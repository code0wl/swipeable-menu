# Reveal menu UI
A performant swipeable list slide menu reveal that works on any framework just like apple mail or Gmail. The focus is simplicity.

<p> Try the demo on your mobile device <a href="http://www.codeowl.tech/swipeable-menu/"> here </a></p>

<img src="demo.gif"/>

## Installation
<strong>For a demo, after starting the project with npm start. Just open the index.html and debug in mobile view to get touch events.</strong>
```
npm start
```

## Usage
Check the HTML and CSS and it will all become clear to you. Basically they are two menus in the same div. One is ontop and the other is at the bottom.
(important!) Keep in mind that it is only listening to touch events, so mouse events will not work. This is by design.

Include the script and create a new instance by
```
var swiper = new SwipeableList({
    element: '.swipeable-list',
    threshold: 50, // force it takes to open the menu
    speed: .5, // animation speed in seconds
    size: 25 // in percentages
});
```
