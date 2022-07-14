import React, { useEffect, useState } from "react";
import './App.css';

export default function App() {

    const [currentAccount, setCurrentAccount ] = useState("");

    const checkIfWalletIsConnected = async () => {

	try {
	    const { ethereum } = window;
	    
	    if (!ethereum) {
		console.log("Make sure you have metamask!");
		return;
	    } else {
		console.log("We have the ethereum object", ethereum);
	    }

	    const accounts = await ethereum.request({ method: "eth_accounts" });

	    if (accounts.length !== 0) {
		const account = accounts[0];
		console.log("Found an authorized account:", account);
		setCurrentAccount(account);
	    } else {
		console.log("No authorized account found");
	    }
	    
	} catch (error) {
	    console.log(error);
	}
	
    };

    const connectWallet = async () => {
	try {
	    const { ethereum } = window;
	    if (!ethereum) {
		alert("Metamask not detected. Cannot connect");
		return;
	    }
	    // Request wallet account access
	    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
	    console.log("Connected", accounts[0]);
	    setCurrentAccount(accounts[0]);

	} catch (error) {
	};
    };

    useEffect(() => {
	checkIfWalletIsConnected();
    }, []);
  
    return (
      <div className="mainContainer">

	<div className="dataContainer">
	  <div className="header">
	  👋 Hey there! 👋
	  </div>

	  <div className="bio">
	    Let's print some free money like the central banks
	  </div>

	  <button className="waveButton" onClick={null}>
	    Let's go
	  </button>

	  {/*
	    * If there's no currentAccount, render the button below
	    */}

	  {!currentAccount && (
              <button className="waveButton" onclick={connectWallet}>
		  Connect Wallet
              </button>
	  )}

	</div>
      </div>
    );
}
