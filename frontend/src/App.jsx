import { useState, useEffect } from 'react';

const API_BASE = `http://3.26.210.24:5000` || 'http://localhost:5000';

export default function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', rating: 5, message: '' });
  const [loading, setLoading] = useState(false);

  const loadFeedbacks = () => {
    fetch(`${API_BASE}/api/feedbacks`)
      .then(res => res.json())
      .then(data => Array.isArray(data) && setFeedbacks(data))
      .catch(console.error);
  };

  useEffect(() => { loadFeedbacks(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${API_BASE}/api/feedbacks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setForm({ name: '', email: '', rating: 5, message: '' });
      loadFeedbacks();
    } catch (err) {
      alert('Error submitting feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>QuickFeedback Service</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <input 
          placeholder="Your Name" 
          required 
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
        />
        <input 
          placeholder="Your Email" 
          type="email" 
          required 
          value={form.email} 
          onChange={e => setForm({...form, email: e.target.value})} 
        />
        <label>
          Rating: 
          <select 
            value={form.rating} 
            onChange={e => setForm({...form, rating: Number(e.target.value)})}
          >
            {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
          </select>
        </label>
        <textarea 
          placeholder="Your thoughts..." 
          rows={3} 
          required 
          value={form.message} 
          onChange={e => setForm({...form, message: e.target.value})} 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Send Feedback'}
        </button>
      </form>

      <hr style={{ margin: '2rem 0' }} />
      <h3>Recent Submissions</h3>
      <div className="feedback-list">
        {feedbacks.length === 0 ? (
          <p style={{ color: '#888' }}>No feedback submitted yet. Be the first!</p>
        ) : (
          feedbacks.map(f => (
            <div key={f._id} className="feedback-card">
              <div className="card-header">
                <strong>{f.name}</strong> 
                <span className="stars">{'★'.repeat(f.rating)}</span>
                <span className="date">{new Date(f.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="card-body">{f.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

