const authHost = "https://wedev-api.sky.pro/api/user"

export let token = ""

export const setToken = (newToken) => {
  token = newToken
}

export let name = ''
export const setName = (newName) => {
  name = newName
}

export const fetchComments = () => {
   return fetch ('https://wedev-api.sky.pro/api/v2/:Julia-Iv')
    //return fetch('https://wedev-api.sky.pro/api/v1/Julia-Iv/comments')

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

        return fetch('https://wedev-api.sky.pro/api/v2/:Julia-Iv', 
             {
                method: "POST",
                headears: {
                  Authorization: `Bearer ${token}`,
                },
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
export const login = (login, password) => {
  return fetch(authHost + '/login', {
         method: 'POST',
         body: JSON.stringify({ 
          login: login,
          password: password
         })
  }) 
}

export const registration = (name, login, password) => {
  return fetch(authHost, {
    method: 'POST',
         body: JSON.stringify({ 
          name: name,
          login: login,
          password: password
         })
  })
}
