# cytoscape-html-node

## Description

This extension allows for the creation of html in cytoscape nodes that can change based on zoom level.

This extension was built as a use case of https://github.com/kaluginserg/cytoscape-node-html-label.

## Dependencies

- cytoscape: ^3.16.3
- cytoscape-node-html-label: ^1.2.1

## Usage instructions

Download the library:

- via npm: `npm install cytoscape-html-node`
- via direct download in the repository

Import the library as appropriate for your project:

ES import:

```js
import cytoscape from 'cytoscape';
import { register as htmlnode } from 'cytoscape-html-node';

cytoscape.use(htmlnode);
```

CommonJS require:

```js
let cytoscape = require('cytoscape');
let htmlnode = require('cytoscape-html-node');

cytoscape.use(htmlnode);
```

AMD:

```js
require(['cytoscape', 'cytoscape-html-node'], function (cytoscape, htmlnode) {
  htmlnode(cytoscape);
});
```

## API

### Example

- For a more detailed example, see `example/src/example.js`.

```js
import cytoscape from 'cytoscape';
import { register as htmlnode } from 'cytoscape-html-node';

// register extensions
cytoscape.use(htmlnode);

let cy = cytoscape({
  container: document.getElementById('cy'),
  layout: {
    name: 'random',
  },
  style: [
    {
      selector: '.htmlNodeBaseStyle',
      style: {
        'background-color': 'lightgrey',
      },
    },
    {
      selector: '.htmlNodeAltStyle',
      style: {
        'background-color': 'darkblue',
      },
    },
  ],
  elements: [
    {
      group: 'nodes',
      data: {
        id: 'a1',
        shortSum: 'Short summary.',
        mediumSum: 'This a medium summary.',
        longSum: 'This is a much longer summary.',
      },
    },
    {
      group: 'nodes',
      data: {
        id: 'a2',
        shortSum: 'Short summary.',
        mediumSum: 'This a medium summary.',
        longSum: 'This is a much longer summary.',
      },
    },
    {
      group: 'nodes',
      data: {
        id: 'a3',
        shortSum: 'Short summary.',
        mediumSum: 'This a medium summary.',
        longSum: 'This is a much longer summary.',
      },
    },
    {
      group: 'nodes',
      data: {
        id: 'a4',
        shortSum: 'Short summary.',
        mediumSum: 'This a medium summary.',
        longSum: 'This is a much longer summary.',
      },
    },
  ],
});

const htmlnode = cy.htmlnode();

htmlnode.createHtmlNode(cytoscape, cy, {
  person: {
    query: "[type = 'person']",
    staticZoomLevel: 0.3,
    template: [
      {
        zoomRange: [0.3, 1],
        template: {
          html: `<div id="htmlLabel:#{data.id}">
                   <div class="largeFont">#{data.shortSum}</div>
                 </div>`,
          cssClass: 'htmlCard',
        },
      },
      {
        zoomRange: [1, 3],
        template: {
          html: `<div id="htmlLabel:#{data.id}">
                   <div class="mediumFont">#{data.mediumSum}</div>
                 </div>`,
          cssClass: 'htmlCard',
        },
      },
      {
        zoomRange: [3, 100],
        template: {
          html: `<div id="htmlLabel:#{data.id}" class="cardField">
                   <div class="smallFont">#{data.longSum}</div>
                 </div>`,
          cssClass: 'htmlCard',
        },
      },
    ],
  },

  event: {
    query: "[type = 'event']",
    template: [
      {
        zoomRange: [0.3, 1],
        template: {
          html: `<div id="htmlLabel:#{data.id}">
                   <div class="smallFont">#{data.shortEventInfo}</div>
                 </div>`,
          cssClass: 'htmlEvent',
        },
      },
      {
        zoomRange: [1, 3],
        template: {
          html: `<div id="htmlLabel:#{data.id}">
                   <div class="mediumFont">#{data.mediumEventInfo}</div>
                 </div>`,
          cssClass: 'htmlEvent',
        },
      },
      {
        zoomRange: [3, 100],
        template: {
          html: `<div id="htmlLabel:#{data.id}">
                   <div class="smallFont">#{data.longEventInfo}</div>
                 </div>`,
          cssClass: 'htmlEvent',
        },
      },
    ],
  },
});
```

Include the following `css` to use `staticZoomLevel`:

```
.html-node-notransition {
    -webkit-transition: none !important;
    -moz-transition: none !important;
    -o-transition: none !important;
    transition: none !important;
    -o-transform: none !important;
    -moz-transform: none !important;
    -ms-transform: none !important;
    -webkit-transform: none !important;
    transform: none !important;
}
```

### Use information

- The extension call should occur only once. All templates should be specified in that call, even if they are not immediately needed.

- `query`: Accepts any cytoscape query. Specifies which node(s) `template` will apply to. Nodes added after the intial extension call that match the `query` will have `html` applied to them.

- `staticZoomLevel`: Optionally specify a zoom level. When the cytoscape zoom level is greater than `staticZoomLevel`, the corresponding `html` has a static size.

- `htmlNodeBaseStyle`: The style of the cytoscape node(s) when zoom has not passed the minimum `zoomRange` value.

- `htmlNodeAltStyle`: The style of the cytoscape node(s) when zoom has passed the minimum `zoomRange` value.

- `zoomRange`: The zoom range for which the template html is used. The values for each `zoomRange` within a `query` should be continuous with ascending values. The minimum value of all `zoomRange` within a `query` specifies when to toggle between `altColor` and `defaultColor`. The largest `zoomRange` should be arbitrarily large.

- Cytoscape data can be accessed within html using `#{data.prop}` where prop is some cytoscape node data property.

- The parent `div` should follow: `<div id="htmlLabel:#{data.id}"></div>`

### Style suggestions

- The width and height of the parent html-node `div` should be specified.

- The parent html-node `div` should be centered.

- Either content should not exceed the height of the parent html-node `div` or overflow should be managed.
