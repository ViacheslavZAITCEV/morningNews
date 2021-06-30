import React from 'react'
import { Menu } from 'antd';


const DropdownMenu = (props)=>{

  const { maj, list, proprety, name } = props

  console.log('list', list)

    return (
      <Menu>
        { list.map( (item, i) =>{
          return (
            <Menu.Item key={i} onClick={() => maj(item[proprety])} >
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}  >
              {item.img &&
                <span className="drapeau">
                  <img className="logos" src={ item.img } />
                </span>
              }
              <span justifyContent="center">
                {item[name]}
              </span>
              </div>
            </Menu.Item>
          )
        })}
      </Menu>
    )
  }
  
export default DropdownMenu
