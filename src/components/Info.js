import React from 'react'

const Info = ({ info }) => {
  const { message, status } = info
  if (!message) {
    return <></>
  }
  return (
    <>
      <div className={`info-container ${status}`}>
        <p className={`info-text ${status}`}>{message}</p>
      </div>
    </>
  )
}

export default Info
