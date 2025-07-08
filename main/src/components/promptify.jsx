import { useEffect } from "react";
import './promptstyle.css';

function Promptify({ theme }) {
  useEffect(() => {
    document.body.className = theme; 
  }, [theme]);

  return (
    <div className={`promptify-container ${theme}`}>
      {/* First Section */}
      <div className="promptify-section">
        <div className="promptify-text">
          <h2>What's Promptify?</h2>
          <p className="promptify-paragraph">
            <i>Prompt engineering</i> is basically the knack for talking to AI so it actually gives you the good stuff you're looking for.
            It's not just about typing in a question; it's like figuring out the right way to phrase things to get the AI to understand what you really want.
            Think of it as giving the AI clear directions and maybe even a few examples so it doesn't get confused.<br />
            But hey, no sweat if that sounds like a hassle! That's where <b>Promptify!</b> comes in — it's like having a cheat code for talking to AI.
            It takes care of all that prompt-crafting stuff for you, so you can just chill and get the answers you need without the headache.
          </p>
        </div>
        <div className="promptify-image-container">
          <img src="/images/what.png" alt="Promptify AI illustration" className="promptify-image" />
        </div>
      </div>

      {/* Second Section */}
      <div className="promptify-section">
        <div className="promptify-image-container">
          <img src="/images/promptify.png" alt="Promptify AI Illustration" className="promptify-image" />
        </div>
        <div className="promptify-text">
          <h2>Why Promptify? What's the perk?</h2>
          <p className="promptify-paragraph">
            <b>Promptify!</b> offers several key advantages in optimizing interactions with AI models.
            Firstly, it significantly <b>improves the accuracy</b> of AI responses by ensuring prompts
            are clear, concise, and directly address the desired information. This enhanced precision also leads
            to <b>greater efficiency</b>, reducing the back-and-forth often required to refine queries
            and obtain satisfactory results. Furthermore, <b>Promptify!</b> can <b>unlock the advanced capabilities</b>
            of AI by enabling users to construct prompts that effectively tap into more complex reasoning and
            generation functionalities. The resulting <b>increased clarity</b> in communication ensures
            that AI models better understand the user's intent, ultimately leading to <b>improved productivity</b>
            and the ability to <b>maximize AI's full potential</b> for a wide range of tasks.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Promptify;

