# Voting DApp

A decentralized voting application built with **Solidity, Hardhat, React, Ethers.js (v6)** and **MetaMask**.  
This DApp allows users to connect their wallet, view candidates, add candidates (owner only), and cast votes securely on the Ethereum blockchain.

---

## Features
- Connect with MetaMask wallet  
- Add candidates (only contract owner)  
- View list of candidates  
- Cast votes (1 vote per address)  
- Hardhat local blockchain support  
- Frontend built with React + Vite  
- Smart contracts deployed using Hardhat  

---

## Tech Stack
- **Smart Contracts**: Solidity, Hardhat  
- **Frontend**: React, Vite, Ethers.js v6  
- **Wallet**: MetaMask  
- **Blockchain**: Hardhat local node (chainId: 31337)  

---

## Project Structure
```

voting-dapp/
│── voting-frontend/       # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx        # Main React app
│   │   ├── contracts/     # Contract ABI (Voting.json)
│   │   └── main.jsx
│   └── package.json
│
│── contracts/             # Solidity smart contracts
│   └── Voting.sol
│
│── scripts/               # Deployment scripts
│   └── deploy.js
│
│── hardhat.config.js
│── README.md

````

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/voting-dapp.git
cd voting-dapp
````

### 2. Install dependencies

```bash
# Install backend (Hardhat)
npm install

# Install frontend
cd voting-frontend
npm install
```

### 3. Start Hardhat local blockchain

```bash
npx hardhat node
```

### 4. Deploy contracts

In another terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed contract address and update it in
`voting-frontend/src/App.jsx`

### 5. Run frontend

```bash
cd voting-frontend
npm run dev
```

### 6. Connect MetaMask

* Add **Localhost 8545** network in MetaMask
* Chain ID: **31337**
* Currency: ETH
* Import private keys from Hardhat accounts if needed

---

## Example MetaMask Setup

* **Network Name**: Hardhat Localhost
* **RPC URL**: [http://127.0.0.1:8545/](http://127.0.0.1:8545/)
* **Chain ID**: 31337
* **Currency Symbol**: ETH

---

## Smart Contract (Voting.sol)

* Add candidates
* Store votes
* Prevent double voting
* Restrict candidate addition to contract owner

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## License

This project is licensed under the MIT License.


