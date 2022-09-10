import React from "react";
import Navbar from "./Navbar";
import { Container } from "semantic-ui-react";

const Layout = props => {
    return (
        <Container>
            <Navbar />
            {props.children}
            <h1>I'm footer</h1>
        </Container>
    )
}

export default Layout;