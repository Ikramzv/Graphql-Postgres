import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'urql'
import client from '../client/client'
import Navbar from '../components/Navbar'
import Sidebar from "../components/Sidebar"
import Context from '../context/context'
import "../styles/main.css"


export default function App({ Component, pageProps , session }: AppProps & { session: any }) {
  return (
    <SessionProvider session={session} baseUrl='http://localhost:3000' refetchInterval={60 * 5} refetchOnWindowFocus={true} >
      <Provider value={client} >
        <Head>
          <title>Media App</title>
        </Head>
        { pageProps?.session?.user === null ? (
          <Component {...pageProps} />
        ) : (
          <div className='flex md:flex-row flex-col h-screen duration-75 ease-out' >
          <Context>
            <Sidebar />
            <div className='flex pt-[128px] flex-col flex-1 overflow-y-hidden' >
              <Navbar />
              <div className='flex-1 bg-slate-50 overflow-y-auto' >
                <Component {...pageProps} />
              </div>
            </div>
          </Context>
        </div>
        ) }
      </Provider>
    </SessionProvider>
  )
}