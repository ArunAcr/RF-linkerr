
import { useState, useEffect } from 'react'

const initial = []
export function useTowers(){
  if(!window.__rf_towers_state){
    window.__rf_towers_state = { towers: initial, setTowers: null, listeners: [] }
  }
  const store = window.__rf_towers_state
  const [towers, setTowers] = useState(store.towers)

  useEffect(()=>{
    store.setTowers = (next)=>{
      store.towers = next
      store.listeners.forEach(fn=>fn(next))
    }
    const onChange = (next)=> setTowers(next)
    store.listeners.push(onChange)
    return ()=>{ store.listeners = store.listeners.filter(fn=>fn!==onChange) }
  },[store])

  function addTower(lat,lng){
    const id = Date.now().toString()
    const t = { id, lat, lng, freqGHz:5.0 }
    store.setTowers([...store.towers, t])
  }
  function updateTower(id, patch){
    store.setTowers(store.towers.map(t=> t.id===id ? {...t, ...patch} : t))
  }
  function updateTowerFreq(id, newFreq) {
    store.setTowers(
      store.towers.map(t =>
        t.id === id ? { ...t, freqGHz: newFreq } : t
      )
    );
  }
  function removeTower(id){
    store.setTowers(store.towers.filter(t=> t.id!==id))
  }

  return { towers, addTower, updateTower, removeTower }
}
