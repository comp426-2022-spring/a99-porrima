const goals_db = require('../database/database_health_goals')

async function getGoals(req, res) {
    let data = {
        user: req.query.username
    }
    try {
        const stmt = goals_db.prepare('SELECT * FROM user_health_goals WHERE username = ?').get(data.user)
        res.status(200).json(stmt)
    } catch(e) {
        console.error(e)
    }
}

async function addGoals(req, res) {
    let data = {
        user: req.body.username,
        mon: req.body.monday,
        tue: req.body.tuesday,
        wed: req.body.wednesday,
        thurs: req.body.thursday,
        fri: req.body.friday,
        sat: req.body.saturday,
        sun: req.body.sunday
    }
    try {
        const sqlInit = `INSERT INTO user_health_goals(username, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const stmt = goals_db.prepare(sqlInit);
        const info = stmt.run(Object.values(data));
        res.status(200).json(info);
    } catch(e) {
        console.error(e)
    }
}

async function updateGoal(req, res) {
    let data = {
        user: req.body.username,
        day: req.body.day,
        goal: req.body.goal
    }
    try {
        const stmt = goals_db.prepare(`UPDATE user_health_goals SET ${data.day} = COALESCE(?, ${data.day}) WHERE username = ?`)
        const info = stmt.run(data.goal, data.user)
        res.status(200).json(info)
    } catch(e) {
        console.error(e)
    }
    
}

async function deleteGoal(req, res) {
    let data = {
        user: req.body.username,
        day: req.body.day
    }
    try {
        const stmt = goals_db.prepare(`UPDATE user_health_goals SET ${data.day} = NULL WHERE username = ?`)
        const info = stmt.run(data.user)
        res.status(200).json(info)
    } catch(e) {
        console.error(e)
    }
}

module.exports = { getGoals, addGoals, updateGoal, deleteGoal };