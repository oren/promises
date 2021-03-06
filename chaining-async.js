// 2. run functions in sequence
// using Promise.then

function login(result) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve('logged in.');
    }, 2000);
  })
}

function getContacts(result) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(result + ' get contacts.');
    }, 1000);
  })
}

function someSync(result) {
  return result + ' do something sync.';
}

function someAsync(result) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(result + ' some async.');
    }, 500);
  })
}

function getAttachments(result) {
  console.log(result + ' get attachments');
}

login().then(getContacts).then(someSync).then(someAsync).then(getAttachments);

// => logged in. get contacts. do something sync. some async. get attachments

// There are 2 types of functions that can be used: 
// 1. simple function that accepts and returns a single value.  
// 2. function that accepts a single value and returns a promise.
