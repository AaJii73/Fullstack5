const Notification = ({notification, color}) => 
{
  const notificationStyle = {
    color: `${color}`,
    background: 'LightGrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (notification)
  {
    return (
      <div style = {notificationStyle}> {notification} </div>
    )
  }
}

export default Notification