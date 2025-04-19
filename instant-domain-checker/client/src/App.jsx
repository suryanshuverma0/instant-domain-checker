import { useState } from 'react';
import axios from 'axios';

function App() {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkDomain = async () => {
    if (!domain.trim()) return;

    const formattedDomain = domain.includes('.') ? domain : `${domain}.com`;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await axios.post('http://localhost:3001/check-domain', {
        domain: formattedDomain,
      });
      setResult({
        status: res.data.available ? '✅ Available' : '❌ Taken',
        name: formattedDomain,
      });
    } catch (err) {
      setError('Something went wrong. Try again.');
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Instant Domain Checker</h1>
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        <input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
          placeholder="Enter domain (e.g. startupverse)"
        />
        <button
          onClick={checkDomain}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? 'Checking...' : 'Check Domain'}
        </button>

        {result && (
          <div className="mt-4 text-lg font-medium text-center">
            <p>{result.status}</p>
            <p className="text-sm text-gray-500 mt-1">Domain: {result.name}</p>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-500 text-sm text-center">{error}</div>
        )}
      </div>
    </div>
  );
}

export default App;
