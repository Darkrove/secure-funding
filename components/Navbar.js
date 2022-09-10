import React from "react";
import { Menu } from "semantic-ui-react";

function Navbar() {
  return (
    <Menu borderless stackable style={{ marginTop: "10px" }}>
      <Menu.Item link>
        <img alt="logo" src='https://react.semantic-ui.com/logo.png' />
        <p style={{marginLeft: "8px", fontSize: "1.5rem", fontWeight: "bold"}}>Secure Funding</p>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          Campaigns
        </Menu.Item>
        <Menu.Item>
          +
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default Navbar;