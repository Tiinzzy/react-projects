"use client"

import React, { useEffect, useState } from 'react';

import { KanbanBoard } from "./components/KanbanBoard";
import { getLogList } from './components/kanban-board';


import BackEndConnection from './components/BackEndConnection';

const backend = BackEndConnection.INSTANCE();

export default function Home() {
  const [boardData, setBoardData] = useState(Array<{ [key: string]: string }>);

  useEffect(() => {
    backend.get_documents_from_mongo_db((data: any) => {
      let newBoard: any = getLogList(data.documents);
      setBoardData(newBoard);
    })

  }, []);
  return (
    <div style={{ width: '100%' }}>
      {boardData !== null &&
        <KanbanBoard
          boardData={boardData}
          title="Kanban Board"
          paragraph="This is my personal tasks board which i track my projects in it!" />}

    </div>
  )
}
