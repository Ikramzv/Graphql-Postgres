import Image from 'next/image'
import React, { useState } from 'react'
import { BsChevronDoubleRight, BsUpload } from 'react-icons/bs'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import { useCreatePostMutation } from '../../generated/graphql'

function ModalForm({ open }: { open: boolean }) {
    const [{ data,error: gqlerror,fetching } , createPost] = useCreatePostMutation()

    const [switchRight, setSwitchRight] = useState(false)

    const [value,setValue] = useState({
        title: "",
        description: "",
        image: ""
    })

    const [error,setError] = useState({
        title: "",
        description: "",
        image: ""
    })
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const emptyValues = Object.keys(value).reduce((initial,key) => {
            if((value as any)[key]) return initial ;
            if(key !== "image") (initial as any)[key] = `${key} must contain a single character at least`
            else (initial as any)[key] = `An ${key} must be selected`
            return initial
        } , {})

        if(Object.keys(emptyValues).length) {
            setError({
                ...error,
                ...emptyValues
            })
            return
        }

        await createPost(value)
        console.log(data,gqlerror,fetching)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        if(name === "image") {
            const file = (e.target.files as any)[0]
            const fileReader = new FileReader()
            fileReader.onprogress = (e) => {
                console.log(e.total , e.loaded , (e.loaded / e.total) * 100)
            }
            fileReader.onloadend = (e) => {
                const image = fileReader.result as string
                setValue({
                    ...value,
                    image
                })
            }
            fileReader.readAsDataURL(file)
        } else {
            setValue({
                ...value,
                [e.target.name]: e.target.value
            })
        }
        setError({
            ...error,
            [e.target.name]: ""
        })
    }

    const switchSide = () => {
        setSwitchRight(prev => !prev)
    }

  return (
    <form 
            className='relative flex flex-col items-center justify-center gap-3 w-full sm:w-[clamp(200px,65vw,400px)] h-[600px] 
            p-4 sm:p-6 bg-slate-100 rounded-md delay-200 duration-150 cursor-auto' 
            style={{ opacity: open ? 1 : 0 }} 
            onSubmit={handleSubmit}
        >   
            <span className='absolute text-sm top-2 right-2 text-gray-500'>click on outside of the form to close</span>
            <span className='inline-flex items-center gap-2 absolute top-12 right-2 text-black cursor-pointer duration-200 active:scale-75' onClick={switchSide} >
                <span className='text-sm text-gray-500' style={{ color: `${(error.image && !switchRight) && "red"}` }} >{switchRight ? "switch to form" : 'select an image'}</span>
                <BsChevronDoubleRight className='text-2xl duration-200' style={{ rotate: switchRight ? "180deg" : "0deg" }}  />
            </span>
            <fieldset className='flex items-center justify-center h-2/3 w-full relative overflow-hidden'>
                <legend className='font-semibold text-gray-900 mb-4' >Create Post</legend>
                <div 
                    className='absolute w-full flex flex-col gap-2 duration-200' 
                    style={{ transform: switchRight ? "translateX(-100%)" : "translateX(0px)" }} 
                >
                    <div className='form_div' >
                        <label className='text-black font-semibold' htmlFor="title">Title</label>
                        <input 
                            className='form_input' 
                            type="text" 
                            name='title' 
                            value={value.title} 
                            onChange={handleChange} 
                            placeholder='Title ...'  
                        />
                        <p className='form_error' style={{ opacity: error.title ? 1 : 0 }} >{error.title}</p>
                    </div>
                    <div className='form_div' >
                        <label className='text-black font-semibold' htmlFor="description">Description</label>
                        <input 
                            className='form_input' 
                            type="text" 
                            name='description' 
                            value={value.description} 
                            onChange={handleChange} 
                            placeholder='Description ...'  
                        />
                        <p className='form_error' style={{ opacity: error.description ? 1 : 0 }} >{error.description}</p>
                    </div>
                </div>

                <div 
                    className='group form_div absolute h-3/4 w-full duration-200 border-2 border-dashed 
                    border-gray-700 hover:bg-gray-400 hover:border-white' 
                    style={{ transform: switchRight ? "translateX(0px)" : "translateX(100%)" }} 
                >
                    {!value.image ? (
                        <>
                            <div className='w-full h-full'>
                                <input type="file" name='image' value={value.image} onChange={handleChange} className='absolute inset-0 opacity-0 cursor-pointer' />
                                <div className='grid place-items-center place-content-center gap-2 h-full w-full' >
                                    <div className='flex_center flex-col' >
                                        <BsUpload className='text-4xl text-gray-600 group-hover:text-white' />
                                        <p className='text-gray-500 text-sm group-hover:text-white' >Upload an image</p>
                                    </div>
                                    <div className='flex_center flex-col' >
                                        <p>JPEG | WEBP | PNG</p>
                                        <p className='text-sm w-2/3 text-center' >select an imaga and share with your friends !</p>
                                    </div>
                                </div>
                            </div>
                            <p className='form_error' style={{ opacity: error.image ? 1 : 0 }} >{error.image}</p>
                        </>
                    ) : (
                        <Image
                            src={value.image}
                            alt="The selected post image"
                            className='w-full h-full object-contain'
                            width={0}
                            height={0}
                            priority
                        />
                    )}
                </div>
                
            </fieldset>
            <div className='w-full flex flex-col xs:flex-row items-center gap-3' >
            <button type='submit' className='w-2/3 border-black hover:text-white hover:bg-black active_button'>Create</button>
                {switchRight ? (
                    <button 
                        type='button'
                        className='group flex_center gap-2 w-2/3 border-red-500 hover:text-white hover:bg-red-500 active_button'
                        onClick={() => setValue({ ...value,image: "" })}
                    >   
                        <span className='hidden text-sm sm:block' >Clear image</span>
                        <IoMdRemoveCircleOutline className="text-2xl text-red-500 group-hover:text-white" />
                    </button>
                ) : null}
            </div>
        </form>
  )
}

export default ModalForm