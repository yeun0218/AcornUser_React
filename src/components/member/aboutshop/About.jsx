import React from "react";
import BrandStory from "./BrandStory";
import Business from "./Business";
import Story from "./Story";
import ContactUs from "./ContactUs";
import Header from "../../common/Header.jsx";

const About = () => {
    return (
        <div>
            <Header />
            <BrandStory />
            <Business />
            <Story />
            <ContactUs />
        </div>
    );
};

export default About;