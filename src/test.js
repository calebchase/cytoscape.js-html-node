import cytoscape from 'cytoscape';
import { register as htmlnode } from '../dist/main.bundle.js';
//import { register as htmlnode } from "./index.js";

var nodeHtmlLabel = require('cytoscape-node-html-label');

cytoscape.use(htmlnode);
nodeHtmlLabel(cytoscape);

document.addEventListener('DOMContentLoaded', function () {
  var cy = (window.cy = cytoscape({
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
          width: 100,
          height: 100,
        },
      },
      {
        selector: 'edge',
        style: {
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
        },
      },
    ],
    elements: {
      nodes: [
        {
          data: {
            id: 'a',
            type: 'person',
            longName: 'Dean Keaton',
            shortName: 'Keaton',
            image: './examplePics/dKeaton.png',
            shortSum: 'Ex police officer.  In relationship with a lawyer.',
            longSum:
              'Indicted for corruption. Currently in a relationship with a lawyer. No recent infractions.',
          },
        },

        {
          data: {
            id: 'b',
            type: 'person',
            longName: 'Roger Kint',
            shortName: 'Kint',
            image: './examplePics/rKint.png',
            shortSum: 'Disabled. Witness to incident. Manipulator.',
            longSum:
              'Physically disabled. Expert at verbal manipulation. Only conscious witness to incident.',
          },
        },

        {
          data: {
            id: 'c',
            type: 'person',
            longName: 'Fred Fenster',
            shortName: 'Fenster',
            image: './examplePics/fFenster.png',
            shortSum: 'Works with McManus. Killed by Söze.',
            longSum: 'This a long summary that includes more background info to show.',
          },
        },

        {
          data: {
            id: 'd',
            type: 'person',
            longName: 'Todd Hockney',
            shortName: 'Hockney',
            image: './examplePics/tHockney.png',
            shortSum: 'Auto mechanic. Knowledgeable with explosives.',
            longSum: 'This a long summary that includes more background info to show.',
          },
        },

        {
          data: {
            id: 'e',
            type: 'person',
            longName: 'Mike McManus',
            shortName: 'McManus',
            image: './examplePics/mMcManus.png',
            shortSum: 'Works with Fenster. Proposes heist. ',
            longSum: 'This a long summary that includes more background info to show.',
          },
        },

        // { data: { id: 'b', type: 'person', name: 'Corbin Horne', image: 'testB.jpg', location: 'south', info: 'this is some test info to use', newData: 'This is new data!' } },
        {
          data: {
            id: 'f',
            type: 'event',
            eventTitle: 'Interrogation',
            image: 'testC.jpg',
            longSum: 'Led by David Kujan. Concerns boat incident.',
            shortSum: 'Led by David Kujan.',
          },
        },
        {
          data: {
            id: 'g',
            type: 'event',
            eventTitle: 'Line Up',
            image: 'testC.jpg',
            longSum: 'Hijacking suspects.',
            shortSum: 'Hijacking suspects.',
          },
        },

        {
          data: {
            id: 'aC',
            type: 'identifier',
            identifierTitle: 'Contacts',
            icon: 'class',
            shortSum: 'Details',
            longSum: 'Benn Mcclain, Kirk Shaffer, Eugene Mitchell',
          },
        },
        {
          data: {
            id: 'bC',
            type: 'identifier',
            identifierTitle: 'Contacts',
            icon: 'class',
            shortSum: 'Details',
            longSum: 'Damien Mcloughlin, Dominik R, Reya Mckinney',
          },
        },
        {
          data: {
            id: 'dC',
            type: 'identifier',
            identifierTitle: 'Contacts',
            icon: 'class',
            shortSum: 'Details',
            longSum: 'this is some test info to use',
          },
        },
        {
          data: {
            id: 'eC',
            type: 'identifier',
            identifierTitle: 'Contacts',
            icon: 'class',
            shortSum: 'Details',
            longSum: 'this is some test info to use',
          },
        },

        {
          data: {
            id: 'aT',
            type: 'identifier',
            identifierTitle: 'Timeline',
            icon: 'timeline',
            shortSum: 'Details',
            longSum: 'this is some test info to use',
          },
        },
        {
          data: {
            id: 'bT',
            type: 'identifier',
            identifierTitle: 'Timeline',
            icon: 'timeline',
            shortSum: 'Details',
            longSum: 'this is some test info to use',
          },
        },
        {
          data: {
            id: 'cT',
            type: 'identifier',
            identifierTitle: 'Timeline',
            icon: 'timeline',
            shortSum: 'Details',
            longSum: 'this is some test info to use',
          },
        },

        {
          data: {
            id: 'dB',
            type: 'identifier',
            identifierTitle: 'Bank Info',
            icon: 'credit_card',
            shortSum: 'Details',
            longSum: 'this is some test info to use',
          },
        },
        {
          data: {
            id: 'cB',
            type: 'identifier',
            identifierTitle: 'Bank Info',
            icon: 'credit_card',
            shortSum: 'Details',
            longSum: 'this is some test info to use',
          },
        },
        {
          data: {
            id: 'eB',
            type: 'identifier',
            identifierTitle: 'Bank Info',
            icon: 'credit_card',
            shortSum: 'Details',
            longSum: 'this is some test info to use',
          },
        },
      ],
      edges: [
        { data: { source: 'a', target: 'aC' } },
        { data: { source: 'a', target: 'aT' } },
        { data: { source: 'a', target: 'g' } },

        { data: { source: 'b', target: 'bT' } },
        { data: { source: 'b', target: 'bC' } },
        { data: { source: 'b', target: 'g' } },

        { data: { source: 'c', target: 'cT' } },
        { data: { source: 'c', target: 'cB' } },
        { data: { source: 'c', target: 'g' } },

        { data: { source: 'd', target: 'dB' } },
        { data: { source: 'd', target: 'dC' } },
        { data: { source: 'd', target: 'g' } },

        { data: { source: 'e', target: 'eC' } },
        { data: { source: 'e', target: 'eB' } },
        { data: { source: 'e', target: 'g' } },

        { data: { source: 'b', target: 'f' } },
      ],
    },
    layout: {
      name: 'grid',
      spacingFactor: 0.5,
    },
  }));

  const htmlnode = cy.htmlnode();

  htmlnode.test(cy, {
    person: {
      query: "[type = 'person']",
      defaultColor: 'lightGrey',
      altColor: 'darkBlue',
      template: [
        {
          zoomRange: [0.3, 1],
          template: {
            html: `<div id="htmlLabel:#{data.id}" class="">
                      <div class=" largeFont">#{data.longName}</div>
                    </div>`,
            cssClass: 'htmlCard',
          },
        },
        {
          zoomRange: [1, 3],
          template: {
            html: `<div id="htmlLabel:#{data.id}" class="cardField">
                      <div class="cardField">
                        <i class="material-icons iconHeight">person</i>
                        <span class="">#{data.shortName}</span>
                      </div>

                      <div class="">#{data.shortSum}</div>
                    </div>`,
            cssClass: 'htmlCard',
          },
        },
        {
          zoomRange: [3, 100],
          template: {
            html: `<div id="htmlLabel:#{data.id}" class="cardField">
                      <div class="cardField">
                        <i class="material-icons iconHeight smallFont">person</i>
                        <span class="smallFont">#{data.longName}</span>
                      </div>
                      <div class="smallFont">#{data.longSum}</div>
                    </div>`,
            cssClass: 'htmlCard',
          },
        },
      ],
    },

    event: {
      query: "[type = 'event']",
      defaultColor: 'lightGrey',
      altColor: 'darkRed',
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
      defaultColor: 'lightGrey',
      altColor: 'darkGreen',
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
                      <i style="color:darkgreen;"class="material-icons font">#{data.icon}</i>
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
                        <i style="color:darkgreen"class="material-icons iconHeight smallFont">#{data.icon}</i>
                        <span class="smallFont cardFeild">#{data.identifierTitle}</span>
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
