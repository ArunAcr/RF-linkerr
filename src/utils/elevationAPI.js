
export  default async function fetchElevations(points) {
  console.log("fetchElevations running...");

  if (!points || points.length === 0) {
    console.warn("No points provided to fetchElevations");
    return [];
  }

  try {
    const locations = points
      .map((p) => `${p.lat},${p.lng}`)
      .join("|");

    console.log("Requesting API for:", locations);

    const url = `https://api.open-elevation.com/api/v1/lookup?locations=${locations}`;
    const res = await fetch(url);

    if (!res.ok) {
      console.error("Elevation API request failed:", res.status);
      return points.map(() => 0);
    }

    const json = await res.json();
    console.log("API response:", json);

    if (!json?.results || json.results.length === 0) {
      console.warn("Elevation API returned empty results");
      return points.map(() => 0);
    }

    return json.results.map((r) => r.elevation ?? 0);
  } catch (error) {
    console.error("Error in fetchElevations:", error);
    return points.map(() => 0);
  }
}
