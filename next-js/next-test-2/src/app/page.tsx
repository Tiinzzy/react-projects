"use client"

import React, { useEffect, useState } from 'react';

import { KanbanBoard } from "./components/KanbanBoard";
import { getLogList } from './components/kanban-board';
import { emptyBoard, BoardType } from './components/kanban-types'

import BackEndConnection from './components/BackEndConnection';

const backend = BackEndConnection.INSTANCE();


export default function Home() {
  const [count, setCount] = useState(0);
  const [boardData, setBoardData] = useState(emptyBoard);


  useEffect(() => {
    if (count === 0) {
      backend.get_documents_from_mongo_db((data: any) => {
        let board: BoardType = getLogList(data.documents);
        setBoardData(board);
        setCount(1)
      });
    }
  }, [boardData, count]);

  return (
    <div style={{ width: '100%' }}>
      {count > 0 &&
        <KanbanBoard
          boardData={boardData}
          title="Kanban Board"
          paragraph="This is kanban board created with NEXT.js and written with TypeScript" />}

    </div>
  )
}
