const dex = artifacts.require("dex");
module.exports = async function(deployer) {
  
  await deployer.deploy(dex);
  const Dex = await dex.deployed();
};
