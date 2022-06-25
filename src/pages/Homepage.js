import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Container, Card, Tab, Tabs } from "@mui/material";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import Profile from "../features/user/Profile";
import FriendRequests from "../features/friend/FriendRequests";
import AddFriend from "../features/friend/AddFriend";
import FriendList from "../features/friend/FriendList";
import ProfileCover from "../features/user/ProfileCover";
import { capitalCase } from "change-case";
import useAuth from "../hooks/useAuth";

const TabsWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  backgroundColor: "#fff",
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));

function Homepage() {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState("profile");
  const handleChangeTab = (newValue) => {
    console.log(newValue);
    setCurrentTab(newValue);
  };

  const PROFILE_TABS = [
    {
      value: "profile",
      icon: <AccountBoxIcon sx={{ fontSize: 24 }} />,
      component: <Profile profile={user} />,
    },
    {
      value: "friends",
      icon: <ContactMailIcon sx={{ fontSize: 24 }} />,
      component: <FriendList />,
    },
    {
      value: "requests",
      icon: <PersonAddRoundedIcon sx={{ fontSize: 24 }} />,
      component: <FriendRequests />,
    },
    {
      value: "add_friends",
      icon: <PeopleAltIcon sx={{ fontSize: 24 }} />,
      component: <AddFriend />,
    },
  ];
  return (
    <Container>
      <Card
        sx={{
          mb: 3,
          height: 280,
          position: "relative",
        }}
      >
        <ProfileCover profile={user} />
        <TabsWrapperStyle>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            // onChange={handleChangeTab(currentTab)} --> infinite looping
            onChange={(e, value) => handleChangeTab(value)}
            // aria-label="wrapped label tabs example"
          >
            {PROFILE_TABS.map((tab) => (
              <Tab
                value={tab.value}
                label={capitalCase(tab.value)}
                key={tab.value}
                icon={tab.icon}
                wrapped
              />
            ))}
          </Tabs>
        </TabsWrapperStyle>
      </Card>
      {PROFILE_TABS.map((tab) => {
        const isMatch = currentTab === tab.value;
        return isMatch && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default Homepage;
