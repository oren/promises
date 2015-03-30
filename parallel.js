// 2. ran functions in parallel

function login(result) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve('logged in.');
    }, 1000);
  })
}

function getContacts(result) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve('get contacts.');
    }, 1000);
  })
}

function someSync(result) {
  return 'do something sync.';
}

function someAsync(result) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve('some async.');
    }, 1000);
  })
}

function getAttachments(result) {
  return 'get attachments';
}

Promise.all([login(), getContacts(), someSync(), someAsync(), getAttachments()])
  .then(function(values) {
    console.log(values); // [true, 3]
  });

// => ['logged in.', 'get contacts.', 'do something sync.', 'some async.', 'get attachments']
