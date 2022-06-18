import { useParams } from "react-router-dom";
import "../assets/styles.css";
import VectorMap, { Layer, Tooltip, Label } from "devextreme-react/vector-map";
import { useAppSelector } from "../redux/app/hooks";
import type { RootState } from "../redux/app/store";
import { ThemeType } from "../redux/types/types";
import { useEffect, useState } from "react";

const projection = {
  to: ([l, lt]: [l: any, lt: any]) => [l / 100, lt / 100],
  from: ([x, y]: [x: any, y: any]) => [x * 100, y * 100],
};

export interface RoomDATA {
  type: string;
  features: [];
}

export default function Floors() {
  let { buildingId, floorId } = useParams();

  const [walls, setWalls] = useState();
  const [rooms, setRooms] = useState([]);
  const [roomsList, setRoomsList] = useState([{}]);
  const customize = useAppSelector((state: RootState) => state.custumize);

  const { status: buildingStatus, buildings } = useAppSelector(
    (state) => state.buildings
  );

  // coordinates
  useEffect(() => {
    if (buildingStatus === "succeeded") {
      let theBuilding: any = buildings[0];
      let theLayout = theBuilding.floors[0].layout;
      setWalls(JSON.parse("[" + theLayout.wall_coordinates + "]"));
      setRooms(JSON.parse("[" + theLayout.room_coordinates + "]"));
    }
  }, [buildingStatus]);

  const buildingData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[walls]],
        },
      },
    ],
  };

  useEffect(() => {
    let list = [];

    if (rooms && buildingStatus === "succeeded") {
      for (let i = 0; i < rooms.length; i++) {
        let dic = {
          type: "Feature",
          properties: {
            name: `Room ${i + 1}`,
            square: 576,
          },
          geometry: {
            type: "Polygon",
            coordinates: [[rooms[i]]],
          },
        };
        list.push(dic);
      }
      setRoomsList(list);
    }
  }, [rooms, buildingStatus]);

  const roomsData = {
    type: "FeatureCollection",
    features: roomsList,
  };

  return (
    <>
      {buildingData && roomsData.features[1] && (
        <VectorMap id="vector-map" maxZoomFactor={4} projection={projection}>
          <Layer
            dataSource={walls && buildingData}
            hoverEnabled={false}
            name="building"
          ></Layer>
          <Layer
            dataSource={roomsData}
            name="rooms"
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
    </>
  );
}

function customizeTooltip(arg: any) {
  if (arg.layer.name === "rooms") {
    return { text: `Square: ${arg.attribute("square")} ft&#178` };
  }
  return null;
}
