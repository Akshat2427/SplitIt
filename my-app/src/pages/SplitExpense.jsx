import React, { useState } from "react";
import "./SplitExpense.css";
import Instruct from "../components/instruct";

function FullSplitExpense() {
  const [cnt, setCnt] = useState(0);
  const [info, setInfo] = useState([]);
  const [data, setData] = useState([]);
  const [average, setAverage] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [report, setReport] = useState("First Calculate The Split");
  const [copySuccess, setCopySuccess] = useState("");

  function addInputs(e) {
    const count = parseInt(e.target.value) || 0;
    setCnt(count);
    setInfo(
      info
        .slice(0, count)
        .concat(
          new Array(Math.max(count - info.length, 0)).fill({
            name: "",
            amount: "",
            description: ""
          })
        )
    );
  }

  function deleteIndex(index) {
    const newInfo = [...info];
    newInfo.splice(index, 1);
    setInfo(newInfo);
    setCnt(cnt - 1);
    doMaths(newInfo);
  }

  function doMaths(updatedInfo = info) {
    for (let user of updatedInfo) {
      if (!user.name.trim()) {
        alert("All name fields must be filled.");
        return;
      }
    }

    let total = 0;
    let arr = [];
    let tempReport = "";
    updatedInfo.forEach((user, index) => {
      const amount = parseFloat(user.amount) || 0;
      total += amount;
      arr.push({ amt: amount, index });
    });

    const avg = total / updatedInfo.length;
    setAverage(avg);

    arr.sort((a, b) => a.amt - b.amt);

    let i = 0,
      j = arr.length - 1;
    let results = [];

    while (i < j) {
      const pending = avg - arr[i].amt;
      const want = arr[j].amt - avg;

      if (want > pending) {
        results.push(
          `${updatedInfo[arr[i].index].name} gives ${pending.toFixed(2)} to ${
            updatedInfo[arr[j].index].name
          } for ${updatedInfo[arr[j].index]?.description}`
        );

        arr[j].amt -= pending;
        i++;
      } else {
        if (want > 0)
          results.push(
            `${updatedInfo[arr[i].index].name} gives ${want.toFixed(2)} to ${
              updatedInfo[arr[j].index].name 
            } for ${updatedInfo[arr[j].index]?.description}`
          );
        arr[i].amt += want;
        j--;
      }
    }

    setData(results);
    setShowInstructions(false);
    setReport(results.join("\n"));
  }

  function copyToClipboard() {
    window.navigator.clipboard.writeText(report).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    });
  }

  return (
    <div className="container" style={{ marginTop: "20px", marginBottom: "20px" }}>
      <div className="input-section">
        <input
          type="text"
          style={{ width: "300px", marginBottom: "10px" }}
          className="modern-input"
          placeholder="Give name for the segment"
        />  
        <button className="CopyButton" onClick={copyToClipboard}>Copy Expense</button>
        {copySuccess && <span className="copy-success">{copySuccess}</span>}
        <br />
        <input
          type="number"
          value={cnt}
          onChange={(e) => addInputs(e)}
          placeholder="0"
          style={{ marginBottom: "20px" }}
          min="0"
          className="modern-input"
        />
        <button className="calculate-button" onClick={() => doMaths()}>
          Calculate
        </button>

        {Array.from({ length: cnt }).map((_, index) => (
          <div key={index} className="input-group">
            <input
              type="text"
              value={info[index]?.name || ""}
              onChange={(e) => {
                const newInfo = [...info];
                newInfo[index] = { ...newInfo[index], name: e.target.value };
                setInfo(newInfo);
              }}
              placeholder="Name"
            />
            <input
              type="text"
              value={info[index]?.amount || ""}
              onChange={(e) => {
                const newInfo = [...info];
                newInfo[index] = { ...newInfo[index], amount: e.target.value };
                setInfo(newInfo);
              }}
              placeholder="Amount"
            />
            <input
              type="text"
              value={info[index]?.description || ""}
              onChange={(e) => {
                const newInfo = [...info];
                newInfo[index] = { ...newInfo[index], description: e.target.value };
                setInfo(newInfo);
              }}
              placeholder="Info"
            />
            <button onClick={() => deleteIndex(index)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="results-section">
        {showInstructions ? (
          <Instruct/>
        ) : (
          <div className="results" style={{ position: "relative", top: "10px" }}>
            {average > 0 && <h2 className="in-future">Per Person Average is {average.toFixed(2)}</h2>}
            {data.map((e, index) => (
              <h1 className="in-future" style={{fontSize:"30px" , fontFamily:"sans-serif"}} key={index}>{e}</h1>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FullSplitExpense;