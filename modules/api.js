export const fetchComments = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/Julia-Iv/comments')

    .then((response) => {
      if(!response.ok) throw new Error ("Ошибка сервера"); 
      return  response.json();
})
    .then((responseData) => {
          return responseData.comments.map ((comment) => ({
              id: comment.id,
              likesCount: comment.likes,
              isLiked: comment.isLiked,
              name: comment.author.name,
              text: comment.text,
              data: new Date(comment.date).toLocaleString() 
            }));
        });
};
          
 
export const fetchCommentsPost = (name,text) => {

        return fetch('https://wedev-api.sky.pro/api/v1/Julia-Iv/comments', 
             {
                method: "POST",
                body: JSON.stringify({ name, text,}),
                  
              })
             .then ((response) => {
            if (response.status === 500) {
                throw new Error ('Ошибка сервера')
            }
            if (response.status === 400) {
              throw new Error ( 'Неверный запрос' )
            }
            //if(!response.оk) {
              //  throw new Error ('Неизвестная ошибка сервера');
            //}

            return response.json();
             
            });
        }