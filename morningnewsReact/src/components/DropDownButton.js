import React, {useState} from 'react'
import { Dropdown, Button, Col, Row } from 'antd';

import { COLOR_SLATE, COLOR_LATTE, COLOR_COFFEE } from '../constants'

const dropdownOutStyle= {
  background: COLOR_SLATE,
  color: '#fff',
  borderRadius: 15,
  margin: 15,
  height: 35,
}

const dropdownInStyle= {
  background: COLOR_SLATE,
  color: COLOR_COFFEE,
  borderRadius: 15,
  borderColor: COLOR_LATTE,
  margin: 15,
  height: 35,
}

export default function DropDownButton(props) {

  const {dropdown, title, titleItem, image} = props
  
  const [dropdownStyle, setdropdownStyle] = useState(dropdownOutStyle)

  return (    
    <Dropdown overlay={dropdown} selected={titleItem} >
      <Button 
      style={dropdownStyle}
      onMouseEnter={ ()=> setdropdownStyle(dropdownInStyle) }
      onMouseLeave={ ()=> setdropdownStyle(dropdownOutStyle) }
      >
        {image && 
          <img className="logos" alt={title}
          src={image}
          />
        }
        &nbsp; {titleItem} &nbsp;
      </Button>
    </Dropdown>
  )
}