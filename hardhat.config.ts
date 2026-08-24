import { config as loadEnv } from "dotenv";
import { defineConfig, task } from "hardhat/config";
import hardhatToolboxMochaEthers from "@nomicfoundation/hardhat-toolbox-mocha-ethers";

loadEnv();

const printAccounts = task("accounts", "Prints the list of accounts")
  .setInlineAction(async (_taskArgs, hre) => {
    const connection = await hre.network.create();
    const accounts = await connection.provider.request({
      method: "eth_accounts",
    });
    for (const account of accounts as string[]) {
      console.log(account);
    }
  })
  .build();

export default defineConfig({
  plugins: [hardhatToolboxMochaEthers],
  tasks: [printAccounts],
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
});
