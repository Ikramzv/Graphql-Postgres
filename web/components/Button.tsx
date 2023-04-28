import React from 'react'

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement> , HTMLButtonElement> {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    buttonText: string
    icon?: React.ReactElement
}

const Button = ({ onClick, buttonText,icon , ...props }: Props) => {
  return (
    <>
        <button {...props} onClick={onClick} >
            {buttonText}
            {icon}
        </button>
    </>
  )
}

export default Button