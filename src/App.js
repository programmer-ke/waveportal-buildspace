import React, { useEffect } from "react";
import './App.css';

export default function App() {

    const checkIfWalletIsConnected = () => {
	const { ethereum } = window;
	
	if (!ethereum) {
	    console.log("Make sure you have metamask!");
	} else {
	    console.log("We have the ethereum object", ethereum);
	}
    };

    useEffect(() => {
	checkIfWalletIsConnected();
    }, []);
  
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
