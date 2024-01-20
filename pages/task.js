import React, { useState } from 'react';

const Task = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:5000/api/formdata', {
            method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Form Submission</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <br />
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <br />
        <label>Message:</label>
        <textarea name="message" value={formData.message} onChange={handleChange} required />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Task;
