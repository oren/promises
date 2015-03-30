// 2. chaining promises. everything is sync

var login = new Promise(loginPromise);

function loginPromise(resolve, reject) {
  // do stuff. probably async
  resolve('logged in.');
}

// function that takes a single argument and returns a value
function getContacts(result) {
  return result + ' get contacts.';
}

// function that takes a single argument
function getAttachments(result) {
  console.log(result + ' get attachments');
}

login.then(getContacts).then(getAttachments);

// login function is called
// getContacts('logged in') is called
// getAttachments('loggedin. get contacts') is called

// => logged in. get contacts. get attachments
