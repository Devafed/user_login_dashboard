import React, { useState } from "react";
import ArrowIcons from "../assets/arrow-icons.png";
import DashboardIcons from "../assets/dashboard-icons.png";
import LogoDesk from "../assets/logo-desk.png";
import LogoMble from "../assets/logo-mble.png";
import VideoIcons from "../assets/video-icons.png";
import SeatMetrix from "../assets/seat-metrix-icons.png";
import ResourceIcons from "../assets/resource-icons.png";
import FeeStipend from "../assets/fee-stipend-icons.png";
import FaqIcons from "../assets/faq-icons.png";
import CollapseIcons from "../assets/collapse-icons.png";
import CollapseLeftIcons from "../assets/collapse-left.png";
import ClosingRankIcons from "../assets/closing-ranks-icons.png";
import AllotmentIcons from "../assets/allotments-icons.png";
import "./sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [faqShow, setFaqShow] = useState(false);

  const handleTrigger = () => setIsOpen(!isOpen);
  const handleClick = () => setShow(!show);
  const handleClickFaq = () => setFaqShow(!faqShow);

  return (
    <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <div className="logo-header">
        <img src={isOpen ? LogoMble : LogoDesk} alt="menu-icons" />
        <div className="trigger" onClick={handleTrigger}>
          <img
            src={isOpen ? CollapseIcons : CollapseLeftIcons}
            alt="menu-icons"
          />
        </div>
      </div>
      <div className="menu-items">
        <div className="sidebar-position active">
          <img src={DashboardIcons} alt="menu-icons" />
          <span>Dashboard</span>
        </div>
        <div className="sidebar-position">
          <img src={VideoIcons} alt="menu-icons" />
          <span>video</span>
        </div>
        <div className={`menu-list ${show ? "show-dropdown" : ""}`}>
          <div className="menu-dropdown" onClick={handleClick}>
            <p>Tools</p>
            <img src={ArrowIcons} alt="arrow" />
          </div>
          <div className="sidebar-position">
            <img src={AllotmentIcons} alt="menu-icons" />
            <span>Allotments</span>
          </div>

          <div className="sidebar-position">
            <img src={ClosingRankIcons} alt="menu-icons" />
            <span>Closing Ranks</span>
          </div>
          <div className="sidebar-position">
            <img src={SeatMetrix} alt="menu-icons" />
            <span>Seat Metrix</span>
          </div>
          <div className="sidebar-position">
            <img src={FeeStipend} alt="menu-icons" />
            <span>Fee, Stipend & Bond</span>
          </div>
        </div>
        <div className={`menu-list ${faqShow ? "show-dropdown" : ""}`}>
          <div className="menu-dropdown" onClick={handleClickFaq}>
            <p>Faqs & Resources </p>
            <img src={ArrowIcons} alt="arrow" />
          </div>
          <div className="sidebar-position">
            <img src={FaqIcons} alt="menu-icons" />
            <span>FAQs</span>
          </div>
          <div className="sidebar-position">
            <img src={ResourceIcons} alt="menu-icons" />
            <span>Resources</span>
          </div>
        </div>
      </div>
    </div>
  );
}
