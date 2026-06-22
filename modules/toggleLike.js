import { comments } from "./comments.js";
import { eventListeners } from "./eventListeners.js";
import { inputListeners } from "./inputListeners.js";
import { renderComments } from "./renderComments.js";

export  const toggleLike = () => {
    const container = document.getElementById("comments")
    if (!container) return;
    container.onclick = null;
  
  container.addEventListener("click", (event) => {
    event.stopPropagation();
      // Метод closest находит ближайшую кнопку лайка, даже если кликнули на иконку или цифру внутри неё
      const button = event.target.closest(".like-button");
       
      // Если клик был мимо кнопки лайка — игнорируем его
      if (!button) return;
     // if (event.target.closest(".like-button")) return;
     event.stopPropagation();

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
toggleLike()