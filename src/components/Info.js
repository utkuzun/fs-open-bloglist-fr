import React from 'react'
import { useSelector } from 'react-redux'

const Info = () => {
  const info = useSelector((state) => state.info)

  const { status, message } = info

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
