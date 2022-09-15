import React, { useState } from "react"

export default function Swap(props) {
  const [tokenBalance, setTokenBalance] = useState()
  const [excRate, setExcRate] = useState()
  const [tokenName, setTokenName] = useState()
  const [output, setOutput] = useState()

  const [tokenBalance2, setTokenBalance2] = useState()
  const [excRate2, setExcRate2] = useState()
  const [tokenName2, setTokenName2] = useState()

  const handleChange = async (e) => {
    const token = e.target.value
    if (token === "SKY") {
      setTokenName("SKY")
      const rate = 1
      setExcRate(rate)

      const balance = await props.skyToken.methods.balanceOf(props.account).call()
      setTokenBalance(props.web3.utils.fromWei(balance, "ether"))
    } else if (token === "AXS") {
      setTokenName("AXS")
      const rate = 2
      setExcRate(rate)

      const balance = await props.axsToken.methods.balanceOf(props.account).call()
      setTokenBalance(props.web3.utils.fromWei(balance, "ether"))
    }
  }

  const handleInput = (e) => {
    const input = e.target.value
    setOutput(input * (excRate2 / excRate))
  }

  const handleChange2 = async (e) => {
    const token = e.target.value
    if (token === "SKY") {
      setTokenName2("SKY")
      const rate = 1;
      setExcRate2(rate)

      const balance = await props.skyToken.methods.balanceOf(props.account).call() //to start remote
      setTokenBalance2(props.web3.utils.fromWei(balance, "ether"))
    } else if (token === "AXS") {
      setTokenName2("AXS")
      const rate = 2;
      setExcRate2(rate)

      const balance = await props.axsToken.methods.balanceOf(props.account).call()
      setTokenBalance2(props.web3.utils.fromWei(balance, "ether"))
    }
  }

  const swapTokens = async (e) => {
    e.preventDefault()
    let tokenAmount = (output * (excRate / excRate2)).toString()
    tokenAmount = props.web3.utils.toWei(tokenAmount, "ether")
    console.log(tokenAmount)
    let tokenAmount2 = props.web3.utils.toWei(output.toString(), "ether")
    if (tokenName === "SKY" && tokenName2 === "AXS") {
      await props.skyToken.methods
        .approve(props.dex.options.address, tokenAmount)
        .send({ from: props.account })
      await props.dex.methods
        .swapToken(props.skyAddress, props.axsAddress,tokenAmount,tokenAmount2)
        .send({ from: props.account })
        const balance = await props.skyToken.methods.balanceOf(props.account).call() //to start remote
      setTokenBalance2(props.web3.utils.fromWei(balance, "ether"))
    } 
    else if (tokenName === "AXS" && tokenName2 === "AXS") {
      await props.axsToken.methods
        .approve(props.dex.options.address, tokenAmount)
        .send({ from: props.account })
      await props.skyToken.methods
        .approve(props.dex.options.address, tokenAmount)
        .send({ from: props.account })
      await props.dex.methods
        .swapToken(props.axsAddress, props.skyAddress,tokenAmount,tokenAmount2)
        .send({ from: props.account })
      const balance = await props.skyToken.methods.balanceOf(props.account).call() //to start remote
        setTokenBalance2(props.web3.utils.fromWei(balance, "ether"))
    }
    
    const balance = await props.axsToken.methods.balanceOf(props.account).call()
    setTokenBalance2(props.web3.utils.fromWei(balance, "ether"))
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
            <form onSubmit={swapTokens}>
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
                  <b>
                    {" "}
                    Balance: {tokenBalance} {tokenName}{" "}
                  </b>
                </span>
              </div>
              <div className="mb-4 input-group">
                <input
                  type="number"
                  onChange={handleInput}
                  className="form-control "
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
                        <option value="SKY">SKY</option>
                        <option value="AXS">AXS</option>
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
                    <b>
                      {" "}
                      Balance: {tokenBalance2} {tokenName2}
                    </b>
                  </span>
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
                      style={{ height: "38px", borderRadius: "1px" }}
                    >
                      <div className=" css-tlfecz-indicatorContainer">
                        <svg height="20" width="20" />
                        <select onChange={handleChange2} id="coins">
                          <option value="">select</option>
                          <option value="SKY">SKY</option>
                          <option value="AXS">AXS</option>
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
                    {" "}
                    1 {tokenName} = {excRate2 / excRate} {tokenName2} &nbsp;
                  </b>
                </span>
              </div>
              <br></br>
              <div>
                <span
                  className="float-left mb-2 text-muted"
                  style={{ fontsize: "12px" }}
                >
                  Service Charge :&nbsp;<b>0&nbsp; ETH</b>
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
                  &nbsp;Swap
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
