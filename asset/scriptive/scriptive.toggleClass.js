var childs = e.parentElement.children;
for (var i = 0; i < childs.length - 0; i++){
  if (childs[i] == e) {
    e.classList.add(config.classActive);
  } else {
    childs[i].classList.remove(config.classActive);
  }
}