import { connect } from "react-redux"

const Notification = (props) => {
  const notification = props.notification
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    display: `${notification.visible ? "" : "none"}`
  }
  return <div style={style}>{notification.message}</div>
}

const mapStateToProps = (state) => {
  return { notification: state.notification }
}

export default connect(mapStateToProps)(Notification)
