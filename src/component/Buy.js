import React, {  useState } from "react"

export default function Buy(props) {
  
  const [tokenBalance, setTokenBalance] = useState()
  const [excRate, setExcRate] = useState()
  const [tokenName, setTokenName]= useState()
  const [output, setOutput] = useState()
  const serviceCharge= 0.0005;
  const [ethBalance,setEthBalance]=useState()
  console.log(props);
  
  const handleChange = async (e) => {
    const token = e.target.value
    const balance = await props.axsToken.methods.balanceOf(props.account).call();
      console.log(balance)
    
    if (token === "AXS") {
      setTokenName("AXS")
      const rate = 20;
      setExcRate(rate);
      const balance = await props.axsToken.methods.balanceOf(props.account).call();
      console.log(balance)
      setTokenBalance(props.web3.utils.fromWei(balance, "ether"));
    } else if (token === "SKY") {
      setTokenName("SKY")
      const rate = 10;
      setExcRate(rate)

      const balance = await props.skyToken.methods.balanceOf(props.account).call()
      setTokenBalance(props.web3.utils.fromWei(balance))
      console.log(balance)
    }
  }

  const handleInput = (e) => {
    const input = e.target.value
    setOutput(input * excRate)
  }

  const buyTokens = async (e) => {
    e.preventDefault()
    let ethAmount = ((output / excRate)+serviceCharge).toString()
    ethAmount = props.web3.utils.toWei(ethAmount, "ether")
    const tokenAmount = props.web3.utils.toWei(output.toString(), "ether")
    console.log(props.skyAddress)
    if (tokenName === "SKY") {
      await props.dex.methods
        .buy(props.skyAddress, tokenAmount)
        .send({ from: props.account, value: ethAmount })
      const balance = await props.skyToken.methods.balanceOf(props.account).call()
      setTokenBalance(props.web3.utils.fromWei(balance))
      console.log(balance)
        
    } else if (tokenName === "AXS") {
      await props.dex.methods
        .buy(props.axsAddress, tokenAmount)
        .send({ from: props.account, value: ethAmount})
      const balance = await props.axsToken.methods.balanceOf(props.account).call();
      console.log(balance)
      setTokenBalance(props.web3.utils.fromWei(balance, "ether"));
    }
    setEthBalance(props.web3.utils.fromWei(await props.web3.eth.getBalance(props.account)))
    props.ethBalance=ethBalance;
    window.setTimeout(function () {
      window.location.reload()
    }, 3000)
  }
 
  

  return (
    <div className="container w-50 p-3">
      <div className style={{ borderRadius: "40px", width: "550px" }}>
        <div
          className="mt-2 mb-4 card"
          style={{
            backgroundColor: "rgb(252, 251, 251)",
            borderRadius: "40px",
          }}
        >
          <div className="row">
            <main className="ml-auto mr-auto col-lg-12" />
          </div>
          <div className="mt-2 mb-2 mr-4" style={{ textAlign: "right" }}>
            
          </div>
          <div className="ml-4 mr-4 d-flex justify-content-between">
            <a
              href="/buy"
              className=" btn btn-outline-primary btn-sm"
              tabIndex="-1"
              role="button"
              aria-disabled="true"
              style={{ borderRadius: "40px" }}
            >
              &nbsp;&nbsp;Buy&nbsp;&nbsp;
            </a>
            <a
              href="/sell"
              className=" btn btn-outline-primary btn-sm"
              tabIndex="-1"
              role="button"
              aria-disabled="true"
              style={{ borderRadius: "40px" }}
            >
              &nbsp;&nbsp;Sell&nbsp;&nbsp;
            </a>
            <a
              href="/swap"
              className=" btn btn-outline-primary btn-sm"
              tabIndex="-1"
              role="button"
              aria-disabled="true"
              style={{ borderRadius: "40px" }}
            >
              &nbsp;Swap&nbsp;
            </a>
          </div>
          <div className="card-body">
            <form onSubmit={buyTokens}>
              <div>
                <label
                  className="float-left"
                  style={{ fontSize: "12px", alignSelf: "left" }}
                >
                  <b>Input</b>
                </label>
                <span
                  className="float-right text-muted"
                  style={{ fontsize: "12px" }}
                >
                  <b> Balance: {props.ethBalance}</b>
                </span>
              </div>
              <div className="mb-4 input-group">
                <input
                  type="number"
                  onChange={handleInput}
                  className="form-control"
                  placeholder="0"
                  required
                  style={{ height: "38px", borderRadius: "4px" }}
                />
                <div className="input-group-append">
                  <div
                    className="input-group-text"
                    style={{ height: "38px", borderRadius: "4px" }}
                  >
                    &nbsp;<img alt="logo" src="https://download.logo.wine/logo/Ethereum/Ethereum-Logo.wine.png" height="32"></img>{" "}
                    &nbsp; ETH
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <label
                    className="float-left"
                    style={{ fontSize: "12px", textAlign: "left" }}
                  >
                    <b>Output</b>
                  </label>
                  <span
                    className="float-right text-muted"
                    style={{ fontsize: "12px" }}
                  >
                    <b> Balance: {tokenBalance}</b>
                  </span>
                </div>
                <div className="mb-4 input-group">
                  <input
                    id=""
                    type="text"
                    value={output}
                    className="form-control"
                    placeholder="0"
                    disabled="0"
                    style={{ height: "38px", borderRadius: "4px" }}
                  />
                  <div className="input-group-append">
                    <div
                      className="input-group-text"
                      style={{ height: "38px", borderRadius: "1px" }}
                    >
                      <div className=" css-tlfecz-indicatorContainer">
                        <svg height="20" width="20" />
                        <select onChange={handleChange} id="coins">
                          <option value="">select</option>
                          <option value="AXS">AXS</option>
                          <option value="SKY">SKY</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <span
                  className="float-left text-muted"
                  style={{ fontsize: "12px" }}
                >
                  Exchange Rate{" "}
                </span>
                <span
                  className="float-right text-muted"
                  style={{ fontsize: "12px" }}
                >
                  <b>
                    1 ETH = {excRate} {tokenName} &nbsp;
                  </b>
                </span>
              </div>
              <br></br>
              <div>
                <span
                  className="float-left mb-2 text-muted"
                  style={{ fontsize: "12px" }}
                >
                  Service Charge :&nbsp;<b>{serviceCharge}&nbsp; ETH</b>
                </span>
              </div>
              <div>
                <button
                  type="submit"
                  className="mt-2 btn btn-primary btn-block "
                  style={{
                    height: "38px",
                    backgroundColor: "rgb(0, 112, 173)",
                    borderRadius: "50px",
                  }}
                >
                  {" "}
                  &nbsp;Buy
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
 