import React, {useState} from 'react'
import { Dropdown, Button, Col, Row } from 'antd';

import { COLOR_SLATE, COLOR_LATTE, COLOR_COFFEE } from '../constants'

const dropdownOutStyle= {
  background: COLOR_SLATE,
  color: '#fff',
  borderRadius: 15,
  margin: 15,
  height: 35,
  weight: 120,
}

const dropdownInStyle= {
  background: COLOR_SLATE,
  color: COLOR_COFFEE,
  borderColor: COLOR_LATTE,
  borderRadius: 15,
  margin: 15,
  height: 35,
  weight: 120,
}

export default function DropDownButtonCategory(props) {

  const {dropdown, title, titleItem, image} = props
  
  const [dropdownStyle, setdropdownStyle] = useState(dropdownOutStyle)

  return (    
    <Dropdown overlay={dropdown} selected={titleItem} style={{weight: 120}}>
      <Button 
      style={dropdownStyle}
      onMouseEnter={ ()=> setdropdownStyle(dropdownInStyle) }
      onMouseLeave={ ()=> setdropdownStyle(dropdownOutStyle) }
      >
        {image && 
          <img className="logos" alt={title}
          src={ titleItem !== 'All' ? `/images/${titleItem}.png` : `/images/allCategorys.png` }
          />
        }
        &nbsp; { titleItem !=='allCategorys' ? titleItem : <span> All </span>} &nbsp;
      </Button>
    </Dropdown>
  )
}