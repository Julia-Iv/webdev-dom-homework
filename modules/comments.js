
export let comments = [
  /*
  { id: 1,
    name: "Глеб Фокин",
    text: "Это будет первый комментарий на этой странице",
    likesCount: 3,
    isLiked: true,
    data: new Date().toLocaleString()
   },
  { id: 2,
    name: " Варвара Н.",
    text: "Мне нравится как оформлена эта страница",
    likesCount: 75,
    isLiked: true,
    data: new Date().toLocaleString()
   }*/
];

export const addCommentToState = (newComment) => {
  comments.push(newComment);
};

export const updateComments = (newComments) => {
 comments = newComments;
  //comments.length = 0;
  //comments.push(...newComments);
}