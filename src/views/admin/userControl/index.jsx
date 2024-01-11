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
      {/* Main Fields */}
      <SimpleGrid columns={{base:1,md:1,xl:2}}  gap='20px' mb='20px'>
        <UserManage
          // gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          tableConfig={UserConfig}
          tableData={UserData}
        />
      </SimpleGrid>
    </Box>
  );
}
