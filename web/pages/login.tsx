import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { ImGithub } from 'react-icons/im';
import logo from "../assets/logowhite.png";
import shareVideo from "../assets/share.mp4";
import client from '../client/client';
import Button from '../components/Button';
import Or from '../components/Or';
import { GetUserDocument, RegisterDocument } from '../generated/graphql';
import { DecodedToken, User } from '../types/types';

interface NextAuthSession {
  user: {
    name: string,
    email: string,
    image: string,
  }
  expires: string
}

interface Props {
  session: NextAuthSession & { token: DecodedToken }
  user: User
}

const Login = ({ }: Props) => {
    const router = useRouter()

    const providerLogin = async(provider: string) => await signIn(provider)
    
    const handleFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
    }
    
  return (
    <div className="flex justify-start items-center flex-col h-screen" >
        <div className="relative w-full h-full" >
            <video
                src={shareVideo}
                muted
                loop
                controls={false}
                autoPlay
                className="w-full h-full object-cover"
            />
            <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay" >
              <div className="p-5">
                <Image 
                  src={logo}
                  alt="logo"
                  width={130}
                />
              </div>
              <div className='flex flex-col gap-4 items-center' >
                <h3 className='text-white text-base font-semibold md:text-lg'>Sign in with credentials</h3>
                <form className='flex flex-col gap-4' onSubmit={handleFormSubmit} >
                  <input className='login_input' type="email" placeholder='Your email ...' />
                  <input className='login_input' type="password" placeholder='Your password ...' />
                  <Button 
                    buttonText={"Submit"}
                    type="submit"
                    className={
                      "button md:!px-3 md:!py-2 border border-gray-900 text-gray-900 !bg-mainColor hover:!bg-slate-400 hover:text-black"
                    }
                  />
                </form>
              </div>
              <Or 
                className='flex items-center w-72 sm:w-96 my-3'
              />
              <div className='shadow-2xl flex flex-col items-center gap-2'>
                <Button
                  onClick={() => providerLogin("google")}
                  className="button w-full text-white border-red-800 hover:bg-white hover:text-red-800 hover:border-white"
                  buttonText='Sign in with google'
                  icon={<FcGoogle className='text-xl' />}
                />
                <Button
                  onClick={() => providerLogin("github")}
                  className="button w-full text-white border-blue-600 hover:bg-white hover:text-blue-600 hover:border-white"
                  buttonText='Sign in with github'
                  icon={<ImGithub className='text-xl' />}
                />
              </div>
            </div>
        </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async({ req }) => {
  const session = await getSession({ req })
  if(!session) {
    return {
      props: {
        session: {
          user: null
        }
      },
    }
  }
  const user = session.user
  const { data } = await client.query(GetUserDocument , { email: session.user?.email }).toPromise()

  if(!data.getUser) {
    const options = {
      username: user?.name,
      email: user?.email,
      image: user?.image,
      password: "",
    }

    const { data: createdUserData } =  await client.mutation(RegisterDocument , { options } ).toPromise()

    return {
      props: {
        session,
        user: createdUserData.register
      }
    }
  }

  return {
    props: {
      session,
      user: data.getUser
    },
    redirect: {
      destination: "/"
    }
  }
}

export default Login