export default function Sidebar({
  towers,
  updateTower,
  removeTower,
  links,
  removeLink
}) {
  return (
    <div className="sideBar">
      <div className="panel">
        <h4 className="title">Towers</h4>

        {towers.length === 0 && (
          <div className="small" style={{ marginTop: 8 }}>
            No towers yet. Click map to add.
          </div>
        )}

        {towers.map((t) => (
          <div key={t.id} className="sidebar-item">
            <div className="sidebar-item-header">
              <div>
                <div className="sidebar-item-title">Tower {t.id}</div>
                <div className="sidebar-item-subtitle">
                  {t.lat.toFixed(4)}, {t.lng.toFixed(4)}
                </div>
              </div>

              <div className="sidebar-item-actions">
                <div className="sidebar-input-group">
                  <input
                    type="number"
                    value={t.freqGHz}
                    onChange={(e) =>
                      updateTower(t.id, { freqGHz: Number(e.target.value) })
                    }
                    className="sidebar-input"
                  />
                  <span className="sidebar-unit">GHz</span>
                </div>
                <button
                  className="btn danger sidebar-delete-btn"
                  onClick={() => removeTower(t.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="panel">
        <h4 className="title">Links</h4>

        {links.length === 0 && (
          <div className="small" style={{ marginTop: 8 }}>
            No links yet.
          </div>
        )}

        {links.map((l) => {
          const towerA = towers.find((t) => t.id === l.a.id);
          const towerB = towers.find((t) => t.id === l.b.id);

          return (
            <div key={l.id} className="sidebar-item">
              <div className="link-item-header">

                <div className="link-info">
                  <div className="sidebar-item-title" style={{ marginBottom: "4px" }}>Link</div>
                  <div className="sidebar-item-subtitle">
                    {l.a.id} ↔ {l.b.id}
                  </div>

                  <div className="small link-details">
                    <span className="link-label">A:</span> {towerA?.freqGHz} GHz <br />
                    <span className="link-label">B:</span> {towerB?.freqGHz} GHz
                  </div>
                </div>

                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between" }}>
                  <div className="link-distance">
                    {(l.distance / 1000).toFixed(2)} km
                  </div>
                  <button
                    className="btn danger sidebar-delete-btn"
                    onClick={() => removeLink(l.id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
