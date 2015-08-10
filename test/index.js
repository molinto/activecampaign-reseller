var apiKey = "b653722b58273d1fac8c54ad9fac75ab4f66c8d639a3c5a603b948567d630ccdbfd4b9fa";
var debug = false;

//////////////////////////////////////////////////

var assert = require("assert"),
    ACR = require("../lib/index")(apiKey, debug);

describe('Active Campaign Reseller', function() {
    // Name taken
    describe('#isNameTaken()', function() {
        it('Response ok', function(done) {
            ACR.isNameTaken('molinto', function(err, res){
                if (err) throw err;
                done();
            });
        });

        it('Name molinto is already taken', function(done) {
            ACR.isNameTaken('molinto', function(err, res){
                if (err) throw err;
                assert.equal(res, true);
                done();
            });
        });

        it('Name molinto2 is available', function(done) {
            ACR.isNameTaken('molinto2', function(err, res){
                if (err) throw err;
                assert.equal(res, false);
                done();
            });
        });
    });

    // Plans
    describe('#getPlans()', function() {
        it('Response ok', function(done) {
            ACR.getPlans(function(err){
                if (err) throw err;
                done();
            });
        });

        it('Get all 128 plans', function(done) {
            ACR.getPlans(function(err, res){
                if (err) throw err;
                assert(Object.keys(res.plans).length, 128);
                done();
            });
        });
    });

    // Accounts list
    describe('#getAccountsList()', function() {
        it('Response ok', function(done) {
            ACR.getAccountsList(function(err){
                if (err) throw err;
                done();
            });
        });
    });

    // Account status
    describe('#getAccountStatus()', function() {
        it('Response ok', function(done) {
            ACR.getAccountStatus('molinto', function(err){
                if (err) throw err;
                done();
            });
        });

        it('Molinto account status is active', function(done) {
            ACR.getAccountStatus('molinto', function(err, res){
                if (err) throw err;
                assert(res.status, 'active');
                done();
            });
        });
    });
});