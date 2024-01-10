// Chakra imports
import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react'
import { MdArrowDropDown } from 'react-icons/md'
import { React, useMemo } from 'react'
import { MdOutlineCalendarToday } from 'react-icons/md'

const MENU_ITEMS = [
  {
    label: '实时追踪',
    value: 'second'
  },
  {
    label: '最近 15 分钟',
    value: 'minute'
  },
  {
    label: '最近 15 小时',
    value: 'hour'
  },
  {
    label: '最近 15 天',
    value: 'day'
  },
  {
    label: '最近一年',
    value: 'month'
  }
];

export function timeStepToSeconds(timeStep) {
  return {
    second: 1,
    minute: 60,
    hour: 60 * 60,
    day: 24 * 60 * 60,
    month: 30 * 24 * 60 * 60,
  }[timeStep];
}

export function timeStepShorterFn(timeStep) {
  // '0000-11-22 33:44:55'
  return {
    second: (dt) => `${dt[3]}:${dt[4]}:${dt[5]}`,
    minute: (dt) => `${dt[3]}:${dt[4]}`,
    hour: (dt) => `${dt[2]} ${dt[3]}`,
    day: (dt) => `${dt[1]}-${dt[2]}`,
    month: (dt) => `${dt[0]}-${dt[1]}`,
  }[timeStep];
}

export function timeStepLimiter(timeStep) {
  return {
    second: (arr) => arr.slice(0, 15),
    minute: (arr) => arr.slice(-16, -1),
    hour: (arr) => arr.slice(-15),
    day: (arr) => arr.slice(-15),
    month: (arr) => arr,
  }[timeStep];
}

export function CalendarMenu(props) {
  const { value, onChange } = props

  // const [menu, setMenu] = useState('Realtime')

  // Chakra Color Mode

  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white')
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')

  const currentLabel = useMemo(() => {
    const item = MENU_ITEMS.find(item => item.value === value)
    return item?.label
  }, [value]);

  const handleMenuChange = (val) => (e) => {
    e.stopPropagation()
    onChange?.(val)
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        leftIcon={<Icon as={MdOutlineCalendarToday} color={textColorSecondary} />}
        rightIcon={<MdArrowDropDown />}
        bg={boxBg}
        fontSize='sm'
        fontWeight='500'
        color={textColorSecondary}
        borderRadius='7px'
        onClick={e => e.stopPropagation()}
      >
        {currentLabel}
      </MenuButton>
      <MenuList>
        {MENU_ITEMS.map(item => (
          <MenuItem key={item.value} onClick={handleMenuChange(item.value)}>
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
