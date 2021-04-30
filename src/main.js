const $lastItem = $("li:last");
const $siteList = $(".siteList");

const nodes = JSON.parse(localStorage.getItem("_nodes_")) || [
  {
    url: "https://www.acfun.cn",
    urlPart: "acfun.cn",
    logo: "./imgs/acfun-logo.png",
    logoType: "image",
  },
  {
    url: "https://www.bilibili.com",
    urlPart: "bilibili.com",
    logo: "./imgs/bili-logo.png",
    logoType: "image",
  },
];

const getLogo = (node) => {
  if (node.logoType === "text") {
    return node.logo;
  } else {
    return `<img src='${node.logo}' alt=${node.urlPart.split(".")[0]}.png />`;
  }
};

const render = () => {
  $siteList.find("li:not(:last)").remove();
  nodes.forEach((node, index) => {
    $lastItem.before(
      $(
        `<li>
            <div class="site" data-url="${node.url}" data-index="${index}">
                <div class="logo">
                ${getLogo(node)}
                </div>
                <div class="link">${node.urlPart}</div>
                <svg class="icon icon-close">
                  <use xlink:href="#icon-close"></use>
                </svg>
            </div>
        </li>`
      )
    );
  });
};

const judgeIsDelete = (elem) => {
  if (
    elem.nodeName.toLowerCase() === "svg" &&
    elem.classList.contains("icon-close")
  ) {
    nodes.splice(elem.parentNode.dataset.index, 1);
    return true;
  }
  return false;
};
$siteList.click((e) => {
  let target = e.target;

  if (judgeIsDelete(target) || judgeIsDelete(target.parentNode)) {
    render();
  } else {
    while (target.nodeName.toLowerCase() !== "li") {
      target = target.parentNode;
    }

    const container = target.children[0];

    if (container.dataset.index !== undefined) {
      window.open(container.dataset.url, "_self");
    }
  }
});

render();

$lastItem.click((e) => {
  const url = window.prompt(
    "请输入您要添加的网址",
    "格式：https://www.baidu.com"
  );

  const reg = /^https?:\/\/(?:w{3}\.)?([a-zA-Z0-9]+)(\.[a-z]+)?[\s\S]*$/;
  const res = url.match(reg);

  // console.log(res);

  if (res) {
    nodes.push({
      url: res[0],
      urlPart: res[1] + res[2],
      logo: res[1][0].toUpperCase(),
      logoType: "text",
    });

    render();
  } else {
    alert("您输入的格式不正确");
  }
});

window.onbeforeunload = (e) => {
  // location.reload(true);
  const s = JSON.stringify(nodes);
  localStorage.setItem("_nodes_", s);
};

// 鼠标监听事件;
$(document).on("keypress", (e) => {
  // console.log(e.key);
  //获取键盘对象的键值，小写
  $.each(nodes, (index, value) => {
    if (value.logo.length === 1 && value.logo.toLowerCase() === e.key) {
      window.open(value.url, "_blank");
      return false;
    }
  });
});
