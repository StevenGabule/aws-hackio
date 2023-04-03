import React, { useEffect } from 'react'
import { useState } from 'react'
import Layouts from '../components/layouts/Layouts';
import axios from 'axios'
import { isAuth } from '../helpers/auth';
import Router from 'next/router';

const USER = {
  name: '',
  email: '',
  password: '',
  confirm_password: '',
}

const ERROR = {
  status: false,
    message: ''
}

const SUCCESS = {
  status: false,
    message: ''
}

const RegisterPage = () => {
  const [user, setUser] = useState(USER)

  const [isLoading, setIsLoading] = useState(false);
  const [onError, setOnError] = useState(ERROR);
  const [onSuccess, setOnSuccess] = useState(SUCCESS);

  useEffect(() => {
    isAuth() && Router.push('/');
  }, [])


  const handleSubmit = async (e) => {
    setIsLoading(true)
    setOnError(ERROR)
    setOnError(SUCCESS)
    
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.SERVER_URL}/register`, user)
      setUser(USER)
      setOnSuccess(prev => ({...prev, status: true, message: res.data.message}))
      console.log();
    } catch (err) {
      // console.error(err.response.data.message);
      setOnError(prev => ({ ...prev, status: true, message: err.response.data.message }))
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  }

  return (
    <Layouts>
      <form onSubmit={handleSubmit}>
      
        {onError.status && <div className="alert alert-danger" role="alert">
          {onError.message}
        </div>}

        {onSuccess.status && <div className="alert alert-success" role="alert">
          {onSuccess.message}
        </div>}

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
          <button type='submit' className='btn btn-warning' disabled={isLoading}>{isLoading ? "Please wait..." : "Register"}</button>
        </div>
      </form>
    </Layouts>
  )
}

export default RegisterPage