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
  const [assigned, setAssigned] = useState("");
  const [user, setUser] = useState("");
  const [bugDetails, setBugDetails] = useState("");
  const [featureDetails, setFeatureDetails] = useState("");
  const [storyDetail, setStoryDetails] = useState("");
  const [data, setData] = useState("");
  const [cheak, setCheak] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    axios
      .get("https://thankful-pumps-eel.cyclic.app/get")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [bug, cheak, id, feature, story]);

  const AddStory = () => {
    const payload = {
      task: "Story",
      title: storyDetail,
      assigned: user || " ",
      status: false,
    };
    if (storyDetail !== "") {
      axios
        .post("https://thankful-pumps-eel.cyclic.app/post", payload)
        .then((res) => {
          setStory(!story);
          setFeatureDetails("");
          setUser("");
          setAssigned("");
        })
        .catch((err) => console.log(err));
    } else {
      alert("Please fill Story Details");
    }
  };

  const AddFeature = () => {
    const payload = {
      task: "Feature",
      title: featureDetails,
      assigned: user || " ",
      status: false,
    };
    if (featureDetails !== "") {
      axios
        .post("https://thankful-pumps-eel.cyclic.app/post", payload)
        .then((res) => {
          setFeature(!feature);
          setFeatureDetails("");
          setUser("");
          setAssigned("");
        })
        .catch((err) => console.log(err));
    } else {
      alert("Please fill Feature Details");
    }
  };
  const AddBug = () => {
    const payload = {
      task: "Bug",
      title: bugDetails,
      assigned: user || " ",
      status: false,
    };
    if (bugDetails !== "") {
      axios
        .post("https://thankful-pumps-eel.cyclic.app/post", payload)
        .then((res) => {
          setBug(!bug);
          setBugDetails("");
          setAssigned("");
          setUser("");
        })
        .catch((err) => console.log(err));
    } else {
      alert("Please fill Bug Details");
    }
  };
  const assignUpdate = (id) => {
    axios
      .patch(`https://thankful-pumps-eel.cyclic.app/update/${id}`, {
        assigned: assigned,
      })
      .then((res) => {
        setId("");
        setAssigned("");
      })
      .catch((err) => console.log(err));
  };
  const statusUpdate = (id, data) => {
    axios
      .patch(`https://thankful-pumps-eel.cyclic.app/update/${id}`, {
        status: !data,
      })
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
            <button onClick={() => assignUpdate(id)}>update</button>
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
                  value={user}
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
                      onClick={() => {
                        setUser("");
                        setBug(false);
                      }}
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
          {/* hear you can add your task in Bug */}
          {data &&
            data.map((item) =>
              item.task == "Bug" ? (
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
              ) : (
                ""
              )
            )}
        </div>

        {/* this is feature sprint */}
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
              <textarea
                value={featureDetails}
                placeholder="Enter Features Details"
                onChange={(e) => setFeatureDetails(e.target.value)}
              />
              <div className={assigned ? "user" : "hide"}>
                <input
                  type="text"
                  value={user}
                  placeholder="Enter Assigned User"
                  onChange={(e) => setUser(e.target.value)}
                />
                <button onClick={() => setAssigned(false)}>Save</button>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <button className="Add" onClick={AddFeature}>
                    Add-Task
                  </button>
                  <button className="button1">
                    <RxCross1
                      onClick={() => {
                        setFeature(false);
                        setUser("");
                      }}
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

          {/* hear you can add your task in feature */}
          {data &&
            data.map((item) =>
              item.task == "Feature" ? (
                <div id="taskdiv">
                  <b>Feature Tittle</b>: {item.title}
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
              ) : (
                ""
              )
            )}
        </div>

        {/* this is Story sprint */}
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
              <textarea
                value={storyDetail}
                placeholder="Enter Story Details"
                onChange={(e) => setStoryDetails(e.target.value)}
              />
              <div className={assigned ? "user" : "hide"}>
                <input
                  type="text"
                  value={user}
                  placeholder="Enter Assigned User"
                  onChange={(e) => setUser(e.target.value)}
                />
                <button onClick={() => setAssigned(false)}>Save</button>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <button className="Add" onClick={AddStory}>
                    Add-Task
                  </button>
                  <button className="button1">
                    <RxCross1
                      onClick={() => {
                        setStory(false);
                        setUser("");
                      }}
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
          {/* hear you can add your task in story */}
          {data &&
            data.map((item) =>
              item.task == "Story" ? (
                <div id="taskdiv">
                  <b>Story Tittle</b>: {item.title}
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
              ) : (
                ""
              )
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
