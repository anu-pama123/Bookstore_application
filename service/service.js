const baseurl = "https://new-bookstore-backend.herokuapp.com";

// ----------------post method------------------

function postService(urlPostfix, data, headerconfig) {   

  console.log(urlPostfix,data, headerconfig);
  return new Promise (function(resolve, reject) {
    var resolved = axios.post(baseurl+urlPostfix, data, headerconfig);
    resolve(resolved);
  })

}

// ------------------get method-------------------

function getService(urlPostfix, headerconfig) {   

  console.log(urlPostfix, headerconfig);
  return new Promise (function(resolve, reject) {
    var resolved = axios.get(baseurl+urlPostfix, headerconfig);
    resolve(resolved);
  })

}

// -------------------put method------------------

function putService(urlPostfix, data, headerconfig) {   

  console.log(urlPostfix, data, headerconfig);
  return new Promise (function(resolve, reject) {
    var resolved = axios.put(baseurl+urlPostfix, data, headerconfig);
    resolve(resolved);
  })

}