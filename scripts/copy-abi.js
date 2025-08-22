const fs = require("fs-extra");
const path = require("path");

async function main() {
  const source = path.join(__dirname, "../artifacts/contracts/Voting.sol/Voting.json");
  const destination = path.join(__dirname, "../voting-frontend/src/contracts/Voting.json");

  try {
    await fs.copy(source, destination);
    console.log("✅ ABI copied to frontend/src/contracts/");
  } catch (err) {
    console.error("❌ Error copying ABI:", err);
  }
}

main();
