import React, { useState, useEffect} from "react"
import './goals.css'


async function getGoals(username) {
    try {
        const url = "http://localhost:3000/app/healthgoals/?" + new URLSearchParams(username).toString();
        console.log(url);
        return fetch(url, {
            method: "GET",
        }).then((data) => data.json());
    } catch (e) {
        console.error(e);
    }
}

async function addGoal(userInfo) {
    try {
        const url = "http://localhost:3000/app/healthgoals/addgoal"
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo), 
        }).then((data) => data.json())
    } catch (e) {
        console.error(e);
    }
}

async function deleteGoal(userInfo) {
    try {
        const url = "http://localhost:3000/app/healthgoals/deletegoal"
        return fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo), 
        }).then((data) => data.json())
    } catch (e) {
        console.error(e);
    }
}

async function updateGoal(userInfo) {
    try {
        const url = "http://localhost:3000/app/healthgoals/updategoal"
        return fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo), 
        }).then((data) => data.json())
    } catch (e) {
        console.error(e);
    }
}

const goals = async (e) => {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    const data = JSON.parse(localStorage.getItem("token"));
    const username = data.user;
    const vals = await getGoals( {username} );
    try {
        for (var key in vals) {
            if (vals[key] != null) {
            
            console.log(`${key}: ${vals[key]}` );

            const r = document.createElement("div");
            r.setAttribute('class', 'grid-item')
            
            const p = document.createElement("p");
            const u = document.createElement("u");

            u.innerHTML = capitalizeFirstLetter(key);
            //p1.innerHTML = u;
            p.innerHTML = vals[key];
            r.append(u)
            r.append(p)
            document.getElementById("grid").append(r)
            };
        }
    } catch (e) {
        console.error(e);
    }
};

export default function HealthGoal() {
    const [day, setDay] = useState("");
    const [goal, setGoal] = useState("");

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    
    function handleDay(e) {
        e.preventDefault();
        setDay(e.target.value);
    }

    function handleGoal(e) {
        e.preventDefault();
        setGoal(e.target.value);
    }
    
    function handleHidden(id) {
        const doc = document.getElementById(id)
        if (doc.getAttribute("hidden") === "true") {
            doc.removeAttribute("hidden")
        } else {
            doc.setAttribute("hidden", true)
        }
    }

    const add = async => {
        const data = JSON.parse(localStorage.getItem("token"));
        const user = data.user;
        const userInfo = {
            username: user,
            day: day,
            goal: goal
        }
        addGoal(userInfo);
        document.getElementById("add_form").setAttribute("hidden", "true");
    }

    const del = async => {
        const data = JSON.parse(localStorage.getItem("token"));
        const user = data.user;
        const userInfo = {
            username: user,
            day: day
        }
        deleteGoal(userInfo);
        document.getElementById("delete_form").setAttribute("hidden", "true");
    }

    const update = async => {
        const data = JSON.parse(localStorage.getItem("token"));
        const user = data.user;
        const userInfo = {
            username: user,
            day: day,
            goal: goal
        }
        updateGoal(userInfo);
        document.getElementById("update_form").setAttribute("hidden", "true");
    }
    
    useEffect(() => {
        goals();
    }, []);

    return(
        <div className="goals-wrapper" id="goals">
            <div className="grid-container" id="grid">

            </div>
            <div className="buttons">
                <button onClick={function() {handleHidden("add_form")}}>Add goal</button>
                <button onClick={function() {handleHidden("delete_form")}}>Delete goal</button>
                <button onClick={function() {handleHidden("update_form")}}>Edit goal</button>
            </div>
            <div className="forms">
                <div id="add_form" hidden={true}>
                    <form onSubmit={add}>
                        <select id="day" onChange={handleDay}>
                            <option value="Pick a day">Pick a day</option>
                            {days.map((day) =>  ( 
                            <option value={day}>{day}</option>))}
                        </select>
                        <input type="text" id="goal" onChange={handleGoal}></input>
                        <button type="submit">Add goal</button>
                    </form>
                </div>
                <div id="delete_form" hidden={true}>
                    <form onSubmit={del}>
                        <select id="day" onChange={handleDay}>
                            <option value="Pick a day">Pick a day</option>
                            {days.map((day) =>  ( 
                            <option value={day}>{day}</option>))}
                        </select>
                        <button type="submit">Delete goal</button>
                    </form>
                </div>
                <div id="update_form" hidden={true}>
                    <form onSubmit={update}>
                        <select id="day" onChange={handleDay}>
                            <option value="Pick a day">Pick a day</option>
                            {days.map((day) =>  ( 
                            <option value={day}>{day}</option>))}
                        </select>
                        <input type="text" id="goal" onChange={handleGoal}></input>
                        <button type="submit">Update goal</button>
                    </form>
                </div>
            </div>
        </div>
    );
}