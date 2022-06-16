import { useParams } from "react-router-dom";

export default function BuildingView() {
  let { id } = useParams();
  return <div>{id}</div>;
}
