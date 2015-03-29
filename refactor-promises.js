// login.then(getContacts).then(getAttachments);

function getDonors(req, res, next) {
  var login = new Promise(loginPromise);

  function loginPromise(resolve, reject) {
    resolve(true);
  }

  var getContacts = new Promise(getContactsPromise);

  function getContactsPromise(resolve, reject) {
    resolve({contacts: [{name: 'josh'}, {name: 'lena'}]});
  }

  var getAttachments = new Promise(getAttachments);

  function getAttachments(resolve, reject) {
    results[0].attachments = [{id: 1}, {id: 42}];
    results[1].attachments = [{id: 3}, {id: 45}];
  }

  login.then(getContacts).then(getAttachments);
}

module.exports = getDonors;
