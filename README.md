Here the challenge provides the HTML and CSS, and a JS file representing the menu items. I moved the dateset to tis own file, then imported it into the main JS file. I then drew upon my React and API experience to render items into HTML.

Something like this in vanilla JS would be a lot more tedious, but React feels like the best choice as to a solution for this problem. I used the `map` function to iterate through the data set and render each item into HTML. I also used the `useState` hook to keep track of the quantity of each item.

I added a delete button to each item, which removes it from the list and updates the data set. Intuitive UX might also be for the the item to be removed once quantity is 0, but I decided to go solely with a delete button instead.
