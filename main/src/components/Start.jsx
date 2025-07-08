import { useEffect } from "react"
import './start.css'

function Start({ theme }) {
  useEffect(() => {
    document.body.className = theme 
  }, [theme])

  return (
    <div>
      <div className="intro-section">
        
        <div className="intro-image">
          <img
            src="/icon.png"
            alt="Promptify AI icon"
            className="promptify-logo"
            style={{
              border: `5px solid ${theme === 'dark' ? 'white' : 'black'}`
            }}
          />
        </div>

        <div className="right-column">
          <div className="enhanced-paragraph">
            <h2>What's Prompting? How do you do it?</h2>
            <p>
              <strong><i>Prompting</i></strong> is the process of giving instructions or questions to an AI model to generate a response.
              It helps control the style, content, and quality of the output.
              <br />
              <strong><i>Prompt engineering</i></strong> is the practice of crafting effective inputs to guide AI models toward desired outputs.
              It involves using clear, specific language to improve accuracy, creativity, or functionality.
              <br /><br />
              Unlock the power of AI! Use <strong style={{ fontSize: '0.9rem' }}><i>Promptify!✨</i></strong> to simplify prompting and sharpen your prompt engineering game.
            </p>
          </div>
        </div>
      </div>

      <h1 style={{ textAlign: 'center' }}>
        How to use <i>Promptify!</i> - <span style={{ fontSize: '1.5rem' }}>from Fuzzy to Efficient <i>Prompts</i></span>
      </h1>
 
      <div className="grid-container">
        
        <div className={`prompt-card ${theme} interactive-card`}>
          <div className="card-header">
            <h3>❌ <i>Fuzzy Prompts</i></h3>
            <h3>➡️➡️➡️</h3>
          </div>
          <p>😥 <strong>Tell me about AI.</strong></p>
          <p>😥 <strong>What can you tell me about artificial intelligence?</strong></p>
          <p>😥 <strong>Give me all the information about AI.</strong></p>
        </div>

        
        <div className={`prompt-card ${theme} interactive-card`}>
          <div className="card-header">
            <h3>⚡Use <i>Promptify!</i>✨</h3>
            <h3>➡️➡️➡️</h3>
          </div>
          <p>⭐ Type your prompt</p>
          <p>⭐ <i>Enhance</i> your prompts...</p>
          <p>⭐ Get the <i>most</i> efficient prompt!</p>
        </div>
        
        <div className={`prompt-card ${theme} interactive-card`}>
          <div className="card-header">
            <h3>✅ Most <i>Efficient</i> Prompts</h3>
            <h3>👍👍👍</h3>
          </div>
          <p>😆 Get Efficient prompts in seconds...</p>
          <p>
            ✨ Describe the current state of <strong>Artificial Intelligence</strong>, including its key <strong>subfields, architectures, applications, and ethical considerations</strong>,
            and discuss potential future <strong>developments and impacts</strong> across various industries.
          </p>
        </div>
      </div>

    
    </div>
  )
}

export default Start
