//import React from "react";
import { useMap } from "react-leaflet";

const SetView = ({ coords }) => {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
};

export default SetView;
