// Chakra imports
import {
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import IconBox from "components/icons/IconBox";
import React from "react";
import UserListTable from "./UserListTable";
// Assets
import { MdAdminPanelSettings } from "react-icons/md";

export default function UserManage(props) {
  const { tableConfig, tableData } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset'
  )
  const box = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Card mb={{ base: "0px", lg: "20px" }} align='center'>
      <UserListTable
        columnsData={tableConfig}
        tableData={tableData}
      />
    </Card>
  );
}
