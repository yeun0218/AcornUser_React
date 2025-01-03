import React from "react";
import ContactUs from "../aboutshop/ContactUs";

import ServiceCards from "./ServiceCards";
import '../../../assets/styles/Service/ServiceCard.css'
const Service = () => {
    return (
        <div>
            <ServiceCards/>
            <ContactUs />
        </div>
    );
};

export default Service;