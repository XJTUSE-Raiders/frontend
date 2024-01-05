import { Box, Grid } from "@chakra-ui/react";

// Custom components
import AdminBanner from "views/admin/usercontrol/components/AdminBanner";
import UserManage from "views/admin/usercontrol/components/UserManage"
import TransferSettings from "views/admin/usercontrol/components/TransferSettings"
import General from "views/admin/profile/components/General";
import PermMatrix from "views/admin/usercontrol/components/PermMatrix"

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import React from "react";

export default function Overview() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
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
      <Box as="flex" flexShrink='0'>
      <PermMatrix
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          maxHeight='100%'
          pe='20px'
        />
      </Box>

      <Grid
        mb='20px'
        templateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1.34fr 1.62fr 1fr",
        }}
        templateRows={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>

      </Grid>
    </Box>
  );
}
