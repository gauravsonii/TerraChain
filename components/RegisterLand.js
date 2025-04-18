'use client';
import { useState } from 'react';
import { getEthereumContract } from '@/lib/contract';

export default function RegisterLand() {
  const [landId, setLandId] = useState('');
  const [landHash, setLandHash] = useState('');
  const [status, setStatus] = useState('');

  const handleRegister = async () => {
    const contract = await getEthereumContract();
    if (!contract) return;

    try {
      setStatus('Registering...');
      const tx = await contract.registerLand(parseInt(landId), landHash);
      await tx.wait();
      setStatus('Land registered successfully!');
    } catch (err) {
      console.error(err);
      setStatus('Registration failed!');
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow mb-6 bg-white">
      <h2 className="text-xl font-bold mb-2">Register Land on Blockchain</h2>
      <input
        type="text"
        placeholder="Land ID"
        value={landId}
        onChange={(e) => setLandId(e.target.value)}
        className="border p-2 mr-2 rounded"
      />
      <input
        type="text"
        placeholder="Land Hash"
        value={landHash}
        onChange={(e) => setLandHash(e.target.value)}
        className="border p-2 mr-2 rounded"
      />
      <button
        onClick={handleRegister}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Register
      </button>
      <p className="mt-2 text-sm text-gray-600">{status}</p>
    </div>
  );
}
