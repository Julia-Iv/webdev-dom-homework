import { sanitizeHtml } from "./modules/sanitizeHtml.js"
import { addCommentToState } from "./modules/comments.js"
import { renderComments, initToggleLikeListener } from "./modules/renderComments.js"

const addName = document.getElementById("add-form-name");
const addText = document.getElementById("add-form-text");
const buttonForm = document.getElementById('add-form-button');

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
  const now = new Date();
  const dateOptions = { day: '2-digit', month: '2-digit', year: '2-digit' };
  const timeOptions = { hour: '2-digit', minute: '2-digit' };
  const currentDate = now.toLocaleDateString('ru-RU', dateOptions);
  const currentTime = now.toLocaleTimeString('ru-RU', timeOptions);
  const currentDateTime = `${currentDate} ${currentTime}`;

  const addNewComment = {
    id: Date.now(),
    name: sanitizeHtml(nameValue),
    text: sanitizeHtml(textValue),
    likesCount: 0,
    isLiked: false,
    data: currentDateTime
  };

  addCommentToState(addNewComment);

  addName.value = '';
  addText.value = '';

renderComments();
});


initToggleLikeListener();
renderComments();


