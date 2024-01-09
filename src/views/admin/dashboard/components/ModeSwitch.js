import {
  Flex,
  Switch,
  FormControl,
  FormLabel,
  useColorModeValue,
  Text
} from '@chakra-ui/react'

export default function ModeSwitch(props) {
  const { isTraffic, onClick } = props;

  const textColor = useColorModeValue('navy.700', 'white');

  const handleClick = () => {
    onClick?.(isTraffic);
  }
  return (
    <Flex align='center' mb={2} onClick={e => e.stopPropagation()}>
      <FormControl display='flex' alignItems='center'>
        <FormLabel htmlFor='traffic' mb='0' onClick={handleClick}>
          <Text color={textColor} size='sm' fontWeight='bold'>
            Visits
          </Text>
        </FormLabel>
        <Switch
          isChecked={isTraffic}
          onChange={handleClick}
        />
        <FormLabel htmlFor='traffic' mb='0' ml={1} onClick={handleClick}>
          <Text color={textColor} size='sm' fontWeight='bold'>
            Traffic
          </Text>
        </FormLabel>
      </FormControl>
    </Flex>
  )
}
