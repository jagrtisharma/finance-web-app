import React, { useState, useEffect } from "react";
import Styles from "./Navbar.module.css";
import { Box, Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Box
        className={`${Styles.navbar_container} ${
          scroll ? Styles.navbar_scrolled : ""
        }`}
      >
        <Box className={Styles.navbar_contact}>
          <Stack className={Styles.navbar_contact_layout}>
            <Stack className={Styles.contact_layout}>
              <Stack className={Styles.layout_icon}>
                <MailIcon sx={{ fontSize: { xs: "18px", md: "24px" } }} />
              </Stack>
              <Stack className={Styles.layout_text}>www.finance.in</Stack>
            </Stack>
            <Stack>|</Stack>
            <Stack className={Styles.contact_layout}>
              <Stack className={Styles.layout_icon}>
                <PhoneIcon sx={{ fontSize: { xs: "18px", md: "24px" } }} />
              </Stack>
              <Stack className={Styles.layout_text}>00000000</Stack>
            </Stack>
            <Stack>|</Stack>
            <Stack className={Styles.contact_layout}>
              <Stack className={Styles.layout_icon}>
                <InstagramIcon sx={{ fontSize: { xs: "18px", md: "24px" } }} />
              </Stack>
              <Stack className={Styles.layout_icon}>
                <FacebookIcon sx={{ fontSize: { xs: "18px", md: "24px" } }} />
              </Stack>
              <Stack className={Styles.layout_icon}>
                <TwitterIcon
                  sx={{
                    fontSize: { xs: "18px", md: "24px" },
                  }}
                />
              </Stack>
              <Stack className={Styles.layout_icon}>
                <LinkedInIcon
                  sx={{
                    fontSize: { xs: "18px", md: "24px" },
                    display: { xs: "none", md: "block" },
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Box className={Styles.navbar_layout}>
          <Stack
            className={Styles.navbar_logo_container}
            sx={{ fontSize: "24px", fontWeight: "600" }}
          >
            <Stack
              className={Styles.navbar_logo}
              onClick={() => {
                navigate("/task");
              }}
            >
              CashBook
            </Stack>
          </Stack>

          {/* Options */}
          <Stack className={Styles.navbar_options}>
            <Stack
              className={`  ${
                location.pathname !== "/task"
                  ? Styles.navbar_options_text
                  : Styles.navbar_notmal_option
              }`}
              onClick={() => {
                navigate("/task");
              }}
            >
              Finace
            </Stack>
            <Stack
              className={`  ${
                location.pathname !== "/spentAnalysis"
                  ? Styles.navbar_options_text
                  : Styles.navbar_notmal_option
              }`}
              onClick={() => {
                navigate("/spentAnalysis");
              }}
            >
              Spent Analysis
            </Stack>
            <Stack
              className={`  ${
                location.pathname !== "/"
                  ? Styles.navbar_options_text
                  : Styles.navbar_notmal_option
              }`}
              onClick={() => {
                navigate("/");
              }}
            >
              logout
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
