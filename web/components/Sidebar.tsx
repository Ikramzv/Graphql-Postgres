import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { AiFillCloseCircle } from "react-icons/ai"
import { useSidebarState } from "../context/sidebar/context"
import { SIDEBAR_ACTION_TYPES } from "../context/sidebar/reducer"
import { useUserState } from "../context/user/context"
import { User } from "../types/types"

interface Props {
    user?: User
}

function Sidebar({  }: Props) {
  const [{ user }] = useUserState()
  const [{ toggleSidebar } , sidebarDispatch] = useSidebarState()

    const handleSignout = () => {
      console.log("click")
        signOut({
            redirect: true,
            callbackUrl: '/login'
        })
    }

    if(!user) return null

  return (
    <div className='' >
        <div className={toggleSidebar ? "sidebar sidebar_slide_in" : "sidebar sidebar_slide_out"} >
          <div className='md:hidden absolute right-2 items-center p-2' >
            <AiFillCloseCircle fontSize={30} className="cursor-pointer active:scale-75 duration-200" 
              onClick={() => sidebarDispatch({ type: SIDEBAR_ACTION_TYPES.TOGGLE_SIDEBAR, payload: false })} 
            />
          </div> 
          <div className="flex items-center gap-2 sm:gap-3 md:flex-row-reverse p-2" >
            <button className='p-2 border border-gray-400 rounded-md shadow-md duration-200 active:scale-95 cursor-pointer' onClick={handleSignout} >
                Sign out
            </button>
            <div className="flex items-center gap-2 sm:gap-3" >
              <Link href={`/profile/${user.id}`} className="active:scale-50 duration-200" >
                <Image 
                  src={user.image}
                  alt={user.username}
                  width={30}
                  height={30}
                  className="rounded_user_image"
                />
              </Link>
              <h3 className="text-base sm:text-lg text-gray-600" >
                {user.username}
              </h3>
            </div>
          </div>
          <hr className="h-[1px] bg-slate-300 my-2 mx-4" />
        </div>
    </div>
  )
}

export default Sidebar