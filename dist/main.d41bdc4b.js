// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $lastItem = $("li:last");
var $siteList = $(".siteList");
var nodes = JSON.parse(localStorage.getItem("_nodes_")) || [{
  url: "https://www.acfun.cn",
  urlPart: "acfun.cn",
  logo: "./imgs/acfun-logo.png",
  logoType: "image"
}, {
  url: "https://www.bilibili.com",
  urlPart: "bilibili.com",
  logo: "./imgs/bili-logo.png",
  logoType: "image"
}];

var getLogo = function getLogo(node) {
  if (node.logoType === "text") {
    return node.logo;
  } else {
    return "<img src='".concat(node.logo, "' alt=").concat(node.urlPart.split(".")[0], "'.png' />");
  }
};

var render = function render() {
  $siteList.find("li:not(:last)").remove();
  nodes.forEach(function (node, index) {
    $lastItem.before($("<li>\n            <div class=\"site\" data-url=\"".concat(node.url, "\" data-index=\"").concat(index, "\">\n                <div class=\"logo\">\n                ").concat(getLogo(node), "\n                </div>\n                <div class=\"link\">").concat(node.urlPart, "</div>\n                <svg class=\"icon icon-close\">\n                  <use xlink:href=\"#icon-close\"></use>\n                </svg>\n            </div>\n        </li>")));
  });
};

var judgeIsDelete = function judgeIsDelete(elem) {
  if (elem.nodeName.toLowerCase() === "svg" && elem.classList.contains("icon-close")) {
    nodes.splice(elem.parentNode.dataset.index, 1);
    return true;
  }

  return false;
};

$siteList.click(function (e) {
  var target = e.target;

  if (judgeIsDelete(target) || judgeIsDelete(target.parentNode)) {
    render();
  } else {
    while (target.nodeName.toLowerCase() !== "li") {
      target = target.parentNode;
    }

    var container = target.children[0];

    if (container.dataset.index !== undefined) {
      window.open(container.dataset.url, "_self");
    }
  }
});
render();
$lastItem.click(function (e) {
  var url = window.prompt("请输入您要添加的网址", "格式：https://www.baidu.com");
  var reg = /^https?:\/\/(?:w{3}\.)?([a-zA-Z0-9]+)(\.[a-z]+)?[\s\S]*$/;
  var res = url.match(reg); // console.log(res);

  if (res) {
    nodes.push({
      url: res[0],
      urlPart: res[1] + res[2],
      logo: res[1][0].toUpperCase(),
      logoType: "text"
    });
    render();
  } else {
    alert("您输入的格式不正确");
  }
});

window.onbeforeunload = function (e) {
  // location.reload(true);
  var s = JSON.stringify(nodes);
  localStorage.setItem("_nodes_", s);
}; // 鼠标监听事件;


$(document).on("keypress", function (e) {
  // console.log(e.key);
  //获取键盘对象的键值，小写
  $.each(nodes, function (index, value) {
    if (value.logo.length === 1 && value.logo.toLowerCase() === e.key) {
      window.open(value.url, "_blank");
      return false;
    }
  });
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.d41bdc4b.js.map