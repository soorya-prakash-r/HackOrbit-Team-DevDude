import './footer.css'

function Footer({ theme }) {
  return (
    <footer>
      <p>
        <span style={{ fontFamily: "sans-serif" }}>©</span> {new Date().getFullYear()} Promptify! All rights reserved.
      </p>
      <p>
        Created by <a
          style={{ color: theme === 'dark' ? '#00aaff' : '#0056b3' }}
          href="https://github.com/soorya-prakash-r"
          target="_blank"
          rel="noopener noreferrer"
        >
          Soorya Prakash R
        </a>
      </p>
    </footer>
  )
}

export default Footer
