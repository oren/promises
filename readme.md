## Refactor Example

### Setup

Install docker and docker-compose

    docker-compose build
    docker-compose run web
    docker-compose run --entrypoint node web basic.js

### Examples

* basic.js - simple promise
* chaining.js - run sync functions in sequence
* chaining-async.js - run functions in sequence (sync and async)
* parallel.js - run functions in parallel

http://www.html5rocks.com/en/tutorials/es6/promises/

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
