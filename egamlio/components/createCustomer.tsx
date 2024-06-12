import React, { useState } from 'react';
import styles from '../styles/CreateCustomer.module.css';
import axios from 'axios';

const CreateCustomer: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    other_names: '',
    gender: '',
    mobile_number: '',
    email: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://stemprotocol.codefremics.com/api/v2/customers/create', formData);
      console.log('Customer created successfully:', response.data);
      // Reset form data after successful submission
      setFormData({
        first_name: '',
        other_names: '',
        gender: '',
        mobile_number: '',
        email: '',
        description: ''
      });
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Create New Customer</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>
        <div className={styles.formField}>
          <input
            type="text"
            name="other_names"
            value={formData.other_names}
            onChange={handleChange}
            placeholder="Other Names"
          />
        </div>
        <div className={styles.formField}>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender"
          />
        </div>
        <div className={styles.formField}>
          <input
            type="text"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            placeholder="Mobile Number"
          />
        </div>
        <div className={styles.formField}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div className={styles.formField}>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </div>
        <div className={styles.formField}>
          <button type="submit">Submit</button> {/* Ensure the button triggers form submission */}
        </div>
      </form>
    </div>
  );
};

export default CreateCustomer;
