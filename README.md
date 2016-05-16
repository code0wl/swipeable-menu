# Reveal menu UI
A performant swipeable list slide menu reveal that works on any framework just like apple mail or Gmail. +1 for simplicity.
The key is that is that performance is gained because most task are delegated to css and the composite layer at it's most transition calculations are made to work on the composite layer

<img src="demo.gif"/>

## Installation
<strong>For a demo, after starting the project with npm start. Just open the index.html and debug in mobile view to get touch events.</strong>
```
npm start 
```
[Demo](http://codepen.io/Ositoozy/pen/GZLbVo?editors=1010)

## Usage
Check the HTML and CSS and it will all become clear to you. Basically they are two menus in the same div. One is ontop and the other is at the bottom.
(important!) Keep in mind that it is only listening to touch events, so mouse events will not work. This is by design. 

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D