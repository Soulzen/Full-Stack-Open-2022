import { Button, Container } from '@mui/material'
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
    <Container
      maxWidth="sm"
      /* sx={
        {
          border: 'solid 5px black',
          backgroundColor: '#F5F5F5',
          boxShadow:
          '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        }
      } */
    >
      <div style={hideWhenVisible}>
        <Button
          variant="contained"
          sx={{ width: '90%', marginLeft: '5%' }}
          onClick={handleVisible}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          sx={{ margin: '10px' }}
          variant="outlined"
          onClick={handleVisible}
        >
          cancel
        </Button>
      </div>
    </Container>
  )
}

Togglable.displayName = 'Toggable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
