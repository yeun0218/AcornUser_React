import React, { useEffect, useState } from "react";
import EventAlert from "./EventAlert.jsx";
import Header from "../../common/Header.jsx";
import SliderBanner from "./SliderBanner.jsx";
import { CONTAINER_TAB } from "../../../assets/styles/MainStyle.jsx";
import TabContent from "./TabContent.jsx";
import Footer from "../../common/Footer.jsx";

const Main = ({ isLogin, logout, no, isAdmin }) => {
  let [alert, setAlert] = useState(true);

  /* navbar 위에 이벤트알림 Alert */
  useEffect(() => {
    let event = setTimeout(() => {
      setAlert(false);
    }, 10000);
    return () => {
      clearTimeout(event);
    }; /* 컴포넌트 mount 시 1회만 실행하고 싶으면 이렇게! */
  }, []);

  return (
    <>
      {alert === true ? (
        <>
          <EventAlert />
        </>
      ) : null}

      <Header isLogin={isLogin} logout={logout} />

      <SliderBanner />

      <CONTAINER_TAB>
        <TabContent />
      </CONTAINER_TAB>

      {/* <SocialBanner /> */}

      <Footer isLogin={isLogin} logout={logout} />
    </>
  );
};

export default Main;
