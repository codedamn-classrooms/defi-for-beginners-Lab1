const Wallet= artifacts.require("Wallet");

module.exports = function(deployer,_networks,accounts) {
  deployer.deploy(Wallet,accounts[0]);
};
