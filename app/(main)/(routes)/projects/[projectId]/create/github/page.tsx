"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';

const cleanRepoInput = (input: string) => {
    let cleanedInput = input.trim();

    // Check if input contains 'https://github.com/' and remove it
    if (cleanedInput.startsWith('https://github.com/')) {
      cleanedInput = cleanedInput.replace('https://github.com/', '');
    }

    return cleanedInput;
  };

export default function Home() {
  const [repoInput, setRepoInput] = useState('');
  const [repoDetails, setRepoDetails] = useState(null);
  const [commits, setCommits] = useState([]);
  const [error, setError] = useState('');

  const fetchRepoDetails = async () => {
    if (!repoInput) return;

    const cleanedRepoInput = cleanRepoInput(repoInput);
    const [owner, repo] = cleanedRepoInput.split('/');

    console.log(owner, repo);

    try {
      const response = await axios.post(`/api/github`, { owner, repo });

      console.log(response.data);
      setError('');
    } catch (error) {
      setError('Error fetching repository details or commits');
      setRepoDetails(null);
      setCommits([]);
    }
  };

  // Polling every 10 seconds for real-time commits
  useEffect(() => {
    const interval = setInterval(() => {
      if (repoDetails) {
        fetchRepoDetails();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [repoDetails]);

  return (
    <div>
      <h1>GitHub Repo Commits Viewer</h1>
      <input
        type="text"
        value={repoInput}
        onChange={(e) => setRepoInput(e.target.value)}
        placeholder="Enter GitHub repo (e.g., facebook/react)"
      />
      <button onClick={fetchRepoDetails}>Fetch Repo Details</button>

      {error && <p>{error}</p>}

      {repoDetails && (
        <div>
        </div>
      )}

      {commits.length > 0 && (
        <div>
          <h3>Recent Commits:</h3>
          <ul>
            {commits.map((commit, index) => (
              <li key={index}>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
