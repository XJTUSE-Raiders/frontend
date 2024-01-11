import { Box, SimpleGrid } from "@chakra-ui/react";

// Custom components
import UserManage from "views/admin/userControl/components/UserManage"

// Assets
import React from "react";

import {UserConfig} from "views/admin/userControl/varibles/UserConfig";
import UserData from "views/admin/userControl/varibles/UserData.json";

export default function Overview() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <UserManage />
    </Box>
  );
}
