
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.static('public'));
app.use(express.json());

app.get('/api/data', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read data' });
    res.json(JSON.parse(data || '{}'));
  });
});

app.post('/api/save', (req, res) => {
  const { id, name, status } = req.body;
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    let jsonData = {};
    if (!err && data) jsonData = JSON.parse(data);

    jsonData[id] = { name, status };

    fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Failed to write data' });
      res.json({ message: 'Saved' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
