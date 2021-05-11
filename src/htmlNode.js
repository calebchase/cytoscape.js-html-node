export function loadHtmlNode() {
  // Sets starting html for labels based on cytoscape zoom level
  function intializeCardHtml(cy, templates, query) {
    let cyZoom = cy.zoom();
    for (let i = 0; i < templates.length; i++) {
      if (cyZoom >= templates[i].zoomRange[0] && cyZoom < templates[i].zoomRange[1]) {
        templates[i].htmlSet = true;
        setCardData(cy, templates[i].template, query);
        return templates[i].zoomRange;
      }
    }
  }

  // Replaces string targets with cytoscape node data
  function getCardHtml(data, cardData) {
    let htmlString = cardData.html;
    let dataProp;

    let final = htmlString.replaceAll(/#{.*?}/g, (target) => {
      // '#{data.prop}' => 'prop'
      dataProp = target.substring('#{data.'.length, target.length - 1);
      return data[dataProp];
    });
    return final;
  }

  function updateCardData(cy, cardData, query) {
    cy.nodes(query).forEach(function (ele) {
      let eleNodeHtml = ele.data('htmlNode');

      if (eleNodeHtml) {
        ele.data('htmlNode').innerHTML = getCardHtml(ele.data(), cardData);
      }

      let div = document.getElementById(`htmlLabel:${ele.id()}`);

      if (div != null) {
        div.innerHTML = getCardHtml(ele.data(), cardData);
      }
    });
  }

  // Call to nodeHtmlLabel, displays htm
  function setCardData(cy, cardData, query) {
    cy.nodeHtmlLabel([
      {
        query: query, // cytoscape query selector
        halign: 'center', // title vertical position. Can be 'left',''center, 'right'
        valign: 'center', // title vertical position. Can be 'top',''center, 'bottom'
        halignBox: 'center', // title vertical position. Can be 'left',''center, 'right'
        valignBox: 'center', // title relative box vertical position. Can be 'top',''center, 'bottom'
        cssClass: cardData.cssClass, // any classes will be as attribute of <div> container for every title
        tpl(data) {
          return getCardHtml(data, cardData);
        },
      },
    ]);
  }

  // Removes html label for corresponding cytoscape node
  function removeHtmlLabel(htmlId) {
    let target = document.getElementById(`htmlLabel:${htmlId}`);
    if (target != null) {
      target.parentElement.parentElement.style.visibility = 'hidden';
      return true;
    }
    return false;
  }

  // Removes html labels for corresponding cytoscape query
  function removeHtmlLabels(cy, query) {
    let cyNodes = cy.elements(query);
    let length = cyNodes.length;
    let found = false;

    for (let i = 0; i < length; i++) {
      found = removeHtmlLabel(cyNodes[i].id());
      if (found) return;
    }
  }

  function showHtmlLabel(htmlId) {
    let target = document.getElementById(`htmlLabel:${htmlId}`);
    if (target != null) {
      target.parentElement.parentElement.style.visibility = 'visible';
      return true;
    }
    return false;
  }

  // Removes html labels for corresponding cytoscape query
  function showHtmlLabels(cy, query) {
    let cyNodes = cy.elements(query);
    let length = cyNodes.length;
    let found = false;

    for (let i = 0; i < length; i++) {
      found = showHtmlLabel(cyNodes[i].id());
      if (found) return;
    }
  }

  function updateNewNodeSet(cy, newNodeSet) {
    newNodeSet.forEach((nodeId) => {
      newNodeSet.delete(nodeId);
    });
  }

  function updateNodesOnRender(cy, newNodeSet) {
    if (newNodeSet.size != 0) updateNewNodeSet(cy, newNodeSet);
    else {
      cy.removeListener('render a');
    }
  }

  // Set html labels based on templates, sets cytoscape zoom to change html based on cytoscape zoom level
  function setTemplate(cy, templates, query) {
    let curZoomRange = intializeCardHtml(cy, templates, query);
    let minZoom = templates[0].zoomRange[0];
    let htmlRemoved = false;
    let altColorSet = false;
    let resized = false;
    let i;

    let newNodeSet = new Set();

    cy.on('add', query, function (evt) {
      let curretnIndex = i;
      if (altColorSet) {
        cy.batch(() => {
          evt.target.addClass('htmlNodeAltStyle');
        });
      } else {
        evt.target.addClass('htmlNodeBaseStyle');
      }

      cy.on('render', function () {
        updateNodesOnRender(cy, newNodeSet);
        if (templates[curretnIndex] != undefined) {
          updateCardData(cy, templates[i].template, `node#${evt.target.id()}`);
        }
      });

      if (templates[curretnIndex] != undefined) {
        updateCardData(cy, templates[i].template, `node#${evt.target.id()}`);
      }
      //cy.emit('render');
    });

    cy.on('zoom', function (evt) {
      let zoom = cy.zoom();

      if (zoom < minZoom && !htmlRemoved) {
        removeHtmlLabels(cy, query);

        htmlRemoved = true;
        curZoomRange = [0, templates[0].zoomRange[0]];

        cy.batch(() => {
          cy.$(query).addClass('htmlNodeAltStyle');
          cy.$(query).removeClass('htmlNodeBaseStyle');
        });
        altColorSet = true;
      } else if (zoom < curZoomRange[0] || zoom > curZoomRange[1]) {
        console.log('here');
        for (i = 0; i < templates.length; i++) {
          if (zoom > templates[i].zoomRange[0] && zoom < templates[i].zoomRange[1]) {
            updateCardData(cy, templates[i].template, query);

            curZoomRange = templates[i].zoomRange;

            if (altColorSet) {
              cy.batch(() => {
                cy.$(query).removeClass('htmlNodeAltStyle');
                cy.$(query).addClass('htmlNodeBaseStyle');
              });
              altColorSet = false;

              showHtmlLabels(cy, query);

              if (templates[i].htmlSet != true) {
                intializeCardHtml(cy, templates, query);
                templates[i].htmlSet = true;
              }
            }
            htmlRemoved = false;
            break;
          }
        }
      }
    });
    cy.emit('zoom');
  }

  function createHtmlNode(cytoscape, cy, templates) {
    try {
      if (!cy.__proto__.nodeHtmlLabel) {
        var nodeHtmlLabel = require('./cytoscape-node-html-label');
        nodeHtmlLabel(cytoscape);

        for (let key in templates) {
          setTemplate(cy, templates[key].template, templates[key].query);
        }
      }
    } catch {
      console.warn('cytoscape.js-html-node: multiple instances attempted to be called');
    }
  }

  //console.log('cytoscape.js-html-node - loaded');

  return {
    createHtmlNode: createHtmlNode,
  };
}
