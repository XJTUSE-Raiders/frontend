// Chakra imports
import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue
} from '@chakra-ui/react'
import { MdArrowDropDown } from 'react-icons/md'
import { React, useState } from 'react'
import { MdOutlineCalendarToday } from 'react-icons/md'

export function CalendarButton (props) {
  const { ...rest } = props

  const [menu, setMenu] = useState('Realtime')

  // Chakra Color Mode

  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white')
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<MdArrowDropDown />}
        bg={boxBg}
        fontSize='sm'
        fontWeight='500'
        color={textColorSecondary}
        borderRadius='7px'
      >
        <Icon as={MdOutlineCalendarToday} color={textColorSecondary} me='4px' />
        {menu}
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            setMenu('Realtime')
          }}
        >
          Realtime
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMenu('Today')
          }}
        >
          This Today
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMenu('This Week')
          }}
        >
          This Week
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMenu('This Month')
          }}
        >
          This Month
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
