import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/WavePortal.json";

export default function App() {

    // holds/sets app properties
    const [currentAccount, setCurrentAccount ] = useState("");
    const [allWaves, setAllWaves] = useState([]);
    const [waveMessage, setWaveMessage] = useState("");
    
    const contractAddress = "0x1324DB00aE4688B7bbC2617113A29CF28F89eBd5";
    const contractABI = abi.abi;

    const getAllWaves = async () => {
	try {
	    const { ethereum } = window;
	    if (ethereum) {
		// metamask is our provider, we're using their servers
		// to communicate with the contract
		const provider = new ethers.providers.Web3Provider(ethereum);
		const signer = provider.getSigner();
		const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

		// call method on contract
		const waves = await wavePortalContract.getAllWaves();

		// extract required message attributes
		let wavesCleaned = [];
		
		waves.forEach(wave => {
		    wavesCleaned.push({
			address: wave.waver,
			timestamp: new Date(wave.timestamp * 1000),
			message: wave.message
		    });
		});

		// store waves in react's state
		setAllWaves(wavesCleaned);
		
	    } else {
		console.log("Make sure you have metamask");
	    }
	} catch (error) {
	    console.log(error);
	}
    };

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
		getAllWaves();
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
		// Metamask in this our provider. We're using their servers
		// to access the contract on-chain
		const provider = new ethers.providers.Web3Provider(ethereum);
		const signer = provider.getSigner();
		const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

		let count = await wavePortalContract.getTotalWaves();
		console.log("Retrieved total wave count...", count.toNumber());

		// Now execute wave on the contract. This means modifying the
		// blockchain

		const waveTxn = await wavePortalContract.wave("Random message");
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

    // After every render, the anonymous function is passed to useEffect
    // and executed asynchronously
    useEffect(() => {
	checkIfWalletIsConnected();
	console.log(waveMessage);
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

          <div>
            <input value={waveMessage} onInput={e => setWaveMessage(e.target.value)} placeholder="your wave message"/>
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

	  {allWaves.map((wave, index) => {
	      return (
		<div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
		  <div>Address: {wave.address}</div>
		  <div>Time: {wave.timestamp.toString()}</div>
		  <div>Message: {wave.message}</div>		    
		</div>    
	      )
	  })}

	</div>
      </div>
    );
}
