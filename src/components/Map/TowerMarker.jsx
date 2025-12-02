import React from "react";
import { CircleMarker, Popup, Tooltip } from "react-leaflet";

export default function TowerMarker({
  tower,
  updateTower,
  selectedTower,
  setSelectedTower,
  secondSelectedTower,
  setSecondSelectedTower,
  handleAddLink
}) {
  const handleClick = () => {
    if (!selectedTower) {
      setSelectedTower(tower);
    } else if (selectedTower.id !== tower.id) {
      // Pass the current tower as the target for the link
      handleAddLink(tower);
    }
  };

  const isSelected = selectedTower?.id === tower.id;
  const isSecondSelected = secondSelectedTower?.id === tower.id;

  // Style based on selection or state
  const fillColor = isSelected || isSecondSelected ? "#ff3333" : "#3388ff";
  const radius = isSelected || isSecondSelected ? 12 : 8;

  return (
    <CircleMarker
      center={[tower.lat, tower.lng]}
      radius={radius}
      pathOptions={{
        color: "black",
        weight: 1,
        fillColor: fillColor,
        fillOpacity: 1
      }}
      eventHandlers={{ click: handleClick }}
    >
      <Tooltip direction="top" offset={[0, -10]} opacity={1}>
        <div>
          <strong>Tower {tower.id}</strong><br />
          {tower.freqGHz} GHz
        </div>
      </Tooltip>

      <Popup>
        <div>
          <strong>Tower #{tower.id}</strong>
          <br />
          Frequency:
          <input
            type="text"
            value={tower.freqGHz || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") return updateTower(tower.id, { freqGHz: "" });
              if (!isNaN(value)) updateTower(tower.id, { freqGHz: Number(value) });
            }}
          />
          GHz
        </div>
      </Popup>

    </CircleMarker>
  );
}
