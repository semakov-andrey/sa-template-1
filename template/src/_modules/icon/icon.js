'use strict';

export default class Icon {
  constructor() {
    let icons = document.getElementById('hidden-svg');
    if (icons) {
      let url = icons.dataset.path,
        ajax = new XMLHttpRequest();
      ajax.open('GET', url, true);
      ajax.send();
      ajax.onload = e => icons.innerHTML = ajax.responseText;
    }
  }
}