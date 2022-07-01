import React from 'react'
import "./Header.css"


export default function Header() {
  return (
    <div onClick={()=>window.scroll(0,0)} className='header'>Movie App </div>

  )
}
