import { sanitizeHtml } from "./sanitizeHtml.js";
import { addCommentToState, updateComments } from "./comments.js";
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
document.querySelector('.form-loading').style.display = 'block'
document.querySelector('.add-form').style.display = 'none'

    addCommentToState({
      id: Date.now(),
      name: sanitizeHtml(nameValue),
      text: sanitizeHtml(textValue),
      likesCount: 0,
      isLiked: false,
      data: getCurrentDateTime()

    });

  fetch('https://wedev-api.sky.pro/api/v1/Julia-Iv/comments', {
    method: "POST",
    body: JSON.stringify({
      name: addName.value,
      text: addText.value,
    }),
  })
 .then ((response) => {
if (response.status === 400) {
  throw new Error ( "Имя должно содержать хотя бы 3 символа" )
}
return response.json();
 })
 .then (() => {
  return fetch('https://wedev-api.sky.pro/api/v1/Julia-Iv/comments');
 })
 .then((response) => response.json())
 .then((responseData) => {
  document.querySelector('.form-loading').style.display = 'none'
document.querySelector('.add-form').style.display = 'flex'

  const appComments = responseData.comments.map((comment) => {
    return {
              id: comment.id,
              likesCount: comment.likes,
              isLiked: comment.isLiked,
              name: comment.author.name,
              text: comment.text,
              data: new Date(comment.date).toLocaleString() 
          };
        });
      updateComments(appComments);
      renderComments();
  
    addName.value = '';
    addText.value = '';

    //renderComments();
      })
 .catch((error) => {
        alert(error.message || "Упал интернет, попробуйте позже");
      })
      .finally(() => {
        // Возвращаем кнопку в исходное состояние при любом исходе
        buttonForm.disabled = false;
        buttonForm.textContent = "Написать";
      });
  });
}

