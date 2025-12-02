const C = 3e8;

export function fresnelRadiusAtPoint(d1, d2, freqHz) {
  const lambda = C / freqHz;
  return Math.sqrt((lambda * d1 * d2) / (d1 + d2));
}

export function computeFresnelForLink(link) {
  if (!link || !link.a || !link.b) return null;

  const freqHz = (link.a.freqGHz || 5) * 1e9;

  const midpoint = {
    lat: (link.a.lat + link.b.lat) / 2,
    lng: (link.a.lng + link.b.lng) / 2,
  };

  const d = link.distance || 1;

  const radius = fresnelRadiusAtPoint(d / 2, d / 2, freqHz);

  return {
    latlngs: [
      [link.a.lat, link.a.lng],
      [link.b.lat, link.b.lng],
    ],
    fresnel: {
      midpoint,
      radius
    }
  };
}
