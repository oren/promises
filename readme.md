## Refactor Example

### Setup

Install docker and docker-compose

    docker-compose build
    docker-compose run web

### Misc

    1.  
    about each 10 lines should be a funcion

    2. 
        if(req.query.return || healthProfile.serp__Status__c=="Need to be Screened" || healthProfile.serp__Status__c=="Ready to be Scheduled" || healthProfile.serp__Status__c=="Screened" ) {

    should be

        var donor = isDonor(healthProfile);

        if (req.query.return || donor) {

        }

        function isDonor(healthProfile) {
          var foobar = healthProfile.serp__Status__c=="Need to be Screened" || healthProfile.serp__Status__c=="Ready to be Scheduled" || healthProfile.serp__Status__c=="Screened";
          return foobar;
        }
