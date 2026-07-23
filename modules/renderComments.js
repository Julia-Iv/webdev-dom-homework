
import { comments } from "./comments.js";
import { renderLogin } from ".renderLogin.js"
import { token } from "./api.js"

export  function renderComments()  {
      //const addCommentsContainer = document.getElementById('comments');
      const container = document.querySelector('.container')

      //if(!addCommentsContainer) return;
      
      const commentsHtml = comments.map((comment, index) => { 
        return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.data}</div>
          </div>

        <p class="comment-text">${comment.text}</p>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likesCount}</span>
            <button class="like-button ${comment.isLiked ? '-active-like' : ''}"
            data-id = "${comment.id}">
           </button>
          </div>
        </div>
      </li>
    `;
      })
      .join('');

      const addCommentsHtml = `
      <div class="add-form">
        <input
          type="text" id="add-form-name"
          class="add-form-name"
          placeholder="Введите ваше имя"
          readonly
          value="${name}"
          id="name-input"

        />
        <textarea
          type="textarea" id="add-form-text"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
          id="text-input"
        ></textarea>
        <div class="add-form-row">
          <button id="add-form-button" class="add-form-button">Написать</button>
        </div>
      </div>
      <div class = "form-loading" style = "display: none; margin-top: 20px;">
        Комментарий добавляется
      </div>`

      const linkToLoginText = `<p>чтобы отправить комментарий, <span
      class="link-login">войдите</span></p>`

      const baseHtml = `<ul class="comments">${commentsHtml}</ul>
      ${token ? addCommentsHtml : linkToLoginText}
}`
    
      container.innerHTML = baseHtml

      if (token) {
      initToggleLikeListener()
      initAnswerListeners()
    } else {
     document.querySelector('.linl-login').addEventListener('click',
      () => {
        renderLogin()
      }
     )
       }
    }
function initAnswerListeners() {
      const commentsElement = document.querySelectorAll(".comment");
      const addTextForm = document.getElementById("add-form-text");

      if(!addTextForm) return;

      for (const commentElement of commentsElement)
      {
        commentElement.addEventListener("click", (event) => {
          if (event.target.closest(".like-button")) return;
          
          const index = commentElement.dataset.index;
          const currentComment = comments[index];

          if (currentComment) {
          addTextForm.value = `${currentComment.name}: ${currentComment.text}`;
          addTextForm.focus();
        }
        });
      };
     }
    

    export function initToggleLikeListener() {
     const addCommentsContainer = document.getElementById('comments');
     if(!addCommentsContainer) return;

    addCommentsContainer.addEventListener("click", (event) => {
    //event.stopPropagation();
      // Метод closest находит ближайшую кнопку лайка, даже если кликнули на иконку или цифру внутри неё
      const button = event.target.closest(".like-button");
       
      // Если клик был мимо кнопки лайка — игнорируем его
      if (!button) return;
     // if (event.target.closest(".like-button")) return;
     

      // Извлекаем ID комментария из дата-атрибута кнопки
          const commentId = button.getAttribute("data-id");

      // Находим нужный элемент в массиве данных
          const targetComment = comments.find(c => String(c.id) === String(commentId));

      if (targetComment) {
        // Меняем значения ключей в массиве 
        if (targetComment.isLiked) {
          targetComment.isLiked = false;
          targetComment.likesCount--;
        } else {
          targetComment.isLiked = true;
          targetComment.likesCount++;
        }
      
        // Заново выполняем рендер всех комментариев на основе обновленного массива
        renderComments();
      }
    });
  }