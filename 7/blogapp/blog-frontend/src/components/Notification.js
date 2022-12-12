const Notification = ({ message }) => {
  const NotificationStyle = {
    color: message.isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message.content === null) {
    return null
  }

  return (
    <div className="error" style={NotificationStyle}>
      {message.content}
    </div>
  )
}

export default Notification
