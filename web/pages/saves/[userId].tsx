import { GetServerSideProps } from 'next'
import client from '../../client/client'
import { SavedPostsDocument } from '../../generated/graphql'

function Saves() {
  return (
    <div>Saves</div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({  }) => {
    const query = await client.query(SavedPostsDocument, {}).toPromise()
    const posts = query.data.savedPosts

    return {
        props: {
            posts
        },
    }
}

export default Saves