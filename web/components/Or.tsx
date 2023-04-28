import React from "react"

function Or(props: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} >
        <div className="flex-[2] bg-gray-400 h-[1px]" ></div>
        <p className="flex-[0.5] text-gray-100 text-center" >or</p>
        <div className="flex-[2] bg-gray-400 h-[1px]" ></div>
    </div>
  )
}

export default Or