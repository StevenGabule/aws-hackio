import Link from 'next/link'
import React from 'react'
import { Logout, isAuth } from '../../helpers/auth'

const Nav = () => {
  return (
    <ul className='nav nav-tabs bg-warning'>
      <li className='nav-item'>
        <Link href='/'>
          <a className='nav-link text-dark'>Home</a>
        </Link>
      </li>
      {isAuth() ? (
        <>
          <li className='nav-item'>
              <a onClick={Logout} className='nav-link text-dark'>Logout</a>
          </li>
        </>
      ) : (
        <>
          <li className='nav-item'>
            <Link href='/login'>
              <a className='nav-link text-dark'>Login</a>
            </Link>
          </li>
          <li className='nav-item'>
            <Link href='register'>
              <a className='nav-link text-dark'>Register</a>
            </Link>
          </li>
        </>
      )}
    </ul>
  )
}

export default Nav