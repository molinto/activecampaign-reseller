var config = require('../config').config;
var ac = new require("activecampaign")("https://www.activecampaign.com", config.resellerApiKey);
ac.debug = config.debug;
var locals = {};

function uniqueUsername(username, value) {
    if (value) {
        if (value === 1) {
            var nameWith1 = username + '1';
            ac.api("account/name_check", { 'account': nameWith1 }).then(function(existsWith1) {
                if( existsWith1.success === 0 ){
                    uniqueUsername(username, value++);
                } else {
                    locals.accountName = nameWith1;
                    //return nameWith1;
                }
            }, function(existsWith1) {
                throw new Error('Slight issue getting account check');
            });
        } else {
            uniqueUsername(username, value++);
        }
    } else {
        ac.api("account/name_check", { 'account': username }).then(function(exists) {
            if (exists.success === 0) {
                uniqueUsername(username, 1);
            } else {
                locals.accountName = username;
                //return username;
            }
        }, function(exists) {
            throw new Error('Slight issue getting account check');
        });
    }
}

// ACCOUNT PLANS /////////////////////////////////////////
exports.getPlans = function() {
    ac.api("account/plans", {}).then(function(plans) {
        if (plans.success) {
            // Success
            return plans;
        } else {
            throw new Error("Issue getting account plans");
        }
    }, function(plans) {
        throw new Error('Request issue getting account plans');
    });
};

// ACCOUNT LISTS /////////////////////////////////////////
exports.getAccountsList = function() {
    ac.api("account/list", {}).then(function(lists) {
        if (lists.success) {
            // Success
            return lists;
        } else {
            throw new Error("Slight getting account lists");
        }
    }, function(lists) {
        throw new Error('Slight issue getting account lists');
    });
};

// ACCOUNT NAME TAKEN ///////////////////////////////
exports.nameTaken = function(accountName) {
    ac.api("account/name_check", { 'account': accountName }).then( function(exists ) {
        if (exists.success === 0) {
            console.log('Account name ( '+ accountName + ' ) is  already taken');
            return true;
        } else {
            console.log('Account name ( '+ accountName + ' ) is free!');
            return false;
        }
    }, function(exists) {
        throw new Error('Slight issue getting account check');
    });
};


// CREATE ACCOUNT
exports.createNewAccount = function(accountDetails) {
    uniqueUsername(accountDetails.name);

    setTimeout(function(){
        accountDetails.name = locals.accountName;

        ac.api("account/add", {
            account: accountDetails.name,
            name: accountDetails.customerName,
            email:accountDetails.customerEmail,
            notification: accountDetails.notificationEmail,
            cname: accountDetails.cname,
            plan: accountDetails.planId
        }).then(function(newAccount) {
            if (newAccount.success) {
                // New account details
                console.log(newAccount);
            } else {
                throw new Error('Slight issue creating the new account');
            }
        }, function(newAccount) {
            throw new Error('Slight issue creating the new account');
        });
    }, 3000);

};