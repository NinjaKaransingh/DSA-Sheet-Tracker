import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [topics, setTopics] = useState([]);
  const [completed, setCompleted] = useState([]);

  const fetchTopics = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://dsa-sheet-tracker-ul2c.onrender.com/api/topics', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTopics(res.data);
    } catch (err) {
      console.error('Error fetching topics:', err);
    }
  };

  const fetchCompletedProblems = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://dsa-sheet-tracker-ul2c.onrender.com/api/auth/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompleted(res.data.completedProblems);
    } catch (err) {
      console.error('Error fetching completed problems:', err);
    }
  };

  const markCompleted = async (problemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://dsa-sheet-tracker-ul2c.onrender.com/api/topics/complete',
        { problemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCompleted((prev) => [...prev, problemId]);
    } catch (err) {
      console.error('Error marking completed:', err);
    }
  };

  useEffect(() => {
    fetchTopics();
    fetchCompletedProblems();
  },[]);

  const isCompleted = (id) => completed.includes(id);

  return (
    <div style={{ padding: '20px' }}>
      <h1>DSA Sheet Tracker</h1>
      <ul>
      {topics.map(p => (
          <li key={p._id} className="mb-2 border p-2 rounded">
            <h2 className="text-lg font-semibold">{p.title} ({p.difficulty})</h2>
            <div className="space-x-2">
              {p.leetcodeLink && <a href={p.leetcodeLink} target="_blank" className='cust-mg'>LeetCode</a>}
              {p.codeforcesLink && <a href={p.codeforcesLink} target="_blank" className='cust-mg'>Codeforces</a>}
              {p.youtubeLink && <a href={p.youtubeLink} target="_blank" className='cust-mg'>YouTube</a>}
              {p.articleLink && <a href={p.articleLink} target="_blank" className='cust-mg'>Article</a>}
            </div>
          </li>
          
        ))}
        </ul>
      {/* {topics.map((topic) => (
        <div key={topic._id} style={{ marginBottom: '20px' }}>
          <h2>{topic.name}</h2>
          <ul>
            {topic.problems.map((problem) => (
              <li key={problem._id} style={{ marginBottom: '10px' }}>
                <input
                  type="checkbox"
                  checked={isCompleted(problem._id)}
                  onChange={() => markCompleted(problem._id)}
                />
                <strong> {problem.title}</strong> [{problem.difficulty}]
                <div style={{ marginLeft: '20px' }}>
                  <a href={problem.youtubeLink} target="_blank" rel="noopener noreferrer">YouTube</a> |{' '}
                  <a href={problem.leetcodeLink} target="_blank" rel="noopener noreferrer">LeetCode</a> |{' '}
                  <a href={problem.codeforcesLink} target="_blank" rel="noopener noreferrer">Codeforces</a> |{' '}
                  <a href={problem.articleLink} target="_blank" rel="noopener noreferrer">Article</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))} */}
    </div>
  );
}

export default Dashboard;
