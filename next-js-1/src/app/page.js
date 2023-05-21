"use client"

import styles from "./Home.module.css";
import Switch from "@mui/material/Switch";
import { Button } from "@mui/material";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Home() {

  const handleClick = (e) => {
    alert(1);
  }

  return (
    <div className={styles.container}>
      <Button variant="outlined" onClick={handleClick}>Ki Ki</Button>
      <div>
        <span>With default Theme:</span>
      </div>
      <Switch {...label} defaultChecked />
      <Switch {...label} />
      <Switch {...label} disabled defaultChecked />
    </div>
  );
}