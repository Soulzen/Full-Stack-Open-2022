import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { toggleVisivility } from '../reducers/togglableReducer'

const Togglable = props => {
  const visible = useSelector(({ visible }) => visible)
  const dispatch = useDispatch()

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const handleVisible = () => {
    dispatch(toggleVisivility())
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={handleVisible}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={handleVisible}>cancel</button>
      </div>
    </div>
  )
}

Togglable.displayName = 'Toggable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
