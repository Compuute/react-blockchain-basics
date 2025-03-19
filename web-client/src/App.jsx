import { ethers } from "ethers";
import "./App.css";
import { address, abi } from "./config";
import { useState, useEffect } from "react";

if (window.ethereum) {
  window.provider = new ethers.BrowserProvider(window.ethereum);
} else {
  console.error("No web3 provider detected, please install MetaMask!");
}

function App() {
  const [readContract, setReadContract] = useState();
  const [writeContract, setWriteContract] = useState();

  useEffect(() => {
    console.log(readContract, writeContract);
    if (readContract && writeContract) return;

    const getProvider = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      // Create a read contract instance - For reading  stuff for free
      const rContract = new ethers.Contract(address, abi, provider);
      setReadContract(rContract);

      // Create a write contract instance to be signed by metamask, not free
      const signer = await provider.getSigner();
      const wContract = new ethers.Contract(address, abi, signer);
      setWriteContract(wContract);

      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      updateWallet(accounts[0]);
    };

    getProvider();
  }, []);

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({});
  };

  return <>Hej !</>;
}
export default App;
