import { useState } from "react";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [platform, setPlatform] = useState("Instagram");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  // Store AI result
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [generatedHashtags, setGeneratedHashtags] = useState([]);

  const handleGenerate = async () => {
  try {
    setLoading(true);

    const response = await fetch("http://localhost:5000/api/captions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        topic,
        tone,
        platform
      })
    });

    const data = await response.json();

    console.log("AI Generated Caption:", data);

    setGeneratedCaption(data.caption);
    setGeneratedHashtags(data.hashtags);

  } catch (error) {
    console.error("Error generating caption:", error);
    alert("Failed to generate caption.");
  } finally {
    setLoading(false);
  }
};

  const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(
      `${generatedCaption}\n\n${generatedHashtags.join(" ")}`
    );

    alert("Caption copied successfully! 📋");
  } catch (error) {
    console.error("Failed to copy:", error);
  }
};

const handleLoadHistory = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/captions");

    const data = await response.json();

    console.log("Caption History:", data);

    setHistory(data);
  } catch (error) {
    console.error("Error loading history:", error);
  }
};
  return (
    <div className="app">
      <div className="container">

        <h1>CaptionMate ✨</h1>

        <p className="subtitle">
          AI-Powered Social Media Caption Generator
        </p>

        <div className="card">

          <div className="form-group">
            <label>What do you want to post about?</label>

            <textarea
              rows="5"
              placeholder="Example: Launching my new coffee shop..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Select Tone</label>

            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option>Professional</option>
              <option>Friendly</option>
              <option>Funny</option>
              <option>Inspirational</option>
              <option>Casual</option>
              <option>Creative</option>
            </select>
          </div>

          <div className="form-group">
            <label>Select Platform</label>

            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option>Instagram</option>
              <option>LinkedIn</option>
              <option>Facebook</option>
              <option>X (Twitter)</option>
            </select>
          </div>
          <br></br>
          <button onClick={handleGenerate} disabled={loading}>
         {loading ? "Generating... ✨" : "Generate Caption ✨"}
        </button>

        <button className="history-button" onClick={handleLoadHistory}>
        📚 View Saved Captions
        </button>

        </div>

        {/* AI Result */}
        {generatedCaption && (
          <div className="result-card">

            <h2>✨ Generated Caption</h2>

            <p className="caption">
              {generatedCaption}
            </p>

            <h3>Hashtags</h3>

            <div className="hashtags">
              {generatedHashtags.map((hashtag, index) => (
                <span key={index}>
                  {hashtag}
                </span>
              ))}
            </div>

            <button className="copy-button" onClick={handleCopy}>
             📋 Copy Caption
            </button>

          </div>
        )}

        {history.length > 0 && (
  <div className="history-section">

    <h2>📚 Saved Captions</h2>

    {history.map((item) => (
      <div className="history-card" key={item._id}>

        <h3>{item.topic}</h3>

        <p className="history-info">
          {item.tone} • {item.platform}
        </p>

        <p className="caption">
          {item.caption}
        </p>

        <div className="hashtags">
          {item.hashtags.map((hashtag, index) => (
            <span key={index}>
              {hashtag}
            </span>
          ))}
        </div>

      </div>
    ))}

  </div>
)}

      </div>
    </div>
  );
}

export default App;