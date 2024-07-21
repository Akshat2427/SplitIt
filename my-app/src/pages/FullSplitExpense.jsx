import React, { useState, useContext, useEffect } from "react";
import "./SplitExpense.css";
import Instruct from "../components/instruct";
import { FirebaseContext } from "../context/firebase";
import { useNavigate } from "react-router-dom";

function FullSplitExpense() {
  const navigate = useNavigate();
  const [cnt, setCnt] = useState(2);
  const [info, setInfo] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [showContent, setShowContent] = useState(false);
  const data = useContext(FirebaseContext);

  useEffect(() => {
    if (!data.loggedIn) {
      navigate("/");
      alert("Log in first");
    }
  }, [data.loggedIn, navigate]);

  function addInputs(e) {
    const count = parseInt(e.target.value) || 0;
    setCnt(count);
    setInfo(
      info
        .slice(0, count)
        .concat(
          new Array(Math.max(count - info.length, 0)).fill({
            name: "",
            email: "",
          })
        )
    );
  }

  function deleteIndex(index) {
    const newInfo = [...info];
    newInfo.splice(index, 1);
    setInfo(newInfo);
    setCnt(cnt - 1);
  }

  function handleCreateRoom() {
    data.addData(roomName, info, data?.user?.email);
    alert("Room created successfully");
    setRoomName("");
    setInfo([]);
    setCnt(2);
    setShowContent(false);
  }

  return (
    <>
      {data.loggedIn && (
        <div className="container" style={{ marginTop: "20px", marginBottom: "20px" }}>
          {!showContent && (
            <button className="calculate-button" onClick={() => setShowContent(true)}>
              Create New Room
            </button>
          )}
          <button className="calculate-button" onClick={() => navigate("/rooms")}>
            Go to Rooms
          </button>

          {showContent && (
            <div className="input-section" style={{ marginTop: "20px" }}>
              <input
                type="text"
                style={{ 
                  width: "300px", 
                  marginBottom: "10px", 
                  marginRight: "10px", 
                  padding: "10px", 
                  borderRadius: "5px", 
                  border: "1px solid #ccc" 
                }}
                className="modern-input"
                placeholder="Give name for the segment"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                required
              />
              <button className="calculate-button" onClick={() => setCnt((prev) => prev + 1)}>
                Add Users
              </button>
              <button
                className="calculate-button"
                onClick={handleCreateRoom}
                style={{ 
                  marginLeft: "10px", 
                  backgroundColor: "#3ea1f5", 
                  padding: "10px 20px", 
                  borderRadius: "5px", 
                  border: "none", 
                  cursor: "pointer" 
                }}
              >
                Create Room
              </button>
              {Array.from({ length: cnt }).map((_, index) => (
                <div key={index} className="input-group" style={{ marginTop: "10px" }}>
                  <input
                    type="text"
                    value={info[index]?.name || ""}
                    onChange={(e) => {
                      const newInfo = [...info];
                      newInfo[index] = { ...newInfo[index], name: e.target.value };
                      setInfo(newInfo);
                    }}
                    placeholder="Name"
                    style={{ 
                      padding: "10px", 
                      borderRadius: "5px", 
                      border: "1px solid #ccc", 
                      marginRight: "10px" 
                    }}
                  />
                  <input
                    type="email"
                    value={info[index]?.email || ""}
                    onChange={(e) => {
                      const newInfo = [...info];
                      newInfo[index] = { ...newInfo[index], email: e.target.value };
                      setInfo(newInfo);
                    }}
                    placeholder="Email"
                    style={{ 
                      padding: "10px", 
                      borderRadius: "5px", 
                      border: "1px solid #ccc", 
                      marginRight: "10px" 
                    }}
                  />
                  <button 
                    onClick={() => deleteIndex(index)} 
                    style={{ 
                      padding: "10px 20px", 
                      borderRadius: "5px", 
                      border: "none", 
                      backgroundColor: "#ff6347", 
                      color: "#fff", 
                      cursor: "pointer" 
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default FullSplitExpense;