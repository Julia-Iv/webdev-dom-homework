import { initAddCommentForm } from "./modules/addCommentForm.js";
import { initToggleLikeListener, renderComments} from "./modules/renderComments.js"
import { fetchComments } from "./modules/api.js";
import { updateComments } from "./modules/comments.js";

//const commentsElement = document.querySelector('.comments');
//if (commentsElement) {
//commentsElement.innerHTML = 
//'Пожалуйста подождите, идёт загрузка комментария'
//}

fetchComments()
.then((appComments) => {
  updateComments(appComments);
  renderComments();
  initToggleLikeListener();
  initAddCommentForm();
});
