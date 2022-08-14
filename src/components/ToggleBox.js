import React from 'react'

const ToggleBox = ({
  buttonLabel,
  children,
  showChildren,
  setShowChildren,
}) => {
  const toggleShow = () => {
    setShowChildren(!showChildren)
  }

  return (
    <>
      <button className={!showChildren ? 'show' : 'hide'} onClick={toggleShow}>
        {buttonLabel}
      </button>

      <div className={!showChildren ? 'hide' : 'show'}>
        {children}
        <button onClick={toggleShow}>cancel</button>
      </div>
    </>
  )
}

export default ToggleBox
