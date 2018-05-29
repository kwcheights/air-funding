var Holiday = artifacts.require("./Holidays.sol");
var agency = 0x75664BeAf0e5CDfe44344eB09513B4062bA7Fb69; //DEPRECATO. JS TAGLIA ALCUNE CIFRE HEX E QUINDI IL CONTRACT HA L'AGENCY SBAGLIATA
var goal = 5000000000000000000;

module.exports = function(deployer) {
  deployer.deploy(Holiday);

};