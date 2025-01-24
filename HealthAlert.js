import React, { useState } from 'react';
import axios from 'axios';

function HealthAlert() {
    const [data, setData] = useState({ heart_rate: '', blood_pressure: '', cholesterol: '', exercise_duration: '', smoking_status: '' });
    const [alert, setAlert] = useState('');

    // Handle form input changes
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/predict', data);
            setAlert(response.data.alert);
        } catch (error) {
            console.error('Error fetching prediction', error);
        }
    };

    return (
        <div>
            <h1>Health Alert Prediction</h1>
            <input type="number" name="heart_rate" placeholder="Heart Rate" onChange={handleChange} />
            <input type="number" name="blood_pressure" placeholder="Blood Pressure" onChange={handleChange} />
            <input type="number" name="cholesterol" placeholder="Cholesterol" onChange={handleChange} />
            <input type="number" name="exercise_duration" placeholder="Exercise Duration (min)" onChange={handleChange} />
            <input type="number" name="smoking_status" placeholder="Smoking Status (0=No, 1=Yes)" onChange={handleChange} />
            <button onClick={handleSubmit}>Submit</button>

            {alert && <p>{alert}</p>}
        </div>
    );
}

export default HealthAlert;
