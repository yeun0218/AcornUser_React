import React from "react";
import BrandStory from "../aboutshop/BrandStory";
import Business from "../aboutshop/Business";
import Story from "../aboutshop/Story";
import ContactUs from "../aboutshop/ContactUs";
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