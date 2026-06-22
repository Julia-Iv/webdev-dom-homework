
import {comments} from "./comments.js";
import {eventListeners} from "./eventListeners.js";
import {toggleLike} from "./toggleLike.js";
import {inputListeners} from "./inputListeners.js";

export  const renderComments = () => {
      
      const container = document.getElementById("comments");
     
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

             Кнопка лайка вызывает глобальную функцию по индексу 
            <button class="like-button ${comment.isLiked ? '-active-like' : ''}"
            data-id = "${comment.id}">
           </button>
          </div>
        </div>
      </li>
    `;
      })
      .join('');

      container.innerHTML = commentsHtml;
      eventListeners();

      const commentsElement = container.querySelectorAll(".comment");
      const addText = container.querySelectorAll("add-form-text");

      for (const commentElement of commentsElement)
      {
        commentElement.addEventListener("click", (event) => {
          if (event.target.closest(".like-button")) return;
          const currentComment = comments[commentElement.dataset.index];
          addText.value = `${currentComment.name}: ${currentComment.text}`;
        })
      };
     }
