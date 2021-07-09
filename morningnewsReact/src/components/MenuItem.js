import React, {useState} from 'react'

function MenuItem(props) {

  const {item, name, styleIn, styleOut, selected} = props

  const [style, setStyle]= useState(styleOut)

  return (
    <span
    style={style} 
    onMouseEnter={ ()=> setStyle(styleIn) }
    onMouseLeave={ ()=> setStyle(styleOut) }
    >
      {item.img &&
        <span className="drapeau">
          <img className="logos" src={ item.img } />
        </span>
      }
      <span style={{weight: 100}}>
        {item[name]}
      </span>
    </span>
  )
}


export default MenuItem