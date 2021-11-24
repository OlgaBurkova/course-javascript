/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

let dragObject = {};

function onMouseDown(e) {
  if (e.which !== 1) return;

  const elem = e.target.closest('.draggable-div');
  if (!elem) return;

  dragObject.elem = elem;

  dragObject.downX = e.pageX;
  dragObject.downY = e.pageY;

  const coords = getCoords(dragObject.elem);
  dragObject.shiftX = dragObject.downX - coords.left;
  dragObject.shiftY = dragObject.downY - coords.top;

  elem.style.position = 'absolute';
  return false;
}

document.addEventListener('mousemove', (e) => {
  if (!dragObject.elem) {
    return;
  }

  dragObject.elem.style.left = e.pageX - dragObject.shiftX + 'px';
  dragObject.elem.style.top = e.pageY - dragObject.shiftY + 'px';

  return false;
});

function onMouseUp(e) {
  dragObject = {};
}

document.onmouseup = onMouseUp;
document.onmousedown = onMouseDown;

function getCoords(elem) {
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
  };
}

function createDiv() {
  const element = document.createElement('div');
  element.classList.add('draggable-div');
  element.draggable = true;
  element.style.width = Math.random() * 300 + 'px';
  element.style.height = Math.random() * 300 + 'px';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += parseInt(Math.random() * 16).toString(16);
  }
  element.style.backgroundColor = color;
  element.style.top = Math.random() * 300 + 'px';
  element.style.left = Math.random() * 300 + 'px';

  return element;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});

export { createDiv };
