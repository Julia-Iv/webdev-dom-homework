import { sanitizeHtml } from "./sanitizeHtml.js";
import { addCommentToState } from "./comments.js";
import { renderComments } from "./renderComments.js";



const addName = document.getElementById("add-form-name");
const addText = document.getElementById("add-form-text");
const buttonForm = document.getElementById("add-form-button");



function getCurrentDateTime() {
  const now = new Date();
  const dateOpts = { day: '2-digit', month: '2-digit', year: '2-digit' };
  const timeOpts = { hour: '2-digit', minute: '2-digit' };
  const d = now.toLocaleDateString('ru-RU', dateOpts);
  const t = now.toLocaleTimeString('ru-RU', timeOpts);
  return `${d} ${t}`;

}



export function initAddCommentForm() {

  addName.addEventListener('input', (event) => {
    console.log('Изменить имя:', event.target.value);

  });

  addText.addEventListener('input', (event) => {
    console.log('Изменить комментарии:', event.target.value);

  });

  buttonForm.addEventListener('click', () => {
    const nameValue = addName.value.trim();
    const textValue = addText.value.trim();

    if (nameValue === '' || textValue === '') {
      alert('Пожалуйста, заполните поля!');
      return;

    }

    addCommentToState({
      id: Date.now(),
      name: sanitizeHtml(nameValue),
      text: sanitizeHtml(textValue),
      likesCount: 0,
      isLiked: false,
      data: getCurrentDateTime()

    });

    addName.value = '';
    addText.value = '';

    renderComments();

  });

}