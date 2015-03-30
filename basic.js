// 1. basic example of promises

var login = new Promise(loginPromise);

function loginPromise(resolve, reject) {
  // do stuff. probably async
  resolve('logged in successful');
}

function success(result) {
  console.log(result); // "Stuff worked!"
}

function error(err) {
  console.log(err); // Error: "It broke"
}

login.then(success, error);
