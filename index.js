var activeCampaign = require('./lib');
// var accountDetails, lists, nameExists, plans, ;

// Create a new customer account, creates a new account name if already taken automagically
var accountDetails = {
    name: "molinto",
    customerName: "FirstName LastName",
    customerEmail: "customer@email.com",
    notificationEmail: "reseller@email.com",
    cname: "",
    planId: 0 // Keep it zero for testing, otherwise your reseller account will be charged the plan straight away!
};
// activeCampaign.createNewAccount(accountDetails);

// Get list of customer accounts
// lists = activeCampaign.getAccountsList();

// Check if an account name exists
// nameExists = activeCampaign.nameTaken('molinto');


// Get reseller plans
// plans = activeCampaign.getPlans();