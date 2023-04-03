import { withRouter } from 'next/router'
import { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import Layouts from '../../../components/layouts/Layouts'
import Link from 'next/link'


const ActivatePage = ({ router }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activateUser, setActivateUser] = useState({ name: '', token: '' })
  const [onSuccess, setOnSuccess] = useState({
    status: false,
    message: ''
  })

  const [onError, setOnError] = useState({
    status: false,
    message: ''
  })


  useEffect(() => {
    const activeAccount = async () => {
      setIsLoading(true);
      let token = router.query.id;

      // if (!token) {
      //   setIsLoading(false);
      //   setOnError({
      //     status: true,
      //     message: 'Unique token is not available.'
      //   })
      // }
      if (token) {
        try {
          const { name } = jwt.decode(token);
          setActivateUser(prev => ({ ...prev, name, token }));
          // active request
          const res = await axios.post(`${process.env.SERVER_URL}/activate`, { token });
          if (res.status === 201) {
            setOnSuccess({
              status: true,
              message: 'You successfully activated your account!'
            })
          }

        } catch (error) {
          console.log(error);
          setOnError({
            status: true,
            message: error.response?.data?.error
          })
        }
      }
    }
    activeAccount();
  }, [router])


  return (
    <Layouts>
      {onError.status === true ? (
        <>
          <h2>Hi, {activateUser?.name}</h2>
          <p>Oops..{onError.message}</p>
        </>
      ) : (
        <>
          <h2>Hi, {activateUser?.name}</h2>
          <p>Congratulations, you're account has been activated.</p>
          <Link href={'/login'}>
            <a>Go to Login</a>
          </Link>
        </>
      )}
    </Layouts>
  )
}

export default withRouter(ActivatePage)