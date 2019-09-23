"use strict";

function make_data(titles) {
  let ul = document.createElement("ul");
  let current_nest =  Number(titles[0].tagName[1]);
  let i = 0;
  while (i<titles.length) {
    let title = titles[i];
    let nest = Number(title.tagName[1])
    if (current_nest === nest) {
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.textContent = title.textContent;
      a.href = "#" + title.textContent;
      li.appendChild(a);
      ul.appendChild(li);
    } else if(current_nest < nest) {
      // 再帰呼び出しでul > ulの作成
      let subul = make_data(titles.slice(i, -1));
      ul.appendChild(subul);
      i += subul.querySelectorAll("li").length - 1;
    } 
    i+=1;
  }
  return ul;
}

function add_index(){
  // bodyの上から順にh2, h3タグの要素をとってくる．h1はタイトルなので除外
  let titles = document.querySelectorAll("h2, h3");
  // それぞれのタイトル要素にidつける
  titles.forEach(title => {
    title.id = title.textContent;
  });
  // 目次の要素index_boxを追加
  let index_box = document.createElement("div");
  index_box.id = "index";
  // タイトルの下に目次の要素index_boxを追加
  document.body.insertBefore(index_box, document.querySelector("h1").nextSibling);

  let data = make_data([...titles]);
  let box_head = document.createElement("div");
  box_head.textContent = "目次";
  index_box.appendChild(box_head);
  index_box.appendChild(data);
}


window.onload = function() {
  add_index();
}