import { useState, useEffect } from "react";
import fetchElevations from "../utils/elevationAPI";

export function useLinks(towers) {
  const [links, setLinks] = useState([]);
  const [selectedTower, setSelectedTower] = useState(null);
  const [secondSelectedTower, setSecondSelectedTower] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);

  useEffect(() => {
    setLinks(prevLinks => {
      const nextLinks = [];

      prevLinks.forEach(link => {
        const towerA = towers.find(t => t.id === link.a.id);
        const towerB = towers.find(t => t.id === link.b.id);

        if (!towerA || !towerB) return;

        const newDist = haversineDistance(towerA, towerB);

        nextLinks.push({
          ...link,
          a: towerA,
          b: towerB,
          distance: newDist
        });
      });

      return nextLinks;
    });
  }, [towers]);

  function handleAddLink(specificTarget) {
    const a = selectedTower;
    const b = specificTarget || secondSelectedTower;

    if (!a || !b) return;

    const exists = links.find(
      l => (l.a.id === a.id && l.b.id === b.id) || (l.a.id === b.id && l.b.id === a.id)
    );
    if (exists) {
      alert("Link already exists!");
      setSelectedTower(null);
      setSecondSelectedTower(null);
      return;
    }

    const id = `link-${Date.now()}`;
    const distance = haversineDistance(a, b);

    const newLink = {
      id,
      a,
      b,
      distance,
      elevations: []
    };

    setLinks((prev) => [...prev, newLink]);

    fetchElevations([
      { lat: a.lat, lng: a.lng },
      { lat: b.lat, lng: b.lng },
    ]).then((elevations) => {
      setLinks(prev => prev.map(l => l.id === id ? { ...l, elevations } : l));
    });

    setSelectedTower(null);
    setSecondSelectedTower(null);
  }

  function removeLink(id) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
    if (selectedLink?.id === id) setSelectedLink(null);
  }

  return {
    links,
    selectedTower,
    setSelectedTower,
    secondSelectedTower,
    setSecondSelectedTower,
    selectedLink,
    setSelectedLink,
    handleAddLink,
    removeLink,
  };
}

function haversineDistance(a, b) {
  const R = 6371000;
  const toRad = (x) => (x * Math.PI) / 180;

  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);

  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) *
    Math.cos(toRad(b.lat)) *
    Math.sin(dLng / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}
