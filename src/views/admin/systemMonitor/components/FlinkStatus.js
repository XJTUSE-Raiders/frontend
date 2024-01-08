import {MiniStatistics, IconBox,Icon, useColorModeValue} from "@chakra-ui/react"

export default function FlinkStatus() {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <MiniStatistics
    startContent={
      <IconBox
        w='56px'
        h='56px'
        bg={boxBg}
        icon={
          <Icon w='32px' h='32px' color={brandColor} />
        }
      />
    }
    name='24 小时内访问人数'
    value='100'
  />
  )
}