# ActiveCampaign Reseller

## Description

This is a small module designed to help ActiveCampaign resellers in [ActiveCampaign](http://www.activecampaign.com/features/resell.php).

## Installation

npm install activecampaign-reseller

## Usage
 - Add your reseller API key as the 1st param
 - Add (optional) 2nd param to show debug in console.log()
 

    var ACR = require("activecampaign-reseller")("ABCDEFGHIJK1234567890", true);

### Check if an account name exists
This will check if your customers desired account name already exists (as only 1 can exist in the ActiveCampaign system of that name)

 - __accountName__ String, Required. Name of account to check
 - __RETURNS__ Boolean. true if name **already exists**
 
 
    ACR.nameTaken('accountName');


### Getting a list of customer account 
This will return a list of accounts in your seller account 

 - __RETURNS__ Object.  List of your customer accounts 
 
 
    ACR.getAccountsList();

### Get a list of all the reseller plans
Will return a detailed list of all the reseller plans on ActiveCampaign (currently 128)

 - __RETURNS__  String.  Account status
 
 
    ACR.getPlans();

### Check status of an account
Will return an status of an individual account

 - __accountName__ String, Required. Name of account
 - __RETURNS__  String.  Account status (active, disabled, creating or cancelled)
 
 
    ACR.getAccountStatus('accountName');

### Create a new account
Creates a new account under your reseller account. 
Also, checks if the account name already exists, if exists already, a numerical value 1 will be concatenated to the end, then 2, 3 etc etc.

**Keep planId 0 (zero) for testing, otherwise your reseller account will be charged the plan amount straight away!**

 - __accountDetails__ Object, Required. 
 - __RETURNS__ Object. New account details
 
 
    var accountDetails = {
        name: "myNewAccountName",
        customerName: "FirstName LastName",
        customerEmail: "customer@email.com",
        notificationEmail: "reseller@youremail.com",
        cname: "",
        planId: 0 
    };


    ACR.createNewAccount(accountDetails);
