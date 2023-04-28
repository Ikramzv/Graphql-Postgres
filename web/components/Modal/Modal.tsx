import React from 'react'
import ModalForm from './ModalForm'

interface Props {
    setOpen: React.Dispatch<boolean>
    open: boolean
}

function Modal({ open , setOpen}: Props) {

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setOpen(false)
    }

  return (
    <div className='flex items-center justify-center px-2 sm:px-0 fixed left-0 top-0 duration-300 z-50 cursor-pointer' style={{
        userSelect: open ? "auto" : "none",
        pointerEvents: open ? "auto" : "none",
        width: open ? "100vw" : "0vw",
        height: open ? "100vh" : "0vh"
    }} >
        <div onClick={handleClick} className='absolute inset-0 z-[-1] bg-gradient-to-br from-gray-900 to-gray-800' style={{
            opacity: open ? 0.3 : 0
        }} ></div>
        <ModalForm open={open} />
    </div>
  )
}

export default Modal