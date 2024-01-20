const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const MONGODB_URI = 'mongodb+srv://sahil:sahil%4012@cluster0.10ngxdy.mongodb.net/notesapp';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

const noteSchema = new mongoose.Schema({
  name: String, // Update schema to match form fields
  email: String,
  message: String,
}, { collection: 'notecollection' });

const NoteModel = mongoose.model('Note', noteSchema);

app.use(bodyParser.json());
app.use(cors());

app.post('/api/formdata', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required for form submission' });
    }

    const newNote = new NoteModel({ name, email, message });
    await newNote.save();

    console.log('Form data saved successfully:', newNote);

    res.status(200).json({ message: 'Form data saved successfully', note: newNote });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
