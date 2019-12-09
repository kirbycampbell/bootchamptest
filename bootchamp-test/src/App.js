import MainRouter from './MainRouter'
import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Styles/formStyles.css'
import './Styles/cardStyle.css'

const App = () => {
  const auth = useSelector(state => state.UserStore.auth)
  const user = useSelector(state => state.UserStore.user)

  const dispatch = useDispatch()
  const loginUser = useCallback(
    user => dispatch({ type: 'LOGIN_USER', payload: user }),
    [dispatch]
  )

  useEffect(() => {
    if (!auth && localStorage.getItem('User')) {
      let userObj = JSON.parse(localStorage.getItem('User'))
      loginUser(userObj)
    }
  }, [])
  return <MainRouter user={user} auth={auth} />
}

export default App
