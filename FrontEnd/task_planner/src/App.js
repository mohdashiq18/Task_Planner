import logo from "./logo.svg";
import "./App.css";
import { GoPlus } from "react-icons/go";
import { useState } from "react";
function App() {
  const [bug,setBug]=useState(false)
  const [feature,setFeature]=useState(false)
  const [story,setStory]=useState(false)
  return (
    <div className="App">
      <h1>Task-Planner</h1>
      <div className="sprintDiv">
        <div>
          <div className="sprint">
          <h2>Bug</h2>
          <button><GoPlus onClick={()=>setBug(!bug)} className="GoPlus"/></button>
          </div>
          <hr className={bug ? "show" :"hide"}></hr>
          <div className={bug ? "show" :"hide"}>
            <h1>hello my name is ashiq</h1>
        </div>
        
          </div>
        <div>
          <div className="sprint">
          <h2>Feature</h2>
          <button><GoPlus onClick={()=>setFeature(!feature)} className="GoPlus"/></button>
          </div>
          <hr className={feature ? "show" :"hide"}></hr>
          <div className={feature ? "show" :"hide"}>
            <h1>hello my name is ashiq</h1>
        </div>
        
        </div>
        <div>
          <div className="sprint">
          <h2>Story</h2>
          <button><GoPlus className="GoPlus"/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
