import * as React from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  const wave = () => {
    
  }
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
	  Let's print some free money like the central banks
        </div>

        <button className="waveButton" onClick={wave}>
          Let's go
        </button>
      </div>
    </div>
  );
}
