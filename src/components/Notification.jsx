const Notification = ({message}) => {
  const style = {
    color: 'green',
    borderStyle: 'doted'
  }

  if (!message) {
    return null
  }
  else {
    return <p style={style}>{message}</p>
  }
}

export default Notification