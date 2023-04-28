import { GetServerSideProps } from 'next'
import client from '../../client/client'
import { GetUserDocument } from '../../generated/graphql'
import { User } from '../../types/types'
import useUser from '../../utils/useUser'

interface Props {
    user: User
}

function Profile({ user }: Props) {
  
  useUser(user)
    
  return (
    <div>
        Profile
        {user.username}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { data , error } = await client.query(GetUserDocument , { username: query?.username }).toPromise()
    if(error) {
        console.log(error)
        throw error
    }
    return {
        props: {
            user: data.getUser
        },
    }
    
    // return {
    //     props: {
    //         user: {
    //             username: "hello"
    //         }
    //     }
    // }
}

export default Profile