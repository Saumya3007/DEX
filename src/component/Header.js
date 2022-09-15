import React from "react"
import "./Dapp.css"
import "bootstrap/dist/css/bootstrap.min.css"

function Header(props) {
  
  return (
    <div className="container-nav">
      <div>
        <nav className=" navbar navbar text-light">
          
          <a
            className="mr-0 navbar-brand col-sm-3 col-md-2 text-light"
            href="/buy"
          ></a>
          Account : {props.account?.substring(0,8)}...  
        </nav>
      </div>
      
    </div>
  )
}
//hello


export default Header
