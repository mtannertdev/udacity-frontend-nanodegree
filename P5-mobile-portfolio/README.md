## Website Performance Optimization portfolio project

Project Challenge: Take a sub-optimal website and optimize it for speedy rendering and high PageSpeed score.

Working Project: https://mtannertdev.github.io/P6/index.html

#### PageSpeed Results
* Desktop 90/100
* Mobile 99/100

#### Optimization: /index.html
* Inlined all CSS
* Removed external font reference

#### Optimization: /views/images/pizzeria.jpg
* Resized to more realistic size based on typical rendering
* Compressed

#### Optimization: /views/js/main.js
* Tweaked 'resizePizzas' - more pre-work performed outside for loops, less repetitive work done in loops.
* Tweaked 'updatePositions' - broke single loop down to two loops, less unnecessary work, more pre-work performed prior to for loops
* Added 'onScroll' - Registered this event listener to capture the current value of the scroll bar as 'document.body.scrollTop' is no longer supported in Chrome
* Added 'lastScrollY' - global variable to hold scroll bar Y value used by 'updatePositions'


Note: While an improvement could be made such by mini-fying CSS, JS and HTML, it was deemed to be a trivial performance contribution for this particular project.
