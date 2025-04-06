// We require the Hardhat Runtime Environment explicitly here
const hre = require("hardhat");

async function main() {
  console.log("Deploying ProductVerification contract...");

  // Get the contract factory
  const ProductVerification = await hre.ethers.getContractFactory("ProductVerification");
  
  // Deploy the contract
  const productVerification = await ProductVerification.deploy();
  
  // Wait for deployment to finish
  await productVerification.waitForDeployment();
  
  // Get the deployment address
  const address = await productVerification.getAddress();
  console.log("ProductVerification deployed to:", address);
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 