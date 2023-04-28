import { HiMenu } from 'react-icons/hi'
import { useSidebarState } from '../context/sidebar/context'
import { SIDEBAR_ACTION_TYPES } from '../context/sidebar/reducer'
import { useUserState } from '../context/user/context'
import NavbarLinks from './Navbar/NavbarLinks'


function Navbar() {

    const [{ user } , __] = useUserState()
    const [_, sidebarDispatch] = useSidebarState()

    if(!user) return null

  return (
    <div className='fixed z-10 top-0 flex flex-row h-32 bg-gradient-to-r from-slate-500 to-slate-300 w-full 
      abstracted_sidebar_width items-center justify-between px-3 py-1 gap-4' 
    >
        <HiMenu
            fontSize={40}
            className="md:hidden cursor-pointer text-[30px] sm:text-[40px]"
            onClick={() => sidebarDispatch({
                payload: true,
                type: SIDEBAR_ACTION_TYPES.TOGGLE_SIDEBAR
            })}
        />
        <NavbarLinks user={user} />
    </div>
  )
}

export default Navbar