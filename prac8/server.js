// import express from 'express';


// const PORT = process.env.PORT || 5000;
// const app = express();
// // app.use(express.json());




// app.get('/', (req, res) => { res.send('Imagify API Server is Working fine'); });



// app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`);});
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Serve static files from public
app.use(express.static(path.join(__dirname, "public")));

// Serve HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
