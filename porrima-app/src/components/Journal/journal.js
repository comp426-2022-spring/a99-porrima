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

// async function uEntry(userInfo) {
//   try {
//     const url = "http://localhost:3000/app/update/entry/";
//     return fetch(url, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userInfo),
//     }).then((data) => data.json());
//   } catch (e) {
//     console.error(e);
//   }
// }

export default function Journal() {
  const deleteEntry = async (e) => {
    const data = JSON.parse(localStorage.getItem("token"));
    const date = document.activeElement.getAttribute("id")
    const username = data.user;
    const userInfo = {
      username,
      date,
    };
    await dEntry(userInfo);
    window.location.reload(false);
  };

const entries = async (e) => {
  const data = JSON.parse(localStorage.getItem("token"));
  const username = data.user;
  const vals = await getEntries({ username });
  try {
    for (let i = 0; i < Object.keys(vals).length; i++) {
      const obj = vals[i]
      
      const log = document.createElement("div")
      log.classList.add("log")
      
      const content = document.createElement("div")
      content.classList.add("content")

      const date = document.createElement("h3")
      date.classList.add("text")
      date.innerHTML = obj["date"]

      const entry = document.createElement("div")
      entry.classList.add("text")
      entry.innerHTML = obj["entry"]

      content.appendChild(date)
      content.appendChild(entry)
      
      const actions = document.createElement("div")
      actions.classList.add("actions")
      
      const del = document.createElement("button")
      del.setAttribute("id", obj["date"])
      del.onclick = deleteEntry;
      del.innerHTML = "Delete"
      del.classList.add("delete")
      
      actions.appendChild(del)
      content.appendChild(actions)
      log.appendChild(content)
      
      document.getElementById("logs").appendChild(log)
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

  // const updateEntry = (async) => {
  //   const data = JSON.parse(localStorage.getItem("token"));
  //   const username = data.user;
  //   const date = formatDate(d);
  //   const userInfo = {
  //     username,
  //     entry,
  //     date,
  //   };
  //   uEntry(userInfo);
  //   window.location.reload(false);
  // };

  useEffect(() => {
    entries();
  }, []);

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
          </div>
        </section>
      </div>
    </div>
  );
}
