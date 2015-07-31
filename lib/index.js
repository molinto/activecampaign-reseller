var ActiveCampaignReseller = function(api_key, debug) {

    if (!api_key) throw new Error("Please provide the reseller API Key");
    if (!debug) debug = false;

    ac = new require("activecampaign")("https://www.activecampaign.com", api_key);
    ac.debug = debug;

    return {

        locals: {},

        uniqueUsername: function (username, value) {
            if (value) {
                if (value === 1) {
                    var nameWith1 = username + '1';
                    ac.api("account/name_check", { 'account': nameWith1 }).then(function(existsWith1) {
                        if( existsWith1.success === 0 ){
                            this.uniqueUsername(username, value++);
                        } else {
                            this.locals.accountName = nameWith1;
                            //return nameWith1;
                        }
                    }, function(existsWith1) {
                        throw new Error('Slight issue getting account check');
                    });
                } else {
                    this.uniqueUsername(username, value++);
                }
            } else {
                ac.api("account/name_check", { 'account': username }).then(function(exists) {
                    if (exists.success === 0) {
                        uniqueUsername(username, 1);
                    } else {
                        this.locals.accountName = username;
                        //return username;
                    }
                }, function(exists) {
                    throw new Error('Slight issue getting account check');
                });
            }
        },

        getPlans:  function() {
            ac.api("account/plans", {}).then(function(plans) {
                if (plans.success) {
                    // Success
                    return plans;
                } else {
                    throw new Error("Slight issue getting account plans");
                }
            }, function(plans) {
                throw new Error('Request issue getting account plans');
            });
        },

        getAccountsList: function() {
            ac.api("account/list", {}).then(function(lists) {
                if (lists.success) {
                    // Success
                    return lists;
                } else {
                    throw new Error("Slight issue getting account lists");
                }
            }, function(lists) {
                throw new Error('Slight issue getting account lists');
            });
        },

        nameTaken: function(accountName) {
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
        },

        createNewAccount: function(accountDetails) {
            this.uniqueUsername(accountDetails.name);

            setTimeout(function(){
                accountDetails.name = this.locals.accountName;

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

        }

    };

};
module.exports = ActiveCampaignReseller;