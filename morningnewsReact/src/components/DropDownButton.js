import React, {useState} from 'react'
import { Dropdown, Button } from 'antd';

import { COLOR_SLATE, COLOR_LATTE, COLOR_COFFEE } from '../constants'

const dropdownOutStyle= {
  background: COLOR_SLATE,
  color: '#fff',
  borderRadius: 15,
  margin: 15,
}

const dropdownInStyle= {
  background: COLOR_SLATE,
  color: COLOR_COFFEE,
  borderRadius: 15,
  borderColor: COLOR_COFFEE,
  margin: 15,
}

export default function DropDownButton(props) {

  const {dropdown, title, titleItem, image} = props
  
  const [dropdownStyle, setdropdownStyle] = useState(dropdownOutStyle)

  return (    
    <Dropdown overlay={dropdown} >
      <Button 
      style={dropdownStyle}
      onMouseEnter={ ()=> setdropdownStyle(dropdownInStyle) }
      onMouseLeave={ ()=> setdropdownStyle(dropdownOutStyle) }
      >
        {title} - {titleItem ? titleItem : <span> All </span>} &nbsp;
        {image && 
          <img className="logos" alt={title}
          src={ titleItem ? `/images/${titleItem}.png` : `/images/${image}.png` }
          />
        }
      </Button>
    </Dropdown>
  )
}