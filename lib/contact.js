import { ethers } from 'ethers';

// Replace with your own deployed contract address
const CONTRACT_ADDRESS = "0xYourDeployedContractAddressHere";

// Replace with your actual ABI JSON (shortened for now)
const CONTRACT_ABI = [
  {
    "inputs": [{"internalType": "uint256","name": "_landId","type": "uint256"},{"internalType": "string","name": "_landHash","type": "string"}],
    "name": "registerLand",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_landId","type": "uint256"}],
    "name": "getLandDetails",
    "outputs": [{"internalType": "string","name": "","type": "string"}],
    "stateMutability": "view",
    "type": "function"
  }
];

export const getEthereumContract = () => {
  if (typeof window.ethereum === 'undefined') {
    alert('Please install MetaMask!');
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  return contract;
};
