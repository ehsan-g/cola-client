import React from "react";
import {
  CardContent,
  Typography,
  Box,
  ListItem,
  ListItemText,
  List,
} from "@mui/material";
import PageContainer from "../container/PageContainer";
import { Floor, ThemeType } from "../../redux/types/types";
import { ListItemButton } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useAppSelector } from "../../redux/app/hooks";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNavigate } from "react-router-dom";

const BuildingFloors = ({
  floors,
  buildingId,
}: {
  floors: Floor[] | [];
  buildingId: number | undefined;
}) => {
  const navigate = useNavigate();

  const customize = useAppSelector((state) => state.custumize);
  const { profile } = useAppSelector((state) => state.user);

  return (
    <PageContainer title="floor Table" description="this is floor Table">
      <CardContent>
        <Box
          sx={{
            overflow: {
              xs: "auto",
              sm: "unset",
            },
          }}
        >
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              border: "1px solid lightGrey",
              borderRadius: 2,
              boxShadow:
                customize.activeTheme === ThemeType.COKE
                  ? "0px 5px 50px 10px #fce6ed inset"
                  : "20px 20px 50px 10px #e6f4ff inset",
            }}
          >
            {floors.map((floor) => {
              const labelId = `checkbox-list-label-${floor.id}`;

              return (
                <ListItem key={floor.id}>
                  <ListItemButton
                    disabled={
                      profile &&
                      profile.permission_level <= floor.permission_level
                    }
                    role={undefined}
                    onClick={() =>
                      navigate(`/buildings/${buildingId}/floor/${floor.id}`)
                    }
                  >
                    <ListItemText
                      id={labelId}
                      primary={
                        <Typography variant="subtitle2">
                          Floor - {floor.title}
                        </Typography>
                      }
                    />
                    <ListItemText
                      id={labelId}
                      primary={
                        <Typography variant="subtitle2">
                          Available Room:{floor.rooms ? floor.rooms.length : 0}
                        </Typography>
                      }
                    />
                    <ListItemIcon sx={{ justifyContent: "center" }}>
                      {profile &&
                      profile.permission_level <= floor.permission_level ? (
                        <LockOpenIcon color="warning" />
                      ) : (
                        <CheckCircleOutlineIcon color="success" />
                      )}
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </CardContent>
    </PageContainer>
  );
};

export default BuildingFloors;
