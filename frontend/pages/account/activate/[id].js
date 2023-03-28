import { withRouter } from 'next/router'
import { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import axios from 'axios'


const ActivatePage = ({router}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activateUser, setActivateUser] = useState({name: '', token: ''})
  const [onSuccess, setOnSuccess] = useState({
    status: false,
    message: ''
  })

  const [oError, setOError] = useState({
    status: false,
    message: ''
  })


  useEffect(() => {
    const activeAccount = async() => {
      setIsLoading(true);
      let token = router.query.id;
      if (token) {
        try {
          const { name } = jwt.decode(token);
          setActivateUser(prev => ({ ...prev, name, token }));
          console.log(name);
          // active request
          const res = await axios.post(`${process.env.SERVER_URL}/activate`, {token});
          console.log(res);

        } catch (error) {
          console.log(error);
          setOError({
            status: true,
            message: error.message
          })
        }
      }
    }
    activeAccount();
  }, [router])
  

  return (
    <div>{JSON.stringify(router)}</div>
  )
}

export default withRouter(ActivatePage)