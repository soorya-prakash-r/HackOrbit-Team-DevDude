import { useState, useEffect } from 'react'
import axios from 'axios'
import './comments.css'

const backendUrl = import.meta.env.VITE_BACKEND
const apiKey = import.meta.env.VITE_API_SECRET

function Topcomments({ theme }) {
  const [topComments, setTopComments] = useState([])

  useEffect(() => {
    const fetchTopComments = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/top-comments`, {
          headers: {
            'x-api-key': apiKey
          }
        })
        setTopComments(res.data)
      } catch (err) {
        console.error('Error fetching top comments:', err)
      }
    }

    fetchTopComments()
  }, [])

  return (
    <section className="top-comments-container">
      <h2 className="top-comments-heading">🌟 Top Feedbacks 🌟</h2>

      <div className="comments-grid">
        {topComments.length > 0 ? (
          topComments.map(({ name, comment }, index) => (
            <div
              key={index}
              className={`comment-card ${theme === 'dark' ? 'dark' : 'light'}`}
            >
              <h3 className="comment-author">{name}</h3>
              <p className="comment-text">"{comment}"</p>
              <div className="comment-footer">⭐ Thank You! {name}</div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%' }}>
            No comments available at the moment.
          </p>
        )}
      </div>
    </section>
  )
}

export default Topcomments
