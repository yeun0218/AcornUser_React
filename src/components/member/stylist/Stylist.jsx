import React from "react";
import ContactUs from "../aboutshop/ContactUs";
import Header from "../../common/Header.jsx";
import DesignerTab from "./DesignerTab";

const About = () => {
    return (
        <div>
            <Header />
            <DesignerTab />
            <ContactUs />
        </div>
    );
};

export default About;