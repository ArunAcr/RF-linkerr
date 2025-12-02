export async function fetchElevations(points){
  try{
    const locations = points.map(p=>`${p.lat},${p.lng}`).join('|')
    const res = await fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${locations}`)
    const j = await res.json()
    return j.results.map(r=>r.elevation || 0)
  }catch(e){
    console.warn('elevation fetch failed',e)
    return points.map(()=>0)
  }
}