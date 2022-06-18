import { useParams } from "react-router-dom";
import "../assets/styles.css";
import VectorMap, { Layer, Tooltip, Label } from "devextreme-react/vector-map";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import type { RootState } from "../redux/app/store";
import { ThemeType } from "../redux/types/types";
import { useEffect, useState } from "react";
import { ContextMenu } from "devextreme-react/context-menu";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fetchEvents } from "../redux/features/buildings/eventsSlice";

const projection = {
  to: ([l, lt]: [l: any, lt: any]) => [l / 100, lt / 100],
  from: ([x, y]: [x: any, y: any]) => [x * 100, y * 100],
};

export interface RoomDATA {
  type: string;
  features: [];
}

export default function Floors() {
  const dispatch = useAppDispatch();
  const [wallsCord, setwallsCordCord] = useState();
  const [roomsCord, setRoomsCord] = useState([]);
  const [roomsList, setRoomsList] = useState([{}]);
  const [roomId, setRoomId] = useState();
  const [expanded, setExpanded] = useState<string | false>(false);

  const customize = useAppSelector((state: RootState) => state.custumize);

  const { status: buildingStatus, buildings } = useAppSelector(
    (state) => state.buildings
  );

  // coordinates
  useEffect(() => {
    if (buildingStatus === "succeeded") {
      let theBuilding: any = buildings[0];
      let theLayout = theBuilding.floors[0].layout;
      setwallsCordCord(JSON.parse("[" + theLayout.wall_coordinates + "]"));
      setRoomsCord(JSON.parse("[" + theLayout.room_coordinates + "]"));
    }
  }, [buildingStatus]);

  const buildingData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[wallsCord]],
        },
      },
    ],
  };

  useEffect(() => {
    let list = [];

    if (roomsCord && buildingStatus === "succeeded") {
      let theBuilding: any = buildings[0];
      let rooms = theBuilding.floors[0].rooms;
      if (roomsCord[0]) {
        for (let i = 0; i < rooms.length; i++) {
          let dic = {
            type: "Feature",
            properties: {
              id: rooms[i].id,
              name: `Room ${i + 1}`,
              square: 576,
            },
            geometry: {
              type: "Polygon",
              coordinates: [[roomsCord[i]]],
            },
          };
          list.push(dic);
        }
      }

      setRoomsList(list);
    }
  }, [roomsCord, buildingStatus]);

  const roomsData = {
    type: "FeatureCollection",
    features: roomsList,
  };

  const clickHandler = ({ target }: { target: any }) => {
    if (target && target.attribute("id")) {
      setRoomId(target.attribute("id"));
      dispatch(fetchEvents(target.attribute("id")));
    }
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      {buildingData && roomsData.features[1] && (
        <VectorMap
          id="vector-map"
          maxZoomFactor={4}
          projection={projection}
          onClick={clickHandler}
        >
          <ContextMenu onItemClick={() => console.log("click")} />

          <Layer
            dataSource={wallsCord && buildingData}
            hoverEnabled={false}
            name="building"
          ></Layer>
          <Layer
            dataSource={roomsData}
            name="roomsCord"
            borderWidth={1}
            color={
              customize.activeTheme === ThemeType.PEPSI ? "#e6f4ff" : "#fce6ed"
            }
          >
            <Label enabled={true} dataField="name"></Label>
          </Layer>
          <Tooltip enabled={true} customizeTooltip={customizeTooltip}></Tooltip>
        </VectorMap>
      )}
      {roomId && (
        <Box
          sx={{
            opacity: 10,
            mt: 10,
            borderRadius: 10,
            margin: "auto",
            width: 300,
            height: 300,
            backgroundColor: "primary.dark",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="subtitle1" color="secondary.dark">
                {roomId}hi
              </Typography>
            </Grid>
            <Grid item>
              {roomsList?.map((room, index) => (
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                  key={index}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      General settings
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      I am an accordion
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Nulla facilisi. Phasellus sollicitudin nulla et quam
                      mattis feugiat. Aliquam eget maximus est, id dignissim
                      quam.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}

function customizeTooltip(arg: any) {
  if (arg.layer.name === "roomsCord") {
    return { text: `Square: ${arg.attribute("square")} ft&#178` };
  }
  return null;
}
