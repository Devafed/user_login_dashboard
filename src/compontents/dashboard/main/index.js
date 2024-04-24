import React, { useState, useEffect } from "react";
import "../style.css";
import "./main.css";
import axios from "axios";
import * as moment from "moment";
import PlayIcon from "../../assets/play-icon.png";
import { IoCloseOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { TiTick } from "react-icons/ti";

export default function Main() {
  const [modal, setModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [info, setInfo] = useState();
  const [userName, setUsername] = useState();
  const [video, setVideo] = useState([]);
  const [counselling, setCounselling] = useState([]);
  const [active, setActive] = useState(0);

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };

  const fetchInfo = async () => {
    const baseURL = "https://hire.zynerd.co.in/ui/info";
    const token = localStorage.getItem("token");
    const headers = { Authorization: `${token}` };
    try {
      let response = await axios.get(baseURL, { headers });
      setInfo(response.data);
      setUsername(response.data.data.user_name);
      setVideo(response.data.data.videos);
      setCounselling(response.data.data.counselling_timeline);
    } catch (error) {
      console.log(error);
    }
  };
  const handelClick = (id) => {
    setModal((prevShownComments) => ({
      ...prevShownComments,
      [id]: !prevShownComments[id],
    }));
    setActive(id);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="admin__main">
      <div className="username-header">
        <h1>Hello {userName ? userName.slice(0, 7) : ""}</h1>
        <p>Get all your NEET PG info here!</p>
      </div>
      <div className="user-details">
        <h2>ZyNerd Bulletins</h2>
        <p>
          MCC's notice for PwD candidates - Disability Evaluation and Online
          Certificates Open
        </p>
        <div className="telegram-link">
          <p>
            Telegram Channel For ZyNerd Subscribers -{" "}
            <a
              href="https://t.me/zynerdneetugchannel"
              target="_blank"
              rel="noreferrer"
            >
              Click here
            </a>{" "}
            to join
          </p>
        </div>
        <div className="rank-header">
          <h3>Ranks</h3>
          <ul>
            <li>
              Andhra Pradesh had 30% reservation in Clinical seats and 50%
              reservation in Non clinical seats for Inservice Candidates.
            </li>
            <li>
              Round 1 and Round 2 of service quota were separate. However ranks
              mentioned were the same State ranks. No incentives of 10, 20, 30.
            </li>
            <li>
              NEET PG Rank may be referred to as well as no service marks have
              been added. However Counselings ranks (State ranks) once released
              for each Quota (Govt / Management) would be the best reference.
            </li>
          </ul>
        </div>
        <div className="note-contact">
          <p>
            Please note that our support number has changed. Kindly check the
            ‘Contact Us’ link for our new support number.
          </p>
        </div>
      </div>
      <div className="counselling-video-header">
        <div className="counselling-header">
          <h4>Counselling Timeline</h4>

          <div className="timeline-header">
            {counselling.map((items, index) => {
              return (
                <VerticalTimeline key={index}>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    iconStyle={{ background: "#559822", color: "#fff" }}
                    icon={<TiTick />}
                  >
                    <h3 className="vertical-timeline-element-title">
                      {items.title}
                    </h3>
                    <p>{moment(items.event_date, "DD/MM/YYYY").format("ll")}</p>
                  </VerticalTimelineElement>
                </VerticalTimeline>
              );
            })}
          </div>
        </div>
        <div className="video-header">
          <h4>Videos</h4>

          {video.map((items, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  handelClick(items.id);
                }}
                className={`video-content ${
                  active === items.id || active 
                  === index? "active" : ''
                }`}
              >
                <div className="video-info">
                  <div className="video-thumb">
                    <img src={items.thumbnail_url} alt="thumbnail" />
                  </div>
                  <div className="video-text">
                    <h2>{items.title}</h2>
                    <p>{moment(items.created_at).startOf("day").fromNow()}</p>
                  </div>
                  <div className="mouse-play">
                    <img src={PlayIcon} alt="play-icons" />
                  </div>
                </div>

                {modal[items.id] ? (
                  <section className="modal__bg">
                    <div className="modal__align">
                      <div className="modal__content">
                        <IoCloseOutline
                          className="modal__close"
                          arial-label="Close modal"
                          onClick={handelClick}
                        />
                        <div className="modal__video-align">
                          {videoLoading ? (
                            <div className="modal__spinner">
                              <BiLoaderAlt className="modal__spinner-style" />
                            </div>
                          ) : null}
                          <iframe
                            className={`modal__video-style`}
                            onLoad={spinner}
                            loading="lazy"
                            width="600"
                            height="300"
                            src={items.video_url.replace("watch?v=", "embed/")}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </section>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
