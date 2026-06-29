import { initAddCommentForm } from "./modules/addCommentForm.js";
import { updateComments } from "./modules/comments.js";
import { renderComments, initToggleLikeListener } from "./modules/renderComments.js"

initAddCommentForm();
initToggleLikeListener();
//renderComments();


fetch('https://wedev-api.sky.pro/api/v1/Julia-Iv/comments')
.then((response) => {
    return response.json()
})
.then((data) => {
  updateComments(data.comments);
  renderComments();
})
