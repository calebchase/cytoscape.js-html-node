import { loadHtmlNode } from './htmlNode.js';

function register(cytoscape) {
  if (!cytoscape) {
    console.warn('Attempt to register cytoscape-stickynote with invalid cytoscape instance!');
    return;
  }
  cytoscape('core', 'htmlnode', loadHtmlNode);
}

// auto-register if there is global cytoscape (i.e. window.cytoscape)
if (typeof cytoscape !== 'undefined') {
  register(cytoscape);
}

export { register };
