import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserData {
  email: string;
  gravatarUrl: string;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      navigate('/');
      return;
    }

    const parsedUser = JSON.parse(stored);
    setUser(parsedUser);

    // Try to fetch GitHub user info
    fetch(`https://api.github.com/search/users?q=${parsedUser.email}+in:email`)
      .then(res => res.json())
      .then(data => {
        if (data.total_count > 0 && data.items.length) {
          return fetch(data.items[0].repos_url);
        } else {
          throw new Error('No GitHub user found');
        }
      })
      .then(res => res.json())
      .then(repos => setRepos(repos.slice(0, 5)))
      .catch(err => setError(err.message));
  }, [navigate]);

  if (!user) return null;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>qbiqbiqw</h1>
      {/* <h2>Profile for: {user.email}</h2>
      <img src={user.gravatarUrl} alt="Gravatar" width={100} height={100} />
      <h3>GitHub Repositories</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {repos.length ? (
          repos.map(repo => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </li>
          ))
        ) : (
          <li>No public repositories found.</li>
        )}
      </ul> */}
    </div>
  );
};

export default ProfilePage;
