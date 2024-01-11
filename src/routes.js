import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  // MdBarChart,
  MdPerson,
  // MdHome,
  // MdLock,
  // MdOutlineShoppingCart,
  MdAssistantNavigation,
  MdSettingsSuggest,
  MdKey
} from "react-icons/md";

// Admin Imports
// import MainDashboard from "views/admin/default";
import Dashboard from "views/admin/dashboard";
import UserControl from "views/admin/userControl";
import SystemMonitor from 'views/admin/systemMonitor'
import RoleManage from "views/admin/roleManage";
// import NFTMarketplace from "views/admin/marketplace";
// import Profile from "views/admin/profile";
// import DataTables from "views/admin/dataTables";
// import RTL from "views/admin/rtl";

// Auth Imports
// import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "数据仪表盘",
    layout: "/admin",
    path: "/dashboard",
    icon: <Icon as={MdAssistantNavigation} width='20px' height='20px' color='inherit' />,
    component: Dashboard,
    access: ['admin', 'maintainer', 'user'],
  },
  {
    name: "系统运维",
    layout: "/admin",
    path: "/system-monitor",
    icon: <Icon as={MdSettingsSuggest} width='20px' height='20px' color='inherit' />,
    component: SystemMonitor,
    access: ['admin', 'maintainer'],
  },
  {
    name: "用户管理",
    layout: "/admin",
    path: "/user-control",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: UserControl,
    access: ['admin'],
  },
  {
    name: "角色权限管理",
    layout: "/admin",
    path: "/role-manage",
    icon: <Icon as={MdKey} width='20px' height='20px' color='inherit' />,
    component: RoleManage,
    access: ['admin'],
  },
  // {
  //   name: "原 Dashboard",
  //   layout: "/admin",
  //   path: "/default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: MainDashboard,
  // },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "/nft-marketplace",
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
  //   path: "/data-tables",
  //   component: DataTables,
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  //   component: Profile,
  // },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "/sign-in",
  //   icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
  //   component: SignInCentered,
  // }
];

export default routes;
