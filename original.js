exports.getDonorsViaHealthProfiles = function (req, res,next) {
  var limit = req.query.l; 
  var search = req.query.search; 
  var donorId = req.query.sfId || req.params.sfId;

  if (req.user && !donorId) {
      donorId = req.user.sfId;
  }

  if(limit==undefined){
    limit=0;
  }

  conn.login(user, password, function(err) {
    if (err) { log.write({error:err,message:err},null,500); return console.error(err); }

    var condition = donorId ? "AND Id = '"+donorId+"'" : "AND FirstName LIKE '%"+search+"%'";
    var contactQuery = "SELECT Id,Email,FirstName,LastName,MailingStreet,MailingCity,MailingState,MailingPostalCode,Phone,ICF_version_on_file__c,(SELECT Id,CampaignId,CreatedDate FROM Contact.CampaignMembers),(SELECT Name, CreatedDate,serp__Status__c,serp__Opportunity__c.Age__c,serp__Opportunity__c.Id FROM Contact.Opportunities__r),(SELECT Id,Appointment_Date_Time__c,Assigned_Patient_Advocate__c,Status__c FROM Contact.Collections__r ) FROM Contact WHERE MailingStreet != null "+condition;

    conn.query(contactQuery, function (err, result) {
      if (err) { log.write({error:err,message:err},null,500); return console.error(err); }

      var donors = result.records.filter(function (donor, i) {
        if(donor.Opportunities__r!=null) {
          var r = donor.Opportunities__r.records.filter(function(healthProfile) {
            if(req.query.return || healthProfile.serp__Status__c=="Need to be Screened" || healthProfile.serp__Status__c=="Ready to be Scheduled" || healthProfile.serp__Status__c=="Screened" ) {
              return healthProfile;
            }
          });

          donor.Opportunities__r.records=r;

          if(r.length>0) {
            return donor; 
          }
        }
      }); //filter

      var ids = donors.map(function(donor)  {
        if(donor.Opportunities__r) {
          return donor.Opportunities__r.records.map(function(hp) {
            return hp.Id; 
          })
        } else {
          return [];
        }       
      }).join().split(",").map(function(id){return "'"+id+"'";}).join()//.join().split("'").map(function(id){return "'"+id+"'";});  

      if(!req.params.sfId) {
        var attachmentsQuery = "SELECT Id,(SELECT Id,Name FROM Attachments WHERE Name IN ('identification.jpg','Proof_of_diagnosis.jpg')) FROM serp__Opportunity__c WHERE Id IN ("+ids+")";

        conn.query(attachmentsQuery, function(err, result) {
          if(result) {
            donors = donors.map(function (donor) {
              if (donor.Collections__r && donor.Collections__r.records.length>0) {
                  donor.appointmentTime = donor.Collections__r.records.map(function (appt) {
                      return { time: (new Date(appt.Appointment_Date_Time__c)).getTime(), utcString: appt.Appointment_Date_Time__c }
                  }).sort(function (appta, apptb) {
                      return parseFloat(appta.time) - parseFloat(apptb.time);
                  })[0].utcString;
              } else {
                  donor.appointmentTime = null;
              }

              if (donor.Opportunities__r) {
                donor.Opportunities__r.records = donor.Opportunities__r.records.map(function(hp) {
                  hp.attachments = result.records.filter(function(attachment){
                    return attachment.Id == hp.Id; 
                  })[0].Attachments;                
                  return hp; 
                })

                donor.Opportunities__r.records.map(function(hp) {
                  if(hp.hasOwnProperty('attachments') && hp.attachments!=null){
                    hp.hasUploadedDx = hp.attachments.records.some(function(attachment){
                                                            return attachment.Name == 'Proof_of_diagnosis.jpg';
                                                           });
                    hp.hasUploadedId = hp.attachments.records.some(function(attachment){
                                                            return attachment.Name == 'identification.jpg';
                    });
                  }else{
                    hp.hasUploadedDx = hp.hasUploadedId = false; 
                  }
                  hp.time = (new Date(hp.CreatedDate)).getTime(); 
                  return hp;
                });

                var recent = donor.Opportunities__r.records.sort(function(hpa,hpb){ 
                  return parseFloat(hpb.time) - parseFloat(hpa.time);
                })[0];

                donor.hasUploadedDx = recent.hasUploadedDx;
                donor.hasUploadedId = recent.hasUploadedId;
                donor.hpVerified = recent.serp__Status__c != "Need to be Screened";
                donor.donated = recent.serp__Status__c == "Donated Blood";
                donor.hpId = recent.Id;
              } else {
                donor.hasUploadedDx = donor.hasUploadedId = false; 
              }

              return donor;
              //req.donor = donor;
              //next();
            }) // donors.map
          } // if (results)

          req.donor = donors;
          next();
          //res.send(donors,200);
        }); 
          
      } else {
        res.locals['healthProfiles'] = donors;
        next();
      }
    }); // query
  }); // login
};
