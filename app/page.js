'use client';
import { useEffect, useState } from 'react';

export default function ConnectWallet() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
      } catch (err) {
        console.error('Wallet connection failed', err);
      }
    }
  };



//   FOR NEXT JS VERSON

  return (
    <div className="p-4">
      <button
        onClick={connectWallet}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        {account ? `Connected: ${account.slice(0, 6)}...` : 'Connect Wallet'}
      </button>
    </div>
  );
}

import RegisterLand from '@/components/RegisterLand';
import ViewLand from '@/components/ViewLand';
import ConnectWallet from '@/components/ConnectWallet';

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-4 space-y-6">
      <ConnectWallet />
      <RegisterLand />
      <ViewLand />
    </main>
  );
}
