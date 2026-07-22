function UserPanelLayout() {
  return (
    <div className="user-panel-layout">
      <aside className="user-panel-sidebar">
        <strong>Sidebar</strong>
        <span>Navigation</span>
        <span>Orders</span>
        <span>Profile</span>
        <span>Settings</span>
      </aside>

      <div className="user-panel-content">
        <div className="user-panel-card">
          <strong>Header area</strong>
          <p>Use this section for welcome cards, stats, and quick actions.</p>
        </div>

        <div className="user-panel-card">
          <strong>Main content area</strong>
          <p>Place tables, forms, or active user workflows here.</p>
        </div>
      </div>
    </div>
  )
}

export default UserPanelLayout
