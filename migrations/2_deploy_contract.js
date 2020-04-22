var FoodSafe = artifacts.require("contracts/Foodchain.sol");
module.exports = function(deployer) {

    deployer.deploy(FoodSafe);
}