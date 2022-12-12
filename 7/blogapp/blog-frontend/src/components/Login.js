import { useDispatch, useSelector } from 'react-redux'

import { loggout } from '../reducers/loggedUsersReducer'

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ loggedUser }) => loggedUser)
  return (
    <div>
      {user.name} logged in
      <button
        onClick={() => {
          dispatch(loggout())
        }}
      >
        Logout
      </button>
    </div>
  )
}

export default Login
