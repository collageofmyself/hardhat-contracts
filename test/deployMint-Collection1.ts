import { expect } from "chai";
import { ethers } from "hardhat";
import chalk from 'chalk';
import figlet from 'figlet';

const ContractName = `CollageOfMyself`;

describe("CollageOfMyself Contract", function () {
  it("It should deploy", async function () {
    figlet(ContractName, (err: any, data: any) => {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      return console.log(chalk.yellow(data));
    });
      //  const [owner] = await ethers.getSigners();
    const CollageOfMyself = await ethers.getContractFactory("CollageOfMyself");
    const collageOfMyself = await CollageOfMyself.deploy("ipfs://QmQ38J3nSHcJvnDWd4U7bm7mPir5S5UMjz8iMhYS8297rR/", "ipfs://");
    await collageOfMyself.deployed();
    expect(await collageOfMyself.name()).to.equal('Collage of Myself');
  });
  it("It should activate and mint 5 nfts", async function () {
    const [owner] = await ethers.getSigners();
    const CollageOfMyself = await ethers.getContractFactory("CollageOfMyself");
    const collageOfMyself = await CollageOfMyself.deploy("ipfs://QmQ38J3nSHcJvnDWd4U7bm7mPir5S5UMjz8iMhYS8297rR/", "ipfs://");
    const startMinting = await collageOfMyself.pause(false);
    // wait until the transaction is mined
    await startMinting.wait();
    // Mint
    await collageOfMyself.mint(5);
    expect(await collageOfMyself.balanceOf(owner.address)).to.equal(5);
  });
  it("It should mit 15 more nfts", async function () {
    const [owner] = await ethers.getSigners();
    const CollageOfMyself = await ethers.getContractFactory("CollageOfMyself");
    const collageOfMyself = await CollageOfMyself.deploy("ipfs://QmQ38J3nSHcJvnDWd4U7bm7mPir5S5UMjz8iMhYS8297rR/", "ipfs://");
    const startMinting = await collageOfMyself.pause(false);
    // wait until the transaction is mined
    await startMinting.wait();
    // Mint
    await collageOfMyself.mint(5);
    await collageOfMyself.mint(15);
    expect(await collageOfMyself.balanceOf(owner.address)).to.equal(20);
  });
  it("It should set a public username", async function () {
    const [owner] = await ethers.getSigners();
    const CollageOfMyself = await ethers.getContractFactory("CollageOfMyself");
    const collageOfMyself = await CollageOfMyself.deploy("ipfs://QmQ38J3nSHcJvnDWd4U7bm7mPir5S5UMjz8iMhYS8297rR/", "ipfs://");
    const startMinting = await collageOfMyself.pause(false);
    // wait until the transaction is mined
    await startMinting.wait();
    // Mint
    await collageOfMyself.mint(5);
    const publicUsername = await collageOfMyself.publicUsernameOfOwner("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");
    console.log("publicUsername: ", publicUsername);
    
    console.log(chalk.green("Set publicUsername"));
  
    await collageOfMyself.setPublicUsername("test");
  
    const publicUsername2 = await collageOfMyself.publicUsernameOfOwner("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");
    console.log("publicUsername: ", publicUsername2);
    expect(await collageOfMyself.publicUsernameOfOwner(owner.address)).to.equal(publicUsername2);
  });
});
