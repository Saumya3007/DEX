import React, { useState } from "react"


export default function Sell(props) {

  const [tokenBalance, setTokenBalance] = useState()
  const [excRate, setExcRate] = useState()
  const [tokenName, setTokenName] = useState()
  const [output, setOutput] = useState()
  const serviceCharge=0.0005;

  const handleChange = async (e) => {
    const token = e.target.value
    if (token === "SKY") {
        setTokenName("SKY")
      const rate = 50;
      setExcRate(rate)

      const balance = await props.skyToken.methods.balanceOf(props.account).call()
      setTokenBalance(props.web3.utils.fromWei(balance, "ether"))
    } else if (token === "AXS") {
      setTokenName("AXS")
      const rate = 100;
      setExcRate(rate)

      const balance = await props.axsToken.methods.balanceOf(props.account).call()
      setTokenBalance(props.web3.utils.fromWei(balance, "ether"))
    }
  }

  const handleInput = (e) => {
    const input = e.target.value
    setOutput(input / excRate)
  }

  const sellTokens = async (e) => {
    e.preventDefault()
    let tokenAmount = (output * excRate).toString()
    tokenAmount = props.web3.utils.toWei(tokenAmount, "ether")
    console.log(tokenAmount);
    let ethAmount = props.web3.utils.toWei(output.toString(), "ether")
    if (tokenName === "SKY") {
      await props.skyToken.methods
        .approve(props.dex.options.address, tokenAmount)
        .send({ from: props.account })

      await props.dex.methods
        .sell(props.skyAddress,tokenAmount, ethAmount)
        .send({ from: props.account })
      const balance = await props.skyToken.methods.balanceOf(props.account).call()
      setTokenBalance(props.web3.utils.fromWei(balance))
      console.log(balance)
    } else if (tokenName === "AXS") {

      await props.axsToken.methods
        .approve(props.dex.options.address, tokenAmount)
        .send({ from: props.account })

      await props.dex.methods
        .sell(props.axsAddress,tokenAmount,ethAmount)
        .send({ from: props.account })
      const balance = await props.axsToken.methods.balanceOf(props.account).call()
      setTokenBalance(props.web3.utils.fromWei(balance, "ether"))
    }
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
            <main
              className="ml-auto mr-auto col-lg-12"
              style={{ maxWidth: "500px" }}
            />
          </div>
          <div className="mt-2 mb-2 mr-4" style={{ textAlign: "right" }}>
            <a href="/info">
              <img src="info.png" height="20" alt="Info"></img>
            </a>
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
            <form onSubmit={sellTokens}>
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
                  <b> Balance: {tokenBalance} </b>
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
                    <b> Balance: {props.ethBalance}</b>
                  </span>
                </div>
              </div>
              <div className="mb-4 input-group">
                <input
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
                    style={{ height: "38px", borderRadius: "4px" }}
                  >
                    &nbsp;
                    <img alt="logo" src="eth.png" height="32"></img> &nbsp; ETH
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
                  &nbsp;Sell
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
