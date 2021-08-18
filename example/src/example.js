import cytoscape from 'cytoscape';
// import { register as htmlnode } from 'cytoscape-html-node';
// import { register as htmlnode } from '../../src/index.js';
import { register as htmlnode } from '../../dist/main.bundle.js';

cytoscape.use(htmlnode);

document.addEventListener('DOMContentLoaded', function () {
  let cy = (window.cy = cytoscape({
    container: document.getElementById('cy'),
    autounselectify: 'true',
    style: [
      {
        selector: 'node',
        css: {
          content: ' ',
        },
        style: {
          content: '',
          'background-color': 'lightgrey',
          shape: 'round-rectangle',
        },
      },
      {
        selector: 'edge',
        style: {
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
        },
      },
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
    elements: {
      nodes: [],
    },
  }));

  let picArray = [
    'images/rKint.png',
    'images/fFenster.png',
    'images/mMcManus.png',
    'images/tHockney.png',
    'images/user-solid.svg',
  ];

  let picArrayh = ['images/hd1.jpg', 'images/hd2.jpg', 'images/hd3.jpg', 'images/hd4.jpg'];

  for (let i = 0; i < 20; i++) {
    cy.add([
      {
        group: 'nodes',
        data: {
          type: 'person',
          longName: 'Roger Kint',
          shortName: 'Kint',
          image: picArray[Math.floor(Math.random() * picArray.length)],
        },
      },
      {
        group: 'nodes',
        data: {
          type: 'event',
          longName: 'event event',
          shortName: 'event',
          image: picArray[Math.floor(Math.random() * picArray.length)],
        },
      },
      {
        group: 'nodes',
        data: {
          type: 'identifier',
          identifierTitle: 'Bank Info',
          icon: 'credit_card',
          shortSum: 'Details',
          longSum: 'this is some test info to use',
        },
      },
    ]);
  }

  var layout = cy.layout({ name: 'grid', spacingFactor: 2 });
  layout.run();

  var intervalId = window.setInterval(function () {
    cy.add([
      {
        group: 'nodes',
        data: {
          type: 'event',
          longName: 'event event',
          shortName: 'event',
          image: picArray[Math.floor(Math.random() * picArray.length)],
        },
      },
      {
        group: 'nodes',
        data: {
          type: 'event',
          longName: 'event event',
          shortName: 'event',
          image: picArray[Math.floor(Math.random() * picArray.length)],
        },
      },
      {
        group: 'nodes',
        data: {},
      },
      {
        group: 'nodes',
        data: {
          type: 'identifier',
          identifierTitle: 'Bank Info',
          icon: 'credit_card',
          shortSum: 'Details',
          longSum: 'this is some test info to use',
        },
      },
      {
        group: 'nodes',
        data: {
          type: 'person',
          longName: 'person',
          shortName: 'person person',
          image: picArray[Math.floor(Math.random() * picArray.length)],
        },
      },
    ]);
    cy.layout({ name: 'grid', spacingFactor: 2, fit: false }).run();
  }, 5000);

  const htmlnode = cy.htmlnode();

  htmlnode.createHtmlNode(cytoscape, cy, {
    person: {
      query: "[type = 'person']",
      nodeStyle: {
        base: 'htmlNodeBaseStyle',
        alt: 'htmlNodeAltStyle',
      },
      staticZoomLevel: 0.3,
      template: [
        {
          zoomRange: [0.001, 100],

          template: {
            html: `<div id="htmlLabel:#{data.id}" class="">
                        <div class=" largeFont">#{data.longName}</div>
                        <img src="#{data.image}" loading="lazy">
                        </div>`,
            cssClass: 'htmlPerson',
          },
        },
      ],
    },

    event: {
      query: "[type = 'event']",
      nodeStyle: {
        base: 'htmlNodeBaseStyle',
        alt: 'htmlNodeAltStyle',
      },
      template: [
        {
          zoomRange: [0.3, 1],
          template: {
            html: `<div id="htmlLabel:#{data.id}">
                        <div class="main-container">
                        <div class="left-container"><i style="color:darkred;"class="material-icons font">event</i></div>
                        <div class="right-container">
                        <div class="half-containers largeFont"><b>#{data.eventTitle}</b></div>
                        </div>
                        </div>
                        </div>`,
            cssClass: 'htmlEvent',
          },
        },
        {
          zoomRange: [1, 3],
          template: {
            html: `<div id="htmlLabel:#{data.id}">
                        <div class="main-container">
                        <div class="left-container"><i style="color:darkred;"class="material-icons font">event</i></div>
                        <div class="right-container eventTitle">
                        <div class="half-containers"><b>#{data.eventTitle}</b></div>
                        <div class="half-containers">#{data.shortSum}</div>
                        </div>
                        </div>
                        </div>`,
            cssClass: 'htmlEvent',
          },
        },
        {
          zoomRange: [3, 100],
          template: {
            html: `<div id="htmlLabel:#{data.id}">
                        <div class="main-container">
                        <div class="left-container"><i style="color:darkred;"class="material-icons font">event</i></div>
                        <div class="right-container smallFont eventTitle">
                        <div class="half-containers"><b>#{data.eventTitle}</b></div>
                        <div class="half-containers">#{data.longSum}</div>
                        </div>
                        </div>
                        </div>`,
            cssClass: 'htmlEvent',
          },
        },
      ],
    },

    identifier: {
      query: "[type = 'identifier']",
      nodeStyle: {
        base: 'htmlNodeBaseStyle',
        alt: 'htmlNodeAltStyle',
      },
      staticZoomLevel: 0.7,
      template: [
        {
          zoomRange: [0.3, 1],
          template: {
            html: `<div id="htmlLabel:#{data.id}" >
                        <div class="largeFont">#{data.identifierTitle}</div>
                        <i style="color:darkgreen;"class="material-icons font">#{data.icon}</i>
                        </div>`,
            cssClass: 'htmlidentifier',
          },
        },
        {
          zoomRange: [1, 3],
          template: {
            html: `<div id="htmlLabel:#{data.id}" >
                        <div>#{data.identifierTitle}</div>
                        <i style="color:darkgreen;" class="material-icons font">#{data.icon}</i>
                        <div>#{data.shortSum}</div>
                        </div>`,
            cssClass: 'htmlidentifier',
          },
        },
        {
          zoomRange: [3, 100],
          template: {
            html: `<div id="htmlLabel:#{data.id}" >
                        <div>
                        <i style="color:darkgreen;" class="material-icons iconHeight smallFont">#{data.icon}</i>
                        <span class="smallFont cardField">#{data.identifierTitle}</span>
                        </div>

                        <div class="smallFont">#{data.longSum}</div>
                        </div>`,
            cssClass: 'htmlidentifier',
          },
        },
      ],
    },
  });
});
