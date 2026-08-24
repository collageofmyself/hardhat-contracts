import hre from "hardhat";
import chalk from "chalk";

async function main() {
  const { ethers } = await hre.network.create();
  const CollageOfMyself = await ethers.getContractFactory("CollageOfMyself");
  const collageOfMyself = await CollageOfMyself.deploy(
    "ipfs://QmQ38J3nSHcJvnDWd4U7bm7mPir5S5UMjz8iMhYS8297rR/",
    "https://",
  );

  await collageOfMyself.waitForDeployment();
  const deployedAddress = await collageOfMyself.getAddress();

  console.log(chalk.blue("CollageOfMyself deployed to:", deployedAddress));

  console.log(chalk.green("pause()"), false);

  await collageOfMyself.pause(false);

  console.log(chalk.green("mint()"));

  const owner = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
  const balance = await collageOfMyself.balanceOf(owner);
  console.log("balance: ", balance.toString());

  await collageOfMyself.mint(5, { value: 0 });

  const balance2 = await collageOfMyself.balanceOf(owner);
  console.log("balance: ", balance2.toString());

  await collageOfMyself.mint(20, { value: 0 });

  const balance3 = await collageOfMyself.balanceOf(owner);
  console.log("balance: ", balance3.toString());

  const publicUsername = await collageOfMyself.publicUsernameOfOwner(owner);
  console.log("publicUsername: ", publicUsername);

  console.log(chalk.green("Set publicUsername"));

  await collageOfMyself.setPublicUsername("test");

  const publicUsername2 = await collageOfMyself.publicUsernameOfOwner(owner);
  console.log("publicUsername: ", publicUsername2);

  console.log(chalk.green("tokenURI()"));

  const tokenUri = await collageOfMyself.tokenURI(1);
  console.log("tokenUri: ", tokenUri);

  console.log(chalk.green("walletOfOwner()"));

  const walletOfOwner = await collageOfMyself.walletOfOwner(owner);
  console.log("walletOfOwner: ", walletOfOwner.toString());

  console.log(chalk.green("reveal()"));

  await collageOfMyself.reveal();
  const tokenUri2 = await collageOfMyself.tokenURI(1);
  console.log("tokenUri: ", tokenUri2);

  console.log(chalk.green(".mintCost"));

  const mintCost = await collageOfMyself.mintCost();
  console.log("mintCost: ", mintCost.toString());

  console.log(chalk.green(".transferCost"));

  const transferCost = await collageOfMyself.transferCost();
  console.log("transferCost: ", transferCost.toString());

  console.log(chalk.green("setCost()"));
  await collageOfMyself.setCost(mintCost + mintCost, transferCost + transferCost);

  const mintCost2 = await collageOfMyself.mintCost();
  console.log("mintCost: ", mintCost2.toString());
  const transferCost2 = await collageOfMyself.transferCost();
  console.log("transferCost: ", transferCost2.toString());

  console.log(chalk.green("setCost()"));
  await collageOfMyself.setCost(mintCost, transferCost);

  const mintCost3 = await collageOfMyself.mintCost();
  console.log("mintCost: ", mintCost3.toString());
  const transferCost3 = await collageOfMyself.transferCost();
  console.log("transferCost: ", transferCost3.toString());

  console.log(chalk.green(".maxSupply"));
  const maxSupply = await collageOfMyself.maxSupply();
  console.log("maxSupply: ", maxSupply.toString());

  console.log(chalk.green(".maxMintAmount"));
  const maxMintAmount = await collageOfMyself.maxMintAmount();
  console.log("maxMintAmount: ", maxMintAmount.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
