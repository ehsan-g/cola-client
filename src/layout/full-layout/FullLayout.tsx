import { experimentalStyled, Container, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/app/store";
import CustomBottomNavigation from "../../components/container/CustomBottomNavigation";
import CustomAppBar from "../../components/container/CustomAppBar";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const MainWrapper = experimentalStyled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));
const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",

  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: "10px",
  },
}));

const FullLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search
    ? // eslint-disable-next-line no-restricted-globals
      location.search.split("redirect=")[1]
    : "";

  const customize = useSelector((state: RootState) => state.custumize);

  const { profile, user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user && !profile) {
      console.log("hala");
      navigate(`/auth/login${redirect}`);
    }
  }, [redirect, user, profile]);

  return (
    <MainWrapper className={customize.activeMode === "light" ? "dark" : ""}>
      <PageWrapper>
        <Container maxWidth={false}>
          <CustomAppBar />
          <Box
            sx={{
              minHeight: "calc(100vh - 170px)",
              paddingTop: "60px",
            }}
          >
            <Outlet />
          </Box>
          <CustomBottomNavigation />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
