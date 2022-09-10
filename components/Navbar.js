import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Router, Link } from "../routes";

function Navbar() {
  return (
    <Menu borderless stackable style={{ marginTop: "10px" }}>
      <Link route="/">
        <a className="item">
          <img alt="logo" src='https://react.semantic-ui.com/logo.png' />
          <p style={{ marginLeft: "8px", fontSize: "1.5rem", fontWeight: "bold", color: "#41c1b6" }}>
            SecureFunding
          </p>
        </a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/">
          <a className="item" style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#41c1b6" }}>
            Campaigns
          </a>
        </Link>
        <Link route="/campaigns/new">
          <a className="item">
            <Icon name="add" color="teal" />
          </a>
        </Link>
      </Menu.Menu>
    </Menu>
  )
}

export default Navbar;