import React from "react";
import { Polyline, Circle, Tooltip } from "react-leaflet";
import { computeFresnelForLink } from "../../utils/fresnel";


export default function LinkLine({ link, selectedLink, setSelectedLink }) {
  const data = computeFresnelForLink(link);

  if (!data) {
    return null;
  }

  const { latlngs, fresnel } = data;

  if (!latlngs || latlngs.length < 2) return null;

  const isSelected = selectedLink?.id === link.id;

  return (
    <>
      <Polyline
        positions={latlngs}
        pathOptions={{
          color: isSelected ? "orange" : "#3388ff",
          weight: isSelected ? 4 : 2,
          opacity: 0.8
        }}
        eventHandlers={{
          click: () => setSelectedLink(link)
        }}
      >
        <Tooltip sticky>
          <div>
            <strong>Link {link.id}</strong><br />
            Distance: {(link.distance / 1000).toFixed(2)} km<br />
            Freq: {link.a.freqGHz} / {link.b.freqGHz} GHz
          </div>
        </Tooltip>
      </Polyline>

      {isSelected && (
        <Circle
          center={fresnel.midpoint}
          radius={fresnel.radius}
          pathOptions={{
            color: "red",
            fillOpacity: 0.15
          }}
        />
      )}
    </>
  );
}
