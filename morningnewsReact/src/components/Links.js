import React, {useState} from 'react'
import {Link} from 'react-router-dom'


function Links (props) {

  const {children, styleOut, styleIn, to } = props

  const [linkStyle, setLinkStyle] = useState(styleOut)

  return (
    <Link 
    to={to} 
    style={linkStyle} 
    onMouseEnter={ ()=> setLinkStyle(styleIn) }
    onMouseLeave={ ()=> setLinkStyle(styleOut) }
    >
     {children}
    </Link>
  )
}


export default Links