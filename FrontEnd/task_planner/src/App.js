import logo from "./logo.svg";
import "./App.css";
import { GoPlus } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useState } from "react";
import axios from "axios";
import { GrEdit, GrUpdate } from "react-icons/gr";
function App() {
  const [bug, setBug] = useState(false);
  const [feature, setFeature] = useState(false);
  const [story, setStory] = useState(false);
  const [assigned, setAssigned] = useState(false);
  const [user, setUser] = useState("");
  const [bugDetails, setBugDetails] = useState("");
  const [data, setData] = useState("");
  const [cheak, setCheak] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8000/get")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [bug, cheak,id]);
  const AddBug = () => {
    const payload = {
      task: "Bug",
      title: bugDetails,
      assigned: user || " ",
      status: false,
    };
    if (bugDetails !== "") {
      axios
        .post("http://localhost:8000/post", payload)
        .then((res) => {
          setBug(!bug);
          setBugDetails("");
          setAssigned("");
        })
        .catch((err) => console.log(err));
    } else {
      alert("Please fill Bug Details");
    }
  };
  const assignUpdate = (id) => {
    axios
      .patch(`http://localhost:8000/update/${id}`, { assigned: assigned })
      .then((res) => {setId("")
      setAssigned("")})
      .catch((err) => console.log(err));
  };
  const statusUpdate = (id, data) => {
    axios
      .patch(`http://localhost:8000/update/${id}`, { status: !data })
      .then((res) => setCheak(!cheak))
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      {id && (
        <div className="popup">
          <div>
            <input
              type="text"
              placeholder="Enter Assigned user"
              value={assigned}
              onChange={(e) => setAssigned(e.target.value)}
            />
            <button onClick={()=>assignUpdate(id)}>update</button>
            <button onClick={() => setId("")}>cancel</button>
          </div>
        </div>
      )}

      <h1>Task-Planner</h1>
      <div className="sprintDiv">
        <div className="bug">
          <div>
            <div className="sprint">
              <h2>Bug</h2>
              <button className="button">
                <GoPlus onClick={() => setBug(!bug)} className="GoPlus" />
              </button>
            </div>
            <hr className={bug ? "show" : "hide"} id="hr"></hr>
            <div className={bug ? "show" : "hide"}>
              <textarea
                value={bugDetails}
                placeholder="Enter Bug Details"
                onChange={(e) => setBugDetails(e.target.value)}
              />
              <div className={assigned ? "user" : "hide"}>
                <input
                  type="text"
                  placeholder="Enter Assigned User"
                  onChange={(e) => setUser(e.target.value)}
                />
                <button onClick={() => setAssigned(false)}>Save</button>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <button className="Add" onClick={AddBug}>
                    Add-Task
                  </button>
                  <button className="button1">
                    <RxCross1
                      onClick={() => setBug(false)}
                      className="RxCross1"
                    />
                  </button>
                </div>
                <div style={{ display: "flex" }}>
                  {assigned ? "" : user}
                  <button
                    className="Assigned"
                    onClick={() => setAssigned(true)}
                  >
                    Assigned
                  </button>
                </div>
              </div>
            </div>
          </div>

          {data &&
            data.map((item) => (
              <div id="taskdiv">
                <b>Bug Tittle</b>: {item.title}
                <div>
                  <p>
                    <b>Assigned</b>: {item.assigned}
                  </p>{" "}
                  <button onClick={() => setId(item._id)}>
                    <GrEdit />
                  </button>
                </div>
                <div>
                  <p>
                    <b>Status</b>:{" "}
                    <span id={item.status && "span"}>
                      {item.status ? "Completed" : "Pending"}
                    </span>
                  </p>
                  <button onClick={() => statusUpdate(item._id, item.status)}>
                    <GrUpdate />
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div className="bug">
          <div>
            <div className="sprint">
              <h2>Feature</h2>
              <button className="button">
                <GoPlus
                  onClick={() => setFeature(!feature)}
                  className="GoPlus"
                />
              </button>
            </div>
            <hr className={feature ? "show" : "hide"} id="hr"></hr>
            <div className={feature ? "show" : "hide"}>
              <h3>Create-Task</h3>
              <textarea />
              <button>Add-Task</button>
            </div>
          </div>
        </div>

        <div className="bug">
          <div>
            <div className="sprint">
              <h2>Story</h2>
              <button className="button">
                <GoPlus onClick={() => setStory(!story)} className="GoPlus" />
              </button>
            </div>
            <hr className={story ? "show" : "hide"} id="hr"></hr>
            <div className={story ? "show" : "hide"}>
              <h3>Create-Task</h3>
              <textarea />
              <button>Add-Task</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
