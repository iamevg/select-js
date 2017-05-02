let list = document.body.querySelector(`ul`);
let lastSelected;

list.addEventListener(`mousedown`, event => {
  event.preventDefault();
}, false);

let toggleSelect = target => target.classList.toggle(`selected`);

let deselectAll = () => {
  Array.prototype.forEach.call(list.children, (item, i) => {
    list.children[i].classList.remove('selected');
  });
}

let selectSingle = target => {
  deselectAll();

  target.classList.add('selected');
}

let selectFromLast = target => {
  let startChild = lastSelected || list.children[0];
  let elem;

  let isLastClickedBefore = startChild.compareDocumentPosition(target) & 4;

  if (isLastClickedBefore) {
    for (elem = startChild; elem != target; elem = elem.nextElementSibling) {
      elem.classList.add(`selected`);
    }
  } else {
    for (elem = startChild; elem != target; elem = elem.previousElementSibling) {
      elem.classList.add(`selected`);
    }
  }

  elem.classList.add(`selected`);
}

list.addEventListener(`click`, event => {
  let target = event.target;

  if (event.target.nodeName === `LI`) {
    if (event.ctrlKey || event.metaKey) {
      toggleSelect(target);
    } else if (event.shiftKey) {
      selectFromLast(target);
    } else {
      selectSingle(target);
    }

    lastSelected = target;
  }
}, false);