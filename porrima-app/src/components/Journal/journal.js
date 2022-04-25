import React, { useEffect, useState } from "react";
import "./journal.css";

async function getEntries(username) {
  try {
    const url = "http://localhost:3000/app/user/entries/";
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(username),
    }).then((data) => data.json());
  } catch (e) {
    console.error(e);
  }
}

async function dEntry(userInfo) {
  try {
    const url = "http://localhost:3000/app/delete/entry/";
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    }).then((data) => data.json());
  } catch (e) {
    console.error(e);
  }
}

async function aEntry(userInfo) {
  try {
    const url = "http://localhost:3000/app/new/entry/";
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    }).then((data) => data.json());
  } catch (e) {
    console.error(e);
  }
}

async function uEntry(userInfo) {
  try {
    const url = "http://localhost:3000/app/update/entry/";
    return fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    }).then((data) => data.json());
  } catch (e) {
    console.error(e);
  }
}

const entries = async (e) => {
  const data = JSON.parse(localStorage.getItem("token"));
  const username = data.user;
  const vals = await getEntries({ username });
  try {
    for (let i = 0; i < Object.keys(vals).length; i++) {
      let obj = vals[i];
      const n = document.createElement("div")
      n.classList.add("log")
      const h = document.createElement("div")
      h.innerHTML = obj["date"]
      h.classList.add("text")
      const e = document.createElement("div")
      e.innerHTML = obj["entry"]
      e.classList.add("log")
      h.append(e)
      n.append(h)
      const b = document.createElement("button")
      b.setAttribute("onClick", dEntry)
      n.append(b)
      document.getElementById("logs").append(n)
    }
  } catch (e) {
    console.error(e);
  }
};

function formatDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(0), // get only two digits
    month = datePart[1],
    day = datePart[2];

  return day + "-" + month + "-" + year;
}

export default function Journal() {
  const [d, setDate] = useState();
  const deleteEntry = async (e) => {
    const data = JSON.parse(localStorage.getItem("token"));
    const username = data.user;
    const date = formatDate(d);
    const userInfo = {
      username,
      date,
    };
    await dEntry(userInfo);
    window.location.reload(false);
  };

  const [entry, setEntry] = useState();
  const addEntry = (async) => {
    const data = JSON.parse(localStorage.getItem("token"));
    const username = data.user;
    const userInfo = {
      entry,
      username,
    };
    aEntry(userInfo);
    //window.location.reload(false);
  };

  const updateEntry = (async) => {
    const data = JSON.parse(localStorage.getItem("token"));
    const username = data.user;
    const date = formatDate(d);
    const userInfo = {
      username,
      entry,
      date,
    };
    uEntry(userInfo);
    window.location.reload(false);
  };

  useEffect(() => {
    entries();
  }, []);
  /*
  return (
    <div className="journal-wrapper">
      <div className="grid-container">
        <div className="delete-button">
          <form onSubmit={deleteEntry}>
            <div className="form-group">
              <input type="date" onChange={(e) => setDate(e.target.value)} />
            </div>
            <button type="submit">Delete entry</button>
          </form>
        </div>
        <div className="add-button">
          <form onSubmit={addEntry}>
            <div className="form-group">
              <input type="text" onChange={(e) => setEntry(e.target.value)} />
            </div>
            <button type="submit">Add entry</button>
          </form>
        </div>
        <div className="update-button">
          <form onSubmit={updateEntry}>
            <div className="form-group">
              <input type="date" onChange={(e) => setDate(e.target.value)} />
              <input type="text" onChange={(e) => setEntry(e.target.value)} />
            </div>
            <button type="submit">Change entry</button>
          </form>
        </div>
      </div>
      <div className="clear-fix"></div>
      <table className="entry-table" id="entryTable">
        <tbody>
          <td id="date" />
          <td id="entry" />
        </tbody>
      </table>
    </div>
  );
  */
  return (
    <div className="journal_content">
      <div className="journal_header">
        <h1>Welcome</h1>
        <form id="entries" onSubmit={addEntry}>
          <input
            type="text"
            id="new-entry"
            placeholder="How are you doing today?"
            onChange={(e) => setEntry(e.target.value)}
          />
          <input type="submit" id="new-log-submit" value="Enter Log" />
        </form>
      </div>
      <div className="journal_main">
        <section className="logs-list">
          <h2>Logs</h2>
          <div id="logs">
            <div className="log">
              <div id="content" className="content">
                <input
                  type="text"
                  class="text"
                  readOnly
                />
              </div>
              <div className="actions">
                <input type="text" placeholder="Change entry" onChange={(e) => setEntry(e.target.value)} />
                <input type="date" onChange={(e) => setDate(e.target.value)} />
                <button className="edit" onClick={updateEntry}>
                  Edit
                </button>
                <button className="delete" onClick={deleteEntry}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
