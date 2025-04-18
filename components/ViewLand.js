'use client';
import { useState } from 'react';
import { getEthereumContract } from '@/lib/contract';

export default function ViewLand() {
  const [landId, setLandId] = useState('');
  const [result, setResult] = useState('');

  const handleFetch = async () => {
    const contract = await getEthereumContract();
    if (!contract) return;

    try {
      const hash = await contract.getLandDetails(parseInt(landId));
      setResult(hash);
    } catch (err) {
      console.error(err);
      setResult('No record found or error!');
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow bg-white">
      <h2 className="text-xl font-bold mb-2">Check Land on Blockchain</h2>
      <input
        type="text"
        placeholder="Enter Land ID"
        value={landId}
        onChange={(e) => setLandId(e.target.value)}
        className="border p-2 mr-2 rounded"
      />
      <button
        onClick={handleFetch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Get Hash
      </button>
      {result && (
        <p className="mt-2 text-sm text-gray-800 break-all">
          Hash: {result}
        </p>
      )}
    </div>
  );
}
