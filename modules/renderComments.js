
import {comments} from "./comments.js";
//import {eventListeners} from "./eventListeners.js";
//import {toggleLike} from "./toggleLike.js";
//import {inputListeners} from "./inputListeners.js";
const addCommentsContainer = document.getElementById('comments');
const addTextForm = document.getElementById("add-form-text");

export  function renderComments()  {
      
      //const container = document.getElementById("comments");
     
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

      addCommentsContainer.innerHTML = commentsHtml;
      initAnswerListeners();


function initAnswerListeners() {
      const commentsElement = document.querySelectorAll(".comment");
      //const addText = container.querySelectorAll("add-form-text");

      for (const commentElement of commentsElement)
      {
        commentElement.addEventListener("click", (event) => {
          if (event.target.closest(".like-button")) return;
          
          const currentComment = comments[commentElement.dataset.index];
          addTextForm.value = `${currentComment.name}: ${currentComment.text}`;
        });
      };
     }
    }

    export function initToggleLikeListener() {
    addCommentsContainer.addEventListener("click", (event) => {
    event.stopPropagation();
      // Метод closest находит ближайшую кнопку лайка, даже если кликнули на иконку или цифру внутри неё
      const button = event.target.closest(".like-button");
       
      // Если клик был мимо кнопки лайка — игнорируем его
      if (!button) return;
     // if (event.target.closest(".like-button")) return;
     

      // Извлекаем ID комментария из дата-атрибута кнопки
      const commentId = parseInt(button.getAttribute("data-id"), 10);
      
      // Находим нужный элемент в массиве данных
      const targetComment = comments.find(c => c.id === commentId);
      
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
    })
  }