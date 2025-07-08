import { useState } from 'react';
import axios from 'axios';
import './promptform.css';  
const backendUrl = import.meta.env.VITE_BACKEND
const apiKey = import.meta.env.VITE_API_SECRET

function formatMarkdown(text) { 
  text = text.replace(/^.*?:\s*/, '');

  return text
    .replace(/\((.*?)\)/g, '<strong><em>$1</em></strong>')  
    .replace(/["*]/g, ''); 
}

function copyFormatMarkdown(text) { 
  text = text.replace(/^.*?:\s*/, '');

  return text
    .replace(/["*]/g, '')               
    .replace(/\((.*?)\)/g, '"$1"');     
}


function PromptForm({theme}) {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('professional');
  const [result, setResult] = useState('Describe the current state of Artificial Intelligence, including its key subfields, architectures, applications, and ethical considerations, and discuss potential future developments and impacts across various industries.');
  const [aimodel, setAImodel] = useState('');
  const [loading, setLoading] = useState(false);
  const [enhancedPrompt, setEnhancedprompt] = useState([]);
  const [isCopied, setIsCopied] = useState(false); 


  

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(enhancedPrompt);
      setIsCopied(true);
      
      // Reset the "Copied!" message after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const res = await axios.post(`${backendUrl}/api/enhance`, {
        prompt,
        tone,
        aimodel
      }, {
  headers: {
    'x-api-key': apiKey
  }
  });
      setResult(res.data.enhancedPrompt);
      setEnhancedprompt(copyFormatMarkdown(res.data.enhancedPrompt))
    } catch (err) {
      setResult('Error enhancing prompt.');
    }

    setLoading(false);
  };


  return (
    <div>
    <div className={`form-container ${theme}`}>  
      
  <br /> 
      <h2 style={{textAlign: "center"}}>Try Promptify!✨</h2>
      <form onSubmit={handleSubmit}> 
        <textarea className="textinput-area"
          style={{ resize: 'none' }}
          rows={5}
          cols={60}
          placeholder="Enter your prompt... Ex: Tell me about AI"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        /> 
        <br />
        <br /> 
        Tone:<br />             
            {['Natural', 'Elegant', 'Inspirational', 'Empathetic', 'Poetic', 'Narrative', 'Humorous', 'Professional', 'friendly', 'Creative'].map(t => ( 
              <button
                key={t}
                className={`toneButton ${tone === t ? 'selected' : ''}`}
                type="button"
                onClick={() => setTone(t)}
              >
                {t}
              </button> 
            ))}  
        <br />
        <br /><br />
        <label htmlFor="aimodel">
          AI Model:&ensp;&ensp;
        </label>
        <input
          type="text"
          placeholder="AI Model"
          value={aimodel}
          id="aimodel"
          onChange={(e) => {
            setAImodel(e.target.value);
          }}
        />
        <br />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Enhancing...' : 'Enhance Prompt'}
        </button>
      </form>

      <div style={{ textAlign: 'center', justifyContent: 'center', display: 'flex' }}>
        {result && (
          <div style={{ marginTop: '1rem', textAlign: 'left', maxWidth: '600px' }}>
            <h3  style={{ textAlign: 'center' }}>Enhanced Prompt:</h3>
            {formatMarkdown(result)
              .split('\n\n')
              .map((paragraph, index) => (
                <p className="user-select-none" key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
              <div style={{textAlign: "center"}}>
              <button 
        onClick={handleCopy} 
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button></div>
          </div>
        )}
      </div><br></br>
      
    </div>
    
 
    </div>
  );
}

export default PromptForm;
