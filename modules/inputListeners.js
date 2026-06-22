import { sanitizeHtml } from "./sanitizeHtml.js";
import { comments } from "./comments.js";
import { renderComments } from "./renderComments.js";

export const inputListeners = () => {
    const addName = document.getElementById("add-form-name");
    const addText = document.getElementById("add-form-text");

    const buttonForm = document.getElementById('add-form-button');
    //const addComments = document.getElementById('comments');
    if (!addName || !addText || !buttonForm) return;

    addName.addEventListener('input', (event) =>  {
      console.log('Изменить имя:', event.target.value );
    });
    addText.addEventListener('input', (event) =>  {
      console.log('Изменить комментарии:', event.target.value );
    });
   buttonForm.onclick = null;

    buttonForm.addEventListener('click', () => {
      const nameValue = addName.value.trim();
      const textValue = addText.value.trim();
      if (nameValue === '' || textValue === '') {
        alert(' Пожалуйста, заполните поля!');
        return;
      }
      console.log("click");

    //формирование даты и времени
    const now =new Date();
    const dateOptions = { day: '2-digit', month: '2-digit', year: '2-digit' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    const currentDate = now.toLocaleDateString('ru-RU', dateOptions);
    const currentTime = now.toLocaleTimeString('ru-RU', timeOptions);
    const currentDateTime = `${currentDate} ${currentTime}`;

    const addNewComment = {
    id: Date.now(),  
    name: sanitizeHtml(addName.value),
    text: sanitizeHtml(addText.value),
    likesCount: 0,      // Начальное количество лайков
    isLiked: false ,     // Изначально лайк не поставлен
    data: currentDateTime
  };
    comments.push(addNewComment);
    addName.value = '';
    addText.value = '';


  /*
  // Добавляем созданный объект в массив комментариев
  const addNewComment1 = comments.push(addNewComment);
    addName.value = '';
    addText.value = ''; */
    renderComments()
});
}