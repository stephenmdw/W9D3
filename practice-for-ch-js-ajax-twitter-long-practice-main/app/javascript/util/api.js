const csrfToken = document.querySelector("meta[name=csrf-token]").content;

async function customFetch(url, options = {}) {
  options.headers = {
    // Your code here
    'X-CSRF-Token': csrfToken,
    "Accept": "application/json",
    "Content-Type": "application/json",
    ...options.headers
  };

  
  // let response = 
  await fetch(url, options)
    .then(response => {
      if (response.ok){
        console.log(response)
        return response.json();
      } else {
        throw response;
      }})
      .then(response => console.log(response))
      .catch(error => console.error(error.statusText))
    // return response.json()

}

export function followUser(id){
  return customFetch( `/users/${id}/follow` , { method: "POST" })
    .then(response => { console.log(response) })
}

export function unfollowUser(id){
  return customFetch( `/users/${id}/follow` , { method: "DELETE" })
    .then(response => { console.log(response) })
}

