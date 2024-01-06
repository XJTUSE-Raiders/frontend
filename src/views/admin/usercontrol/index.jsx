import { Box, Grid, Flex } from "@chakra-ui/react";

// Custom components
import AdminBanner from "views/admin/usercontrol/components/AdminBanner";
import UserManage from "views/admin/usercontrol/components/UserManage"
import TransferSettings from "views/admin/usercontrol/components/TransferSettings"
import PermMatrix from "views/admin/usercontrol/components/PermMatrix"

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import React from "react";

import {UserConfig} from "views/admin/usercontrol/varibles/UserConfig";
import UserData from "views/admin/usercontrol/varibles/UserData.json";

export default function Overview() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex>
      {/* Main Fields */}
      <Grid gridAutoFlow='true'
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <AdminBanner
          gridArea='1 / 1 / 2 / 2'
          banner={banner}
          avatar={avatar}
          name='Adela Parkson'
          job='Product Designer'
          usercount='17'
          admincount='2'
          engineercount='2'
        />
        <UserManage
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          tableConfig={UserConfig}
          tableData={UserData}
        />
        <TransferSettings
          gridArea={{
            base: "3 / 1 / 4 / 2",
            lg: "1 / 3 / 2 / 4",
          }}
          minH={{ base: "auto", lg: "420px", "2xl": "365px" }}
          pe='20px'
          pb={{ base: "100px", lg: "20px" }}
        />
      </Grid>
      </Flex>
      <Flex>
        <PermMatrix pe='20px' minH='300px'/>
      </Flex>
    </Box>
  );
}
