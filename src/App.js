import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/WavePortal.json";

export default function App() {

    // holds/sets state of connected account
    const [currentAccount, setCurrentAccount ] = useState("");

    const contractAddress = "0x124920B1f42AD4929A93058C91a66259305fAacf";
    const contractABI = abi.abi;

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

    const wave = async () => {
	try {
	    const { ethereum } = window;

	    if (ethereum) {
		const provider = new ethers.providers.Web3Provider(ethereum);
		const signer = provider.getSigner();
		const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

		let count = await wavePortalContract.getTotalWaves();
		console.log("Retrieved total wave count...", count.toNumber());

		// Now execute wave on the contract. This means modifying the
		// blockchain

		const waveTxn = await wavePortalContract.wave();
		console.log("Mining...", waveTxn.hash);
		
		await waveTxn.wait();
		console.log("Mined --", waveTxn.hash);
		
		count = await wavePortalContract.getTotalWaves();
		console.log("Retrieved total wave count...", count.toNumber());
	    } else {
		console.log("Metamask not detected!");
	    }
	} catch (error) {
	    console.log(error);
	}
    };

    // After every render, the anonymous is passed to useEffect
    // and executed asynchronously
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

	  <button className="waveButton" onClick={wave}>
	    Let's go
	  </button>

	  {/*
	    * If there's no currentAccount, render the button below
	    */}

	  {!currentAccount && (
              <button className="waveButton" onClick={connectWallet}>
		  Connect Wallet
              </button>
	  )}

	</div>
      </div>
    );
}
