import { useState } from 'react';
import './App.css'; 

const Translator = () => {
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');
  const [source, setSource] = useState('en');
  const [target, setTarget] = useState('hi');

  const handleTranslate = async () => {
    const res = await fetch('https://a87fj6fltf.execute-api.ap-south-1.amazonaws.com/prod/Translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        source_lang: source,
        target_lang: target
      })
    });

    const data = await res.json();
    setTranslated(data.translated_text);
  };

  return (
    <div className="translator-container">
      <h2>🌐 Language Translator (AWS Powered)</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text..."
        rows="4"
      />

      <div className="select-row">
        <div>
          <label>From:</label>
          <select value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
            <option value="fr">French</option>
            <option value="ta">Tamil</option>
            <option value="gu">Gujrati</option>
          </select>
        </div>

        <div>
          <label>To:</label>
          <select value={target} onChange={(e) => setTarget(e.target.value)}>
            <option value="hi">Hindi</option>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="mr">Marathi</option>
            <option value="ta">Tamil</option>
            <option value="gu">Gujarati</option>
            <option value="de">Gremon</option>
          </select>
        </div>
      </div>

      <button className="translate-btn" onClick={handleTranslate}>Translate</button>

      <div className="output-box">
        <strong>Translated Text:</strong>
        <p>{translated}</p>
      </div>
    </div>
  );
};

export default Translator;
