import { useDispatch, useSelector } from 'react-redux'

import { loggout } from '../reducers/loggedUsersReducer'

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ loggedUser }) => loggedUser)
  return (
    <>
      {user.name} logged in
      <button
        style={{ margin: 5 }}
        onClick={() => {
          dispatch(loggout())
        }}
      >
        Logout
      </button>
    </>
  )
}

export default Login
