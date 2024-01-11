import React from "react";
import { Box } from "@chakra-ui/react";
import PermMatrix from "./components/PermMatrix"

export default function RoleManage() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <PermMatrix pe='20px' minH='300px'/>
    </Box>
  );
}
