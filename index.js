import { initAddCommentForm } from "./modules/addCommentForm.js";
import { initToggleLikeListener, renderComments} from "./modules/renderComments.js"
import { fetchComments } from "./modules/api.js";
import { updateComments } from "./modules/comments.js";

export const getAndRenderComments = () => {
const commentsElement = document.getElementById('comments');
if (commentsElement) {
commentsElement.innerHTML = 
'<li>Пожалуйста подождите, идёт загрузка комментария</li>';
}

fetchComments() 
.then((appComments) => {
  updateComments(appComments);
  renderComments();
  initToggleLikeListener();
  initAddCommentForm();
})
.catch((error) => {
  console.log("Ошибка при обновлении комментариев:", error);
});
};
getAndRenderComments();
