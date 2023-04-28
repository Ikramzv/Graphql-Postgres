import { useState } from 'react'
import { BsCamera } from 'react-icons/bs'
import Modal from '../Modal/Modal'



function NavbarPost() {
  const [open,setOpen] = useState(false)

  return (
    <>
        <button className='nav_link_button' onClick={() => setOpen(true)} >
            <span className='nav_link_span'>POST</span>
            <BsCamera className='text-xl' />
          </button>
          <Modal open={open} setOpen={setOpen} />
    </>
  )
}

export default NavbarPost