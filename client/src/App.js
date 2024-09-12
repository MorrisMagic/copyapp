import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [datas, setData] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://copyapp-mazy.onrender.com/test")
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [datas]);

  function add() {
    if (text != "") {
      axios.post("https://copyapp-mazy.onrender.com/test", { link: text });
      axios.get("https://copyapp-mazy.onrender.com/delete");

      setText("");
    } else {
      alert("You're Link is empty");
    }
  }

  const copyToClipboard = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => alert("Code copied to clipboard!"))
      .catch((error) => console.error("Failed to copy text: ", error));
  };

  return (
    <div className="App">
      <div className="content">
        <h1>Link Manager</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="link-list">
            {datas.map((item) => (
              <div key={item._id} className="link-item">
                <p>{item.link}</p>
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard(item.link)}
                >
                  Copy Link
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="input-container">
          <input
            type="text"
            value={text}
            placeholder="Enter link..."
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={add} className="add-btn">
            Add Link
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
