import React, { useState } from "react";
// import { Redirect, Route, Switch } from "react-router-dom";
// import routes from "routes.js";

// Chakra imports
import { Box, useColorModeValue } from "@chakra-ui/react";

// Layout components
import { SidebarContext } from "contexts/SidebarContext";
import SignIn from "views/auth/signIn";

// Custom Chakra theme
export default function Auth() {
  // states and functions
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // const getRoutes = (routes) => {
  //   return routes.map((prop, key) => {
  //     if (prop.layout === "/auth") {
  //       return (
  //         <Route
  //           path={prop.layout + prop.path}
  //           component={prop.component}
  //           key={key}
  //         />
  //       );
  //     }
  //     if (prop.collapse) {
  //       return getRoutes(prop.items);
  //     }
  //     if (prop.category) {
  //       return getRoutes(prop.items);
  //     } else {
  //       return null;
  //     }
  //   });
  // };
  const authBg = useColorModeValue("white", "navy.900");
  document.documentElement.dir = "ltr";
  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}>
        <Box
          bg={authBg}
          float='right'
          minHeight='100vh'
          height='100%'
          position='relative'
          w='100%'
          transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
          transitionDuration='.2s, .2s, .35s'
          transitionProperty='top, bottom, width'
          transitionTimingFunction='linear, linear, ease'>
          <Box mx='auto' minH='100vh'>
            <SignIn />
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
