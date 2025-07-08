import './devcss.css'   
import { useEffect } from 'react'

function DeveloperInfo({ theme }) {
  useEffect(() => {
    document.body.className = theme 
  }, [theme])

  return (
  <div className={`developer-info-container ${theme}`}>
    <div className="developer-info-card">
      <h2 className="section-title">About the Developer</h2>
      <p>
        Hello! I'm <strong>Soorya Prakash R</strong>, an enthusiastic, ebullient, and emerging <br />
        Computer Science Engineer currently pursuing my Bachelor's degree at Anna University.
      </p>
      <p>
        I am deeply passionate about continuously expanding my knowledge across a wide range of programming languages and staying at the forefront of
        emerging trends in computer science. My curiosity drives me to explore innovative solutions and embrace new technologies.
        In particular, I have a strong interest in the transformative potential of artificial intelligence. I enjoy experimenting with <i>AI tools</i> and techniques to push
        the boundaries of what technology can achieve, striving to turn ideas into impactful, intelligent solutions.
      </p>
      <p>
        This project, <strong><i>Promptify!</i></strong>, is an innovative platform built to empower users to
        interact with AI systems effortlessly and intuitively. At its core, it bridges the gap between human language
        and machine understanding, making prompt crafting as natural as everyday conversation.
      </p>
      <p>
        By focusing on natural language input, <strong><i>Promptify!</i></strong> removes technical barriers often
        associated with AI use. Users simply express what they need in plain language, and Promptify!
        structures and optimizes it for the AI to process intelligently.
      </p>
      <p>
  <a
    href="https://www.linkedin.com/in/r-soorya-prakash/"
    target="_blank"
    rel="noopener noreferrer"
    className={`developer-link ${theme === 'dark' ? 'link-dark' : 'link-light'}`}
  >
    Visit my LinkedIn
  </a>&ensp;
  <a
    href="https://github.com/soorya-prakash-r"
    target="_blank"
    rel="noopener noreferrer"
    className={`developer-link ${theme === 'dark' ? 'link-dark' : 'link-light'}`}
  >
    Visit my Github
  </a>
</p>

    </div>
  </div>
);

}

export default DeveloperInfo
