export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";  // Replace with actual address

export const contractABI = [
  {
    "inputs": [{"internalType": "string","name": "_name","type": "string"}],
    "name": "addCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_candidateIndex","type": "uint256"}],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_index","type": "uint256"}],
    "name": "getCandidate",
    "outputs": [
      {"internalType": "string","name":"","type":"string"},
      {"internalType": "uint256","name":"","type":"uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCandidateCount",
    "outputs": [{"internalType": "uint256","name":"","type":"uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];
