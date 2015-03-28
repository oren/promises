// login().then(getContacts).then(getAttachments);

// 1) login
// 2) get contacts from SalseForce
// 3) get their attachments (id/dx)
function getDonors(req, res, next) {
  console.log('start');
  login(); // 1

  function login(cb) {
    conn.login(user, password, function(err) {
      if (err) { log.write({error:err,message:err},null,500); return console.error(err); }

      getContacts(); // 2
    });
  }

  function getContacts() {
    var condition = donorId ? "AND Id = '"+donorId+"'" : "AND FirstName LIKE '%"+search+"%'";
    var contactQuery = "SELECT Id,Email,FirstName,LastName,MailingStreet,MailingCity,MailingState,MailingPostalCode,Phone,ICF_version_on_file__c,(SELECT Id,CampaignId,CreatedDate FROM Contact.CampaignMembers),(SELECT Name, CreatedDate,serp__Status__c,serp__Opportunity__c.Age__c,serp__Opportunity__c.Id FROM Contact.Opportunities__r),(SELECT Id,Appointment_Date_Time__c,Assigned_Patient_Advocate__c,Status__c FROM Contact.Collections__r ) FROM Contact WHERE MailingStreet != null "+condition;

    conn.query(contactQuery, function (err, result) {
      if (err) { log.write({error:err,message:err},null,500); return console.error(err); }

      donors = getOnlyDonors(results);
      donors = convertStuff(donors);

      getAttachments(donors); // 3
    });
  }

  function getAttachments() {
    if(req.params.sfId) {
      res.locals['healthProfiles'] = donors;
      next();
    }

    var attachmentsQuery = "SELECT Id,(SELECT Id,Name FROM Attachments WHERE Name IN ('identification.jpg','Proof_of_diagnosis.jpg')) FROM serp__Opportunity__c WHERE Id IN ("+ids+")";

    conn.query(attachmentsQuery, function(err, result) {
      if (!result) {
        req.donor = donors;
        next();
      }

      donors = convert(donors);
    })
  }

  function convert(donors) {
    if (true) {
      // convert
    }

    if (true) {
      // convert
      // convert
      // sort
    }

    return donors;
  }
}
