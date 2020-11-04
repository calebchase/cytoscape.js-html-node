## cytoscape-cxtmenu

## Description

This extension allows the creation of html embedded in cytoscape nodes that can change based on zoom level.

This extension was built as a use case of https://github.com/kaluginserg/cytoscape-node-html-label.

## Dependencies

- cytoscape: ^3.16.3,
- cytoscape-node-html-label": ^1.2.1

## Usage instructions

Download the library:

git clone https://github.com/calebchase/cytoscape.js-html-node.git

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

cytoscape.use(htmlnode); // register extension
```

AMD:

```js
require(['cytoscape', 'cytoscape-html-node'], function (cytoscape, htmlnode) {
  htmlnode(cytoscape); // register extension
});
```

## API

//TODO
