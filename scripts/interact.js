const fs = require("fs");
const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // update this

  // Load ABI directly from artifacts
  const abi = JSON.parse(fs.readFileSync("./artifacts/contracts/Voting.sol/Voting.json")).abi;

  const [deployer] = await ethers.getSigners();
  const voting = new ethers.Contract(contractAddress, abi, deployer);

  console.log(`✅ Connected to Voting contract at: ${contractAddress}`);

  await voting.addCandidate("Alice");
  await voting.addCandidate("Bob");

  const count = await voting.getCandidateCount();
  console.log("Candidate count:", count.toString());

  const candidate = await voting.getCandidate(0);
  console.log("Candidate 0:", candidate);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
