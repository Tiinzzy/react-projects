import { KanbanBoard } from "./components/KanbanBoard"

export default function Home() {
  return (
    <div style={{ width: '100%' }}>
      <KanbanBoard
        title="Kanban Board"
        paragraph="This is my personal tasks board which i track my projects in it!" />

    </div>
  )
}
