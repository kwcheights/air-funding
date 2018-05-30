var Migrations = artifacts.require("./Airfunding.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
