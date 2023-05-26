import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Newsletter = () => {
  const [status, setStatus] = React.useState(null);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/newsletter', data);
      setStatus(response.data.message);
    } catch (error) {
      setStatus('An error occurred, please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" ref={register({ required: true })} />
        {errors.email && <span>This field is required</span>}
        <button type="submit">Subscribe</button>
      </form>
      {status && <p>{status}</p>}
    </div>
    );
};