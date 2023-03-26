import React from 'react'
import { useState } from 'react'
import Layouts from '../components/layouts/Layouts';
import axios from 'axios'

const RegisterPage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  })

  const [isLoading, setIsLoading] = useState(false);
  const [onError, setOnError] = useState(null);
  const [onSuccess, setOnSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8003/api/register', user)
      console.log(res.data);
    } catch (err) {
      console.error(err.message);
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  }

  return (
    <Layouts>
      <form onSubmit={handleSubmit}>
        {JSON.stringify(user)}
        <div className='form-group'>
          <input type={'text'} value={user.name} name='name' onChange={handleChange} required className='form-control' placeholder='Enter name' />
        </div>
        <div className='form-group'>
          <input type={'email'} value={user.email} name='email' onChange={handleChange} required className='form-control' placeholder='Enter email' />
        </div>
        <div className='form-group'>
          <input type={'password'} value={user.password} name='password' onChange={handleChange} className='form-control' placeholder='Enter Password' />
        </div>
        <div className='form-group'>
          <input type={'password'} value={user.confirm_password} name='confirm_password' onChange={handleChange} className='form-control' placeholder='Confirm Password' />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-warning'>Register</button>
        </div>
      </form>
    </Layouts>
  )
}

export default RegisterPage