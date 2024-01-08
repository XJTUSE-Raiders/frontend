import { FcOk, FcHighPriority } from "react-icons/fc";
import { Icon, useColorModeValue} from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
export default function ContainerStatus(props) {
  const {isOk, statName, reportTime} = props
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  function okStatus () {
    return isOk==='true'?FcOk:FcHighPriority;
  }
  return (
    <MiniStatistics
    startContent={
      <IconBox
        w='56px'
        h='56px'
        bg={boxBg}
        icon={
          <Icon w='32px' h='32px' as={okStatus()} color={brandColor} />
        }
      />
    }
    name={statName}
    value={reportTime}
  />
  )
}