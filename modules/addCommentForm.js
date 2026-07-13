
import { fetchComments, fetchCommentsPost } from "./api.js";
import { updateComments } from "./comments.js";
import { renderComments} from "./renderComments.js"
  
const sanitizeInput = (htmlString) => {
  return String(htmlString || '')

    .replace("&", "&amp;")
    .replace("<", "&lt;")
    .replace(">", "&gt;")
    .replace('"', "&quot;");
};


/*
function getCurrentDateTime() {
  const now = new Date();
  const dateOpts = { day: '2-digit', month: '2-digit', year: '2-digit' };
  const timeOpts = { hour: '2-digit', minute: '2-digit' };
  const d = now.toLocaleDateString('ru-RU', dateOpts);
  const t = now.toLocaleTimeString('ru-RU', timeOpts);
  return `${d} ${t}`;

}*/



export const initAddCommentForm = () => {
const addName = document.getElementById("add-form-name");
const addText = document.getElementById("add-form-text");
const buttonForm = document.getElementById("add-form-button");
const formLoading = document.querySelector('.form-loading');
const addForm = document.querySelector('.add-form');


  if (!addName || !addText || !buttonForm) return;

/*
  addName.addEventListener('input', (event) => {
    console.log('Изменить имя:', event.target.value);

  });

  addText.addEventListener('input', (event) => {
    console.log('Изменить комментарии:', event.target.value);

  });
*/
  buttonForm.addEventListener('click', () => {
    const nameValue = addName.value.trim();
    const textValue = addText.value.trim();

    if (nameValue === '' || textValue === '') {
      alert('Пожалуйста, заполните поля!');
      return;

    }

    const safeName = sanitizeInput(nameValue);
    const safeText = sanitizeInput(textValue);

    if (formLoading) formLoading.style.display = 'block';
    if (addForm) addForm.style.display = 'none';
    buttonForm.disabled = true;
    buttonForm.textContent = "Элемент добавляется...";

fetchCommentsPost(safeName, safeText)
      .then(() => {
        return fetchComments(); 
      })
      .then((appComments) => {
        updateComments(appComments);
        renderComments();

        addName.value = '';
        addText.value = '';
      })
      .catch((error) => {

        if (error.message === 'Failed to fetch') {
          alert ('Нет интернета, попробуйте снова')
        }
        else if (error.message === 'Ошибка сервера') {
          alert ('Ошибка сервера')
        }
        else if(error.message === 'Неверный запрос') {
          alert ('Имя и комментарии должны быть не короче 3х символов')
        } 
      })
      .finally(() => {
        // Возвращаем интерфейс в исходное состояние при любом исходе
        if (formLoading) formLoading.style.display = 'none';
        if (addForm) addForm.style.display = 'flex';
        buttonForm.disabled = false;
        buttonForm.textContent = "Написать";
      });
  });
};
/*
    addCommentToState({
      id: Date.now(),
      name: sanitizeHtml(nameValue),
      text: sanitizeHtml(textValue),
      likesCount: 0,
      isLiked: false,
      data: getCurrentDateTime()

    });*/
  

