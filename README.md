# ActiveCampaign Reseller

## Description

This is a small module designed for node.js servers to help ActiveCampaign resellers in [ActiveCampaign](http://www.activecampaign.com/features/resell.php).

## Installation

npm install activecampaign-reseller

## Usage
Add your reseller api key as the param

    var ActiveCampaignReseller = require("activecampaign-reseller")("ABCDEFGHIJK1234567890");

### Check if an account name exists
This will check if your customers desired account name already exists (as only 1 can exist in the ActiveCampaign system of that name)

 - __accountName__ String, Required. Name of check
 - __RETURNS__ Boolean. true if name **already exists**
 
 
    activeCampaign.nameTaken('accountName');


### Getting a list of customer account 
This will return a list of accounts in your seller account 

 - __RETURNS__ Object.  List of your customer accounts 
 
 
    activeCampaign.getAccountsList();

### Get a list of all the reseller plans
Will return a detailed list of all the reseller plans 

 - __RETURNS__  Object.  List of plans available to reseller
 
 
    activeCampaign.getPlans();

### Create a new account
Creates a new account under your reseller account 

 - __accountDetails__ Object, Required. 
 - __RETURNS__ Object. New account details
 
 
    var accountDetails = {
        name: "molinto",
        customerName: "FirstName LastName",
        customerEmail: "customer@email.com",
        notificationEmail: "reseller@youremail.com",
        cname: "",
        planId: 0 // Keep it zero for testing, otherwise your reseller account will be charged the plan straight away!
    };

    
    activeCampaign.createNewAccount(accountDetails);
