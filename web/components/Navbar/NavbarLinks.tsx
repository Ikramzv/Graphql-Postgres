import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsCollection } from 'react-icons/bs'
import logo from "../../assets/logowhite.png"
import { User } from '../../types/types'
import NavbarPostLink from './NavbarPostLink'


function NavbarLinks({ user }: { user: User }) {
  return (
    <>
        <Link href={"/"} >
          <Image 
              src={logo}
              alt='logo'
              width={130}
          />
        </Link>
        <div className='flex flex-1 items-center justify-end gap-2' >
          <Link href={`/saves/${user.id}`} >
            <button className='nav_link_button'>
              <span className='nav_link_span'>SAVES</span>
              <BsCollection className='text-xl' />
            </button>
          </Link>
          <NavbarPostLink />
        </div>
    </>
  )
}

export default React.memo(NavbarLinks , (prev,next) => prev.user === next.user)