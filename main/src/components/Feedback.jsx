import { useState } from 'react';
import axios from 'axios';
import './feedback.css'; // Make sure this file is in the same directory
import Topcomments from './Topcomments';

const backendUrl = import.meta.env.VITE_BACKEND;
const apiKey = import.meta.env.VITE_API_SECRET;

function Feedback({ theme }) {
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/comments`, {
        name,
        comment
      }, {
        headers: {
          'x-api-key': apiKey
        }
      });
      setComment('');
      setName('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`feedback-container ${theme}`}>
      <h2>
        Feedback Time!⌚ - <span><i>Find yourself among them</i></span>💖
      </h2>
      <form onSubmit={sendComment}>
  <label htmlFor="name">Name:&ensp;&ensp;</label>
  <input
    type="text"
    id="name"
    placeholder="Enter your name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />
  <textarea
    rows={5}
    placeholder="Leave your comments..."
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    required
  />
  <button type="submit" disabled={!name || !comment}>Send comment!</button>
</form>

      <Topcomments theme={theme} />
    </div>
  );
}

export default Feedback;
