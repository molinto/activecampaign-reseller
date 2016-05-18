var ActiveCampaignReseller = function(api_key, debug) {

    if (!api_key) throw new Error("Please provide the reseller API Key");
    if (!debug) debug = false;

    ac = new require("activecampaign")("https://www.activecampaign.com", api_key);
    ac.debug = debug;

    return {

        locals: {},

        uniqueUsername: function(username, value) {
            var self = this;

            if (value) {
                if (value === 1) {
                    var nameWith1 = username + '1';
                    ac.api("account/name_check", { 'account': nameWith1 }).then(function(existsWith1) {
                        if (existsWith1.success === 0) {
                            self.uniqueUsername(username, value++);
                        } else {
                            self.locals.accountName = nameWith1;
                        }
                    }, function() {
                        throw new Error('Slight issue getting account check');
                    });
                } else {
                    self.uniqueUsername(username, value++);
                }
            } else {
                ac.api("account/name_check", { 'account': username }).then(function(exists) {
                    if (exists.success === 0) {
                        self.uniqueUsername(username, 1);
                    } else {
                        self.locals.accountName = username;
                    }
                }, function() {
                    throw new Error('Slight issue getting account check');
                });
            }
        },

        getPlans: function(done) {
            ac.api("account/plans", {}).then(function(plans) {
                if (plans.success === 1) {
                    done(null, plans);
                } else {
                    done(null, false);
                }
            }, function() {
                throw new Error('Request issue getting account plans');
            });
        },

        getAccountsList: function(done) {
            ac.api("account/list", {}).then(function(lists) {
                if (lists.success === 1) {
                    done(null, lists);
                } else {
                    done(null, false);
                }
            }, function() {
                throw new Error('Slight issue getting account lists');
            });
        },

        isNameTaken: function(accountName, done) {
            ac.api("account/name_check", { 'account': accountName }).then(function(exists) {
                if (exists.success === 0) {
                    // already taken
                    done(null, true)
                } else {
                    // is available
                    done(null, false);
                }
            }, function() {
                throw new Error('Slight issue getting account check');
            });
        },

        createNewAccount: function(accountDetails, done) {
            var self = this;

            self.uniqueUsername(accountDetails.name);

            setTimeout(function() {
                accountDetails.name = self.locals.accountName;

                ac.api("account/add", {
                    account: accountDetails.name,
                    name: accountDetails.customerName,
                    email: accountDetails.customerEmail,
                    notification: accountDetails.notificationEmail,
                    cname: accountDetails.cname,
                    plan: accountDetails.planId
                }).then(function(newAccount) {
                    if (newAccount.success === 1) {
                        done(null, newAccount);
                    } else {
                        done(null, false);
                    }
                }, function() {
                    throw new Error('Slight issue creating the new account');
                });
            }, 3000);
        },

        getAccountStatus: function(accountName, done) {
            ac.api("account/status", { 'account': accountName }).then(function(exists) {
                if (exists.success === 1) {
                    done(null, exists)
                } else {
                    done(null, false);
                }
            }, function() {
                throw new Error('Slight issue getting account status');
            });
        }
    };
};
module.exports = ActiveCampaignReseller;