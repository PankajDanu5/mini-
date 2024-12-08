const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Enable CORS for cross-origin requests (if your frontend is on a different domain)
app.use(cors());

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.use(express.static("static"));
// Define routes to render views
app.get('/', (req, res) => {
  res.render('index');
});

// Define routes to render views
app.get('/home', (req, res) => {
  res.render('home');
});

// Define routes to render views
app.get('/about', (req, res) => {
  res.render('about');
});

// Define routes to render views
app.get('/contact', (req, res) => {
  res.render('contact');
});

// Define routes to render views
app.get('/dashboard', (req, res) => {
  res.render('dsahboard');
});
// Serve static files (optional, e.g., uploaded files)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    const uniqueName = `{Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // Save file with a unique name
  },
});

const upload = multer({ storage });

// File upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.status(200).json({
    message: "File uploaded successfully",
    fileName: req.file.filename,
    filePath: `/uploads/${req.file.filename}`,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});