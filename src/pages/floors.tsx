import { useParams } from "react-router-dom";
import "../assets/styles.css";
import VectorMap, { Layer, Tooltip, Label } from "devextreme-react/vector-map";
import { useAppSelector } from "../redux/app/hooks";
import type { RootState } from "../redux/app/store";
import { ThemeType } from "../redux/types/types";

const projection = {
  to: ([l, lt]: [l: any, lt: any]) => [l / 100, lt / 100],
  from: ([x, y]: [x: any, y: any]) => [x * 100, y * 100],
};

const buildingData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [10, -80],
            [-80, -80],
            [-80, 80],
            [40, 80],
            [40, -20],
            [100, -20],
            [100, -80],
            [30, -80],
            [30, -74],
            [34, -74],
            [34, -68],
            [40, -68],
            [40, -74],
            [94, -74],
            [94, -26],
            [40, -26],
            [40, -60],
            [34, -60],
            [34, 74],
            [-74, 74],
            [-74, 30],
            [10, 30],
            [10, 24],
            [-74, 24],
            [-74, -24],
            [10, -24],
            [10, -30],
            [-74, -30],
            [-74, -74],
            [10, -74],
          ],
        ],
      },
    },
  ],
};
const roomsData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Room 1",
        square: 576,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-74, -30],
            [34, -30],
            [34, -74],
            [-74, -74],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Room 2",
        square: 600,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-74, 24],
            [34, 24],
            [34, -24],
            [-74, -24],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Room 3",
        square: 540,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-74, 74],
            [34, 74],
            [34, 30],
            [-74, 30],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Room 4",
        square: 288,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [40, -26],
            [94, -26],
            [94, -74],
            [40, -74],
          ],
        ],
      },
    },
  ],
};
export default function Floors() {
  let { buildingId, floorId } = useParams();

  const customize = useAppSelector((state: RootState) => state.custumize);

  console.log(customize.activeTheme);
  return (
    <VectorMap id="vector-map" maxZoomFactor={4} projection={projection}>
      <Layer
        dataSource={buildingData}
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
  );
}

function customizeTooltip(arg: any) {
  if (arg.layer.name === "rooms") {
    return { text: `Square: ${arg.attribute("square")} ft&#178` };
  }
  return null;
}
