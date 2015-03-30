// 2. chaining promises. everything is async

var login = new Promise(loginPromise);

function loginPromise(resolve, reject) {
  // do stuff. probably async
  resolve('logged in.');
}

var getContacts = new Promise(getContactsPromise);

function getContactsPromise(resolve, reject) {
  setTimeout(function() {
    resolve(' get contacts.');
  }, 2000);
}

function getAttachments(result) {
  console.log(result + ' get attachments');
}

login.then(getContacts).then(getAttachments);
