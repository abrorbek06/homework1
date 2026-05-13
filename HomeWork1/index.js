const express = require("express");
const app = express();

app.use(express.json());

let users = [
    { id: 1, name: "Abrorbek", role: "backend" },
    { id: 2, name: "Ali", role: "frontend" }
];


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.get("/users", (req, res) => {
    const { role } = req.query;

    let filteredUsers = [];

    if (role) {
        for (let i = 0; i < users.length; i++) {
            let user = users[i];

            if (user.role.toLowerCase() === role.toLowerCase()){
                filteredUsers.push(user);
            }
        }
    }

    res.json(filteredUsers);
});

app.post("/users", (req, res) => {

    console.log("BODY:", req.body);

    const { name, role } = req.body;

    if (typeof name !== "string" || typeof role !== "string") {
        return res.status(400).json({ error: "Invalid data type" });
    }


    const newUser = {
        id: users.length + 1,
        name,
        role
    };

    users.push(newUser);

    res.json(newUser);
});

app.get("/slow", async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    res.json({
        message: "Finished after 2 seconds"
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});