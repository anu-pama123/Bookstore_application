const baseurl = "https://new-bookstore-backend.herokuapp.com";
// const headerconfig = {   
//   'Content-Type': 'application/json',
//   'authorization': localStorage.getItem('token')
// };

function postService(urlPostfix, data, headerconfig) {   

  console.log(urlPostfix,data, headerconfig);
  return new Promise (function(resolve, reject) {
    var resolved = axios.post(baseurl+urlPostfix, data, headerconfig);
    resolve(resolved);
  })

}

function getService(urlPostfix, headerconfig) {   

  console.log(urlPostfix, headerconfig);
  return new Promise (function(resolve, reject) {
    var resolved = axios.get(baseurl+urlPostfix, headerconfig);
    resolve(resolved);
  })

}