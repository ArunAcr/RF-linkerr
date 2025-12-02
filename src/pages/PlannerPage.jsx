import { useTowers } from "../hooks/useTowers";
import { useLinks } from "../hooks/useLinks";
import Sidebar from "../components/Sidebar/Sidebar";
import MapView from "../components/Map/MapView"

export default function PlannerPage() {
  const { towers, addTower, updateTower, removeTower } = useTowers();
  const {
    links,
    addLink,
    removeLink,
    selectedTower,
    selectedLink,
    setSelectedLink,
    setSelectedTower,
    secondSelectedTower,
    setSecondSelectedTower,
    handleAddLink,
  } = useLinks(towers);


  return (
    <><h3 className="planner-header">
      RF Outdoor Link Planner
    </h3><div className="planner">
        <Sidebar
          links={links}
          removeLink={removeLink}
          towers={towers}
          updateTower={updateTower}
          removeTower={removeTower}
          selectedLink={selectedLink}
          setSelectedLink={setSelectedLink} />
        <MapView
          towers={towers}
          addTower={addTower}
          updateTower={updateTower}
          selectedTower={selectedTower}
          setSelectedTower={setSelectedTower}
          links={links}
          addLink={addLink}
          selectedLink={selectedLink}
          setSelectedLink={setSelectedLink}
          secondSelectedTower={secondSelectedTower}
          setSecondSelectedTower={setSecondSelectedTower}
          handleAddLink={handleAddLink} />
      </div></>
  );
}
