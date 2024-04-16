import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [code, setCode] = useState(`package main

import "fmt"
    
func main() {
    fmt.Println("Hello World!")
}
`);
  const [format, setFormat] = useState("go");
  const [result, setResult] = useState<string>("");
  const buttonHandler = () => {
    axios
      .post("http://localhost:5050/runGo", { code: code, format: format })
      .then((result) => {
        console.log(result);
        setResult(result.data as unknown as string);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="App flex flex-col mt-5">
      <div className="mb-3">
        <select
          value={format}
          name="language_format"
          id="language_format"
          className="bg-[#00203FFF] text-[#ADEFD1FF]"
          onChange={(e) => setFormat(e.target.value)}
        >
          <option value="go">Go</option>
          <option value="" disabled>
            More Coming Soon..
          </option>
        </select>
      </div>
      <div className="mt-3">
        <textarea
          spellCheck={false}
          name="code"
          id="code"
          cols={60}
          rows={10}
          className="border-2 border-black text-[#ADEFD1FF] bg-[#00203FFF]"
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>
      </div>
      <div>
        <button
          className="bg-[#00203FFF] text-[#ADEFD1FF] px-2 py-0.5 rounded-md"
          onClick={buttonHandler}
        >
          Compile
        </button>
      </div>
      {result && <div className="mt-3">{result}</div>}
    </div>
  );
}

export default App;
