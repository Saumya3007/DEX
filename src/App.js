import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import {  useState } from 'react';
import Buy from './component/Buy.js';
import Web3 from 'web3';
import Swap from './component/Swap.js';
import Header from './component/Header.js';
import Sell from './component/Sell.js';
import Info from './component/Info.js';
import dex from '../src/contracts/dex.json';
import axsToken from '../src/contracts/axsToken.json'
import skyToken from '../src/contracts/skyToken.json'


function App() {


  const [account, setAccount] = useState(); // state variable to set account.
  let [ethBalance, setEthBalance] = useState()
  const [axs_address, setAxs_address]=useState()
  const [sky_address, setSky_address]=useState()
  
  
  const web3 = new Web3(
    Web3.givenProvider || 'http://127.0.0.1:8545'
  );
  const dx_address = dex.networks['5777'].address;
  const dx_abi = dex.abi;
  const dex_connect = new web3.eth.Contract(
    dx_abi,
    dx_address
  );
  
  async function load() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
    const accounts = await web3.eth.requestAccounts();

    setAccount(accounts[0]);
    console.log(accounts[0]);
    setEthBalance(web3.utils.fromWei(await web3.eth.getBalance(account)))
    console.log(ethBalance)
    let address;
    address= await dex_connect.methods.AxsToken().call()
    setAxs_address(address)
    address = await dex_connect.methods.SkyToken().call()
    setSky_address(address);

  }
  load();

  
  
  const axs_abi = axsToken.abi;
  
  const sky_abi = skyToken.abi;

  console.log(sky_address)

 
  const Axs_connect =  new web3.eth.Contract(
    axs_abi,
    axs_address
  );
  const Sky_connect = new web3.eth.Contract(
    sky_abi,
    sky_address
  );


  return (
    <div className="App true">
      <Router>
        <br></br>
        <Header account={account} web3={web3}/>
        <br></br>
        <div className="container">
          <Container>
            <Row>
              
                <Route path='/' exact component={()=> <Buy web3={web3} ethBalance={ethBalance} account={account} dex={dex_connect}  axsToken={Axs_connect} axsAddress={axs_address} skyAddress={sky_address}skyToken={Sky_connect}/>}></Route>
                <Route path='/buy' exact component= {()=> <Buy web3={web3} ethBalance={ethBalance} account={account} dex={dex_connect} axsAddress={axs_address} skyAddress={sky_address} axsToken={Axs_connect} skyToken={Sky_connect}/>}></Route>
                <Route path='/swap' exact component={()=> <Swap web3={web3} ethBalance={ethBalance} account={account} dex={dex_connect} axsAddress={axs_address} skyAddress={sky_address}axsToken={Axs_connect} skyToken={Sky_connect}/>}></Route>
                <Route path='/sell' exact component={()=> <Sell web3={web3} ethBalance={ethBalance} account={account} dex={dex_connect} axsAddress={axs_address} skyAddress={sky_address}axsToken={Axs_connect} skyToken={Sky_connect}/>}></Route>
                <Route path='/info' exact component={Info}></Route>
              
            </Row>
          </Container>
        </div>
      </Router>
    </div>
  );
}

export default App;
