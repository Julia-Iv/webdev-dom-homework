import { initAddCommentForm } from "./modules/addCommentForm.js";
import { updateComments } from "./modules/comments.js";
import { renderComments, initToggleLikeListener } from "./modules/renderComments.js"

document.querySelector('.comments').innerHTML = 
'Пожалуйста подождите, идёт загрузка комментария'

initAddCommentForm();
initToggleLikeListener();
//renderComments();


fetch('https://wedev-api.sky.pro/api/v1/Julia-Iv/comments')
.then((response) => response.json())
.then((responseData) => {
      return responseData.comments.map ((comment) => {
        return {
          id: comment.id,
          likesCount: comment.likes,
          isLiked: comment.isLiked,
          name: comment.author.name,
          text: comment.text,
          data: new Date(comment.date).toLocaleString() 
        }
      })
    })
.then ((appComments) => {
  updateComments(appComments);
  renderComments();
  //initToggleLikeListener();
});
