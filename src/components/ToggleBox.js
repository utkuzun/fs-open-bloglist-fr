import React, { useState } from 'react'

const ToggleBox = ({ buttonLabel, children }) => {
  const [showChildren, setShowChildren] = useState(false)

  const toggleShow = () => {
    setShowChildren(!showChildren)
  }

  if (!showChildren) {
    return (
      <>
        <button onClick={toggleShow}>{buttonLabel}</button>
      </>
    )
  }

  return (
    <>
      {children}
      <button onClick={toggleShow}>cancel</button>
    </>
  )
}

export default ToggleBox
