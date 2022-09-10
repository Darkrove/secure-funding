import React from "react";
import { Container } from "semantic-ui-react";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = props => {
    return (
        <Container>
            <Navbar />
            {props.children}
            <Footer />
        </Container>
    )
}

export default Layout;