import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Voting from "./contracts/Voting.json"; // Make sure ABI is here

// ⚠️ Update with your deployed contract address
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// ⚠️ Update with your Hardhat Localhost chainId (default 31337)
const LOCAL_CHAIN_ID = 31337;

function App() {
  const [account, setAccount] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState("");
  const [loading, setLoading] = useState(false);
  const [wrongNetwork, setWrongNetwork] = useState(false);

  // Connect to MetaMask and check network
  async function connectWallet() {
    if (!window.ethereum) {
      alert("MetaMask not found! Please install it first.");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);

    const network = await provider.getNetwork();
    if (network.chainId !== LOCAL_CHAIN_ID) {
      setWrongNetwork(true);
      alert(
        `Please switch your MetaMask network to Hardhat Localhost (chainId ${LOCAL_CHAIN_ID}).`
      );
    } else {
      setWrongNetwork(false);
      loadCandidates();
    }
  }

  // Get contract instance
  function getContract(signerOrProvider) {
    return new ethers.Contract(CONTRACT_ADDRESS, Voting.abi, signerOrProvider);
  }

  // Load candidates
  async function loadCandidates() {
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = getContract(provider);

      const count = await contract.getCandidateCount();
      const items = [];
      for (let i = 0; i < count; i++) {
        const [name, votes] = await contract.getCandidate(i);
        items.push({ name, votes: votes.toString() });
      }
      setCandidates(items);
    } catch (err) {
      console.error("❌ Error loading candidates:", err);
      alert("Error loading candidates. Check contract address, ABI, or network.");
    } finally {
      setLoading(false);
    }
  }

  // Add a new candidate
  async function addCandidate() {
    if (!newCandidate) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);

      const tx = await contract.addCandidate(newCandidate);
      await tx.wait();
      setNewCandidate("");
      loadCandidates();
    } catch (err) {
      console.error("❌ Error adding candidate:", err);
      alert("Failed to add candidate.");
    }
  }

  // Vote for a candidate
  async function vote(index) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);

      const tx = await contract.vote(index);
      await tx.wait();
      loadCandidates();
    } catch (err) {
      console.error("❌ Error voting:", err);
      alert("Failed to vote. You may have already voted or chosen an invalid candidate.");
    }
  }

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>🗳️ Voting DApp</h1>
      {wrongNetwork && (
        <p style={{ color: "red" }}>
          ⚠️ MetaMask is on the wrong network. Switch to Hardhat Localhost.
        </p>
      )}
      <p>Connected account: {account || "Not connected"}</p>

      <div style={{ margin: "20px 0" }}>
        <input
          placeholder="Enter candidate name"
          value={newCandidate}
          onChange={(e) => setNewCandidate(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button onClick={addCandidate} style={{ padding: "8px 16px" }}>
          Add Candidate
        </button>
      </div>

      <h2>Candidates</h2>
      {loading ? (
        <p>Loading...</p>
      ) : candidates.length === 0 ? (
        <p>No candidates yet</p>
      ) : (
        candidates.map((c, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px",
              border: "1px solid #ccc",
              marginBottom: "8px",
              borderRadius: "4px",
            }}
          >
            <span>
              {c.name} — Votes: {c.votes}
            </span>
            <button onClick={() => vote(i)} style={{ padding: "4px 8px" }}>
              Vote
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
