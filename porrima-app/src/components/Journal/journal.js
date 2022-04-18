import React, { useEffect } from "react";
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

async function dEntry(username) {
  try {
    const url = "http://localhost:3000/app/delete/entry/";
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(username),
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
    for (var key in vals) {
      const n = document.createElement("tr")
      const d = document.createElement("td").innerHTML = vals[key]
      n.append(d)
      const e = document.createElement("td").innerHTML = vals[key]
      n.append(e)
      document.getElementById(key).append(n)
    }
  } catch (e) {
    console.error(e)
  }
};

export default function Journal() {

  useEffect(() => {
    console.log("hello")
  }, []);

  const deleteEntry = async (e) => {
    const data = JSON.parse(localStorage.getItem("token"));
    const username = data.user;
    await dEntry({ username });
    window.location.reload(false);
  };

  return (
    <div className="journal-wrapper">
      <h2>Health Journal</h2>
      <table>
        <tbody id="entryTable">
          <tr>
            <th>Date</th>
            <th>Entry</th>
          </tr>
          <tr>
            <td id="date" />
            <td id="entry" />
          </tr>
        </tbody>
      </table>
    </div>
  );
}
