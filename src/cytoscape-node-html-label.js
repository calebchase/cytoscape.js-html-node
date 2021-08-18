(function () {
  ('use strict');
  var $$find = function (arr, predicate) {
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var length = arr.length >>> 0;
    var thisArg = arguments[1];
    var value;
    for (var i = 0; i < length; i++) {
      value = arr[i];
      if (predicate.call(thisArg, value, i, arr)) {
        return value;
      }
    }
    return undefined;
  };
  var LabelElement = (function () {
    function LabelElement(_a, params, _cy) {
      var node = _a.node,
        _b = _a.position,
        position = _b === void 0 ? null : _b,
        _c = _a.data,
        data = _c === void 0 ? null : _c;
      this.updateParams(params);
      this._node = node;
      this.initStyles(params.cssClass);
      if (data) {
        this.updateData(data, _cy);
      }
      if (position) {
        this.updatePosition(position, params);
      }
    }
    LabelElement.prototype.updateParams = function (_a) {
      var _b = _a.tpl,
        tpl =
          _b === void 0
            ? function () {
                return '';
              }
            : _b,
        _c = _a.cssClass,
        cssClass = _c === void 0 ? null : _c,
        _d = _a.halign,
        halign = _d === void 0 ? 'center' : _d,
        _e = _a.valign,
        valign = _e === void 0 ? 'center' : _e,
        _f = _a.halignBox,
        halignBox = _f === void 0 ? 'center' : _f,
        _g = _a.valignBox,
        valignBox = _g === void 0 ? 'center' : _g;
      var _align = {
        top: -0.5,
        left: -0.5,
        center: 0,
        right: 0.5,
        bottom: 0.5,
      };
      this._align = [
        _align[halign],
        _align[valign],
        100 * (_align[halignBox] - 0.5),
        100 * (_align[valignBox] - 0.5),
      ];
      this.tpl = tpl;
    };

    LabelElement.prototype.updateData = function (data, _cy) {
      while (this._node.firstChild) {
        this._node.removeChild(this._node.firstChild);
      }
      var children = new DOMParser().parseFromString(this.tpl(data), 'text/html').body.children;
      for (var i = 0; i < children.length; ++i) {
        var el = children[i];

        this._node.appendChild(el);

        let cyNode = _cy.nodes(`#${el.id.split(':')[1]}`);
      }
    };
    LabelElement.prototype.getNode = function () {
      return this._node;
    };
    LabelElement.prototype.updatePosition = function (pos, params) {
      this._renderPosition(pos, params);
    };
    LabelElement.prototype.initStyles = function (cssClass) {
      var stl = this._node.style;
      stl.position = 'absolute';
      if (cssClass && cssClass.length) {
        this._node.classList.add(cssClass);
      }
    };
    LabelElement.prototype._renderPosition = function (position, params) {
      let staticZoomLevel = params.staticZoomLevel || params[0]?.staticZoomLevel || 1;

      var prev = this._position;
      var x = position.x * staticZoomLevel + this._align[0] * position.w;
      var y = position.y * staticZoomLevel + this._align[1] * position.h;
      if (!prev || prev[0] !== x || prev[1] !== y) {
        this._position = [x, y];
        var valRel = 'translate(' + this._align[2] + '%,' + this._align[3] + '%) ';
        var valAbs = 'translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px) ';
        var val = valRel + valAbs;
        var stl = this._node.style;
        stl.webkitTransform = val;
        stl.msTransform = val;
        stl.transform = val;
      }
    };
    return LabelElement;
  })();
  var LabelContainer = (function () {
    function LabelContainer(node) {
      this._node = node;
      this._elements = {};
    }
    LabelContainer.prototype.addOrUpdateElem = function (id, param, payload, _cy) {
      if (payload === void 0) {
        payload = {};
      }
      var cur = this._elements[id];
      if (cur) {
        cur.updateParams(param);
        cur.updateData(payload.data, _cy);
        cur.updatePosition(payload.position, param);
      } else {
        var nodeElem = document.createElement('div');

        var observer = new MutationObserver(function (mutations) {
          if (document.contains(nodeElem)) {
            let cyNode = _cy.nodes(`#${nodeElem.children[0].id.split(':')[1]}`);
            cyNode.data('htmlNode', nodeElem);
            try {
              cyNode.style({
                width: nodeElem.offsetWidth / (param.staticZoomLevel || 1),
                height: nodeElem.offsetHeight / (param.staticZoomLevel || 1),
              });
            } catch (err) {
              console.warn('cytoscape.js-html-node: unable to create html label', err);
            }
            observer.disconnect();
          }
        });

        observer.observe(document, {
          attributes: false,
          childList: true,
          characterData: false,
          subtree: true,
        });

        this._elements[id] = new LabelElement(
          {
            node: nodeElem,
            data: payload.data,
            position: payload.position,
          },
          param,
          _cy
        );
        this._node.appendChild(nodeElem);
      }
    };
    LabelContainer.prototype.removeElemById = function (id) {
      if (this._elements[id]) {
        this._node.removeChild(this._elements[id].getNode());
        delete this._elements[id];
      }
    };
    LabelContainer.prototype.updateElemPosition = function (id, position, params) {
      var ele = this._elements[id];
      if (ele) {
        ele.updatePosition(position, params);
      }
    };
    LabelContainer.prototype.updateZoom = function (_a, params) {
      let staticZoomLevel = params[0].staticZoomLevel;
      var pan = _a.pan,
        zoom = _a.zoom,
        cy = _a.cy;
      var val =
        'translate(' + pan.x + 'px,' + pan.y + 'px) scale(' + zoom / (staticZoomLevel || 1) + ')';
      var stl = this._node.style;

      let childrenHtml = this._node.children;

      for (const childHtml in childrenHtml) {
        let nodeId = childrenHtml[childHtml].firstChild?.id;
        let child = childrenHtml[childHtml].firstChild;

        if (
          nodeId != undefined &&
          child.parentElement.offsetHeight != 0 &&
          child.parentElement.offsetWidth != 0
        ) {
          let cyNodeId = nodeId.substring('htmlLabel:'.length);
          let cyNode = cy.nodes(`[id ='${cyNodeId}']`);
          let renderBox = cyNode.renderedBoundingBox();

          if (staticZoomLevel != undefined && zoom > staticZoomLevel) {
            this._node.classList.add('html-node-notransition');
            child.classList.add('html-node-notransition');
            child.parentElement.classList.add('html-node-notransition');

            cyNode.style('width', child.parentElement.offsetWidth / zoom);
            cyNode.style('height', child.parentElement.offsetHeight / zoom);
            child.parentElement.style.top = renderBox.y1;
            child.parentElement.style.left = renderBox.x1;
          } else {
            this._node.classList.remove('html-node-notransition');
            this._node.offsetHeight;
            child.classList.remove('html-node-notransition');
            child.offsetHeight;
            child.parentElement.classList.remove('html-node-notransition');
            child.parentElement.offsetHeight;

            cyNode.style('width', child.parentElement.offsetWidth / (staticZoomLevel || 1));
            cyNode.style('height', child.parentElement.offsetHeight / (staticZoomLevel || 1));
            child.parentElement.style.top = 0;
            child.parentElement.style.left = 0;

            stl.webkitTransform = val;
            stl.msTransform = val;
            stl.transform = val;
            stl.webkitTransformOrigin = origin;
            stl.msTransformOrigin = origin;
            stl.transformOrigin = origin;
          }
        }
      }
    };
    LabelContainer.prototype.setNode = false;
    LabelContainer.prototype.updatePan = function (_a, params) {
      var pan = _a.pan,
        zoom = _a.zoom;
      var val =
        'translate(' +
        pan.x +
        'px,' +
        pan.y +
        'px) scale(' +
        zoom / (params[0].staticZoomLevel || 1) +
        ')';
      var stl = this._node.style;
      var origin = 'top left';
      if (
        LabelContainer.prototype.setNode == false ||
        params[0].staticZoomLevel == undefined ||
        zoom < params[0].staticZoomLevel
      ) {
        LabelContainer.prototype.setNode = true;
        stl.webkitTransform = val;
        stl.msTransform = val;
        stl.transform = val;
        stl.webkitTransformOrigin = origin;
        stl.msTransformOrigin = origin;
        stl.transformOrigin = origin;
      }
    };
    return LabelContainer;
  })();
  function cyNodeHtmlLabel(_cy, params, options) {
    let originZoom = _cy.zoom();
    staticZoomLevel = params[0].staticZoomLevel || 1;

    var _params = !params || typeof params !== 'object' ? [] : params;
    var _lc = createLabelContainer();

    _cy.one('render', function (e) {
      createNodesCyHandler(e);
      wrapCyHandlerPan(e, params);
      wrapCyHandlerZoom(e, params);
    });
    _cy.on('add', addCyHandler);
    _cy.on('layoutstop', (ev) => {
      layoutstopHandler(ev, params);
    });
    _cy.on('remove', removeCyHandler);
    //_cy.on("data", updateDataOrStyleCyHandler);
    //_cy.on("style", updateDataOrStyleCyHandler);
    // _cy.on('pan', wrapCyHandlerPan);
    _cy.on('zoom pan drag render', (ev) => {
      wrapCyHandlerZoom(ev, params);
    });
    _cy.on('position bounds', (ev) => {
      moveCyHandler(ev, params);
    });
    // _cy.zoom(originZoom);
    return _cy;
    function createLabelContainer() {
      var _cyContainer = _cy.container();
      var _titlesContainer = document.createElement('div');
      var _cyCanvas = _cyContainer.querySelector('canvas');
      var cur = _cyContainer.querySelector("[class^='cy-node-html']");
      if (cur) {
        _cyCanvas.parentNode.removeChild(cur);
      }
      var stl = _titlesContainer.style;
      stl.position = 'absolute';
      stl['z-index'] = 10;
      stl.width = '500px';
      stl.margin = '0px';
      stl.padding = '0px';
      stl.border = '0px';
      stl.outline = '0px';
      stl.outline = '0px';
      if (options && options.enablePointerEvents !== true) {
        stl['pointer-events'] = 'none';
      }
      _cyCanvas.parentNode.appendChild(_titlesContainer);
      return new LabelContainer(_titlesContainer);
    }
    function createNodesCyHandler(_a) {
      var cy = _a.cy;
      _params.forEach(function (x) {
        cy.elements(x.query).forEach(function (d) {
          if (d.isNode()) {
            _lc.addOrUpdateElem(
              d.id(),
              x,
              {
                position: getNodePosition(d),
                data: d.data(),
              },
              _cy
            );
          }
        });
      });
    }
    function addCyHandler(ev) {
      var target = ev.target;
      var param = $$find(_params.slice().reverse(), function (x) {
        return target.is(x.query);
      });
      if (param) {
        _lc.addOrUpdateElem(
          target.id(),
          param,
          {
            position: getNodePosition(target),
            data: target.data(),
          },
          _cy
        );
      }
    }
    function layoutstopHandler(_a, params) {
      var cy = _a.cy;
      _params.forEach(function (x) {
        cy.elements(x.query).forEach(function (d) {
          if (d.isNode()) {
            _lc.updateElemPosition(d.id(), getNodePosition(d), params);
          }
        });
      });
    }
    function removeCyHandler(ev) {
      _lc.removeElemById(ev.target.id());
    }
    function moveCyHandler(ev, params) {
      _lc.updateElemPosition(ev.target.id(), getNodePosition(ev.target), params);
    }
    function wrapCyHandlerPan(_a, params) {
      var cy = _a.cy;
      _lc.updatePan(
        {
          pan: cy.pan(),
          zoom: cy.zoom(),
        },
        params
      );
    }
    function wrapCyHandlerZoom(_a) {
      var cy = _a.cy;
      _lc.updateZoom(
        {
          pan: cy.pan(),
          zoom: cy.zoom(),
          cy: cy,
        },
        params
      );
    }
    function getNodePosition(node) {
      return {
        w: node.width(),
        h: node.height(),
        x: node.position('x'),
        y: node.position('y'),
      };
    }
  }
  var register = function (cy) {
    if (!cy) {
      return;
    }
    cy('core', 'nodeHtmlLabel', function (optArr, options) {
      return cyNodeHtmlLabel(this, optArr, options);
    });
  };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = function (cy) {
      register(cy);
    };
  } else {
    if (typeof define !== 'undefined' && define.amd) {
      define('cytoscape-nodeHtmlLabel', function () {
        return register;
      });
    }
  }
  if (typeof cytoscape !== 'undefined') {
    register(cytoscape);
  }
})();

//# sourceMappingURL=cytoscape-node-html-label.js.map
