export const eventListeners = () => {
    const commentsElement = document.querySelectorAll(".comment");
      for (const commentElement of commentsElement)
      {
        commentElement.addEventListener("click", (event) => {
          if (event.target.closest(".like-button")) return;
          const currentComment = comments[commentElement.dataset.index];
          addText.value = `${currentComment.name}: ${currentComment.text}`;
        })
      };
      }