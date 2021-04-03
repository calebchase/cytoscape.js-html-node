export function loadHtmlNode() {
  function resizeCard(cy) {
    let div;
    let found = false;

    cy.batch(function () {
      cy.nodes().forEach(function (ele) {
        div = document.getElementById(`htmlLabel:${ele.id()}`);

        if (div != null) {
          found = true;
          let width = div.parentElement.offsetWidth;
          let height = div.parentElement.offsetHeight;

          cy.style()
            .selector('[id = "' + ele.id() + '  "]')
            .style('width', width)
            .style('height', height)
            .update();
        }
      });
    });
    return found;
  }

  window.onload = () => resizeCard(cy);

  // Sets starting html for labels based on cytoscape zoom level
  function intializeCardHtml(cy, templates, query) {
    let cyZoom = cy.zoom();

    for (let i = 0; i < templates.length; i++) {
      if (cyZoom >= templates[i].zoomRange[0] && cyZoom < templates[i].zoomRange[1]) {
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

  // Call to nodeHtmlLabel, displays html
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
      target.parentElement.parentElement.remove();
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

  let rcard = true;
  // Set html labels based on templates, sets cytoscape zoom to change html based on cytoscape zoom level
  function setTemplate(cy, templates, query, defaultColor, altColor) {
    let curZoomRange = intializeCardHtml(cy, templates, query);
    let minZoom = templates[0].zoomRange[0];
    let htmlRemoved = false;
    let altColorSet = false;

    cy.on('zoom', function (evt) {
      if (rcard) {
        resizeCard(cy);
        rcard = false;
      }

      if (cy.zoom() < minZoom && !htmlRemoved) {
        removeHtmlLabels(cy, query);
        htmlRemoved = true;
        curZoomRange = [0, templates[0].zoomRange[0]];
        cy.batch(() => {
          cy.$(query).addClass('altStyle');
          cy.$(query).removeClass('baseStyle');
          //cy.style().selector(query).style('background-color', altColor).update();
        });
        altColorSet = true;
      }

      if (cy.zoom() < curZoomRange[0] || cy.zoom() > curZoomRange[1]) {
        for (let i = 0; i < templates.length; i++) {
          if (cy.zoom() > templates[i].zoomRange[0] && cy.zoom() < templates[i].zoomRange[1]) {
            setCardData(cy, templates[i].template, query);
            curZoomRange = templates[i].zoomRange;

            if (!htmlRemoved) {
              removeHtmlLabels(cy, query);
            }

            if (altColorSet) {
              cy.batch(() => {
                cy.$(query).removeClass('altStyle');
                cy.$(query).addClass('baseStyle');
                //cy.style().selector(query).style('background-color', defaultColor).update();
              });

              altColorSet = false;
            }
            htmlRemoved = false;
            break;
          }
        }
      }
    });
  }

  function createHtmlNode(cy, templates) {
    for (let key in templates) {
      setTemplate(
        cy,
        templates[key].template,
        templates[key].query,
        templates[key].defaultColor,
        templates[key].altColor
      );
    }
    console.log('cytoscape.js-html-node: loaded');
  }
  return {
    createHtmlNode: createHtmlNode,
  };
}
