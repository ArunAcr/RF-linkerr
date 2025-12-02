import React from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import TowerMarker from "./TowerMarker";
import LinkLine from "./LinkLine";
import "../Map/map.css";

export default function MapView({
  towers,
  addTower,
  updateTower,
  selectedTower,
  setSelectedTower,
  links,
  addLink,
  selectedLink,
  setSelectedLink,
  setSecondSelectedTower,
  secondSelectedTower,
  handleAddLink,
}) {

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        addTower(e.latlng.lat, e.latlng.lng);
      }
    });
    return null;
  }

  return (
    <div className="map-wrapper">
      <MapContainer center={[20.59, 78.96]} zoom={5} className="map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapClickHandler />

        {(towers || []).map((tower) => (
          <TowerMarker
            key={tower.id}
            tower={tower}
            updateTower={updateTower}
            selectedTower={selectedTower}
            setSelectedTower={setSelectedTower}
            addLink={addLink}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
            secondSelectedTower={secondSelectedTower}
            setSecondSelectedTower={setSecondSelectedTower}
            handleAddLink={handleAddLink}
          />
        ))}



        {links.map(link => {
          const towerA = towers.find(t => t.id === link.a.id);
          const towerB = towers.find(t => t.id === link.b.id);
          if (!towerA || !towerB) return null;

          return <LinkLine key={link.id} link={{ ...link, a: towerA, b: towerB }} />;
        })}
      </MapContainer>
    </div>
  );
}
