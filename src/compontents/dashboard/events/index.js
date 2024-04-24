import React, { useState, useEffect } from "react";
import "../style.css";
import "./events.css";
import axios from "axios";
import * as moment from "moment";
import DateIcons from "../../assets/date-icons.png";
import ArrowDown from "../../assets/arrowDown.png";
import ArrowIcons from "../../assets/arrow-icons.png";
import { BsSearch } from "react-icons/bs";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState({});
  const [selectedValue, setSelectedValue] = useState();
  const [buttonStatus, setButtonStatus] = useState("past");
  const [searchVal, setSearchVal] = useState("");
  const [products, setProducts] = useState(events);
  const handleSearchClick = () => {
    if (searchVal === "") {
      setProducts(events);
      return;
    }
    const filterBySearch = events && events.filter((item) => {
      if (item.toString().toLowerCase().includes(searchVal.toLowerCase())) {
        return item;
      }
    });
    setProducts(filterBySearch);
  };
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const handelClick = (id) => {
    setOpen((prevShownComments) => ({
      ...prevShownComments,
      [id]: !prevShownComments[id],
    }));
  };
  const baseURL = "https://hire.zynerd.co.in/ui/info/counsellings";
  const token = localStorage.getItem("token");
  const headers = { Authorization: `${token}` };

  const clickActiveBtn = (...args) => {
    return args.filter((v) => v).join(" ");
  };

  const fetchInfo = async () => {
    const eventsURL =
      "https://hire.zynerd.co.in/ui/info/events?event_type=past&offset=0";
    try {
      let response = await axios.get(baseURL, { headers });
      let responseEvents = await axios.get(eventsURL, { headers });
      setEvents(response.data.data.counsellings);
      setData(responseEvents.data.data.events);
    } catch (error) {
      console.log(error);
    }
  };
  const pastInfo = async () => {
    setButtonStatus("past");
    const pastUrl =
      "https://hire.zynerd.co.in/ui/info/events?event_type=past&offset=0";
    try {
      let responseEvents = await axios.get(pastUrl, { headers });
      setData(responseEvents.data.data.events);
    } catch (error) {
      console.log(error);
    }
  };
  const todayInfo = async () => {
    setButtonStatus("today");
    const todayUrl =
      "https://hire.zynerd.co.in/ui/info/events?event_type=today&offset=0";
    try {
      let responseEvents = await axios.get(todayUrl, { headers });
      setData(responseEvents.data.data.events);
    } catch (error) {
      console.log(error);
    }
  };
  const upcomingInfo = async () => {
    setButtonStatus("upcoming");
    const upcomingUrl =
      "https://hire.zynerd.co.in/ui/info/events?event_type=upcoming&offset=0";
    try {
      let responseEvents = await axios.get(upcomingUrl, { headers });
      console.log(responseEvents,'responseEvents');
      setData(responseEvents.data.data.events);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfo();
  },[]);

  return (
    <div className="event-header">
      <div className="event-box">
        <h1>Events</h1>
        <div className="select-counselling-header">
          <select onChange={handleChange}>
            <option defaultValue={true}>Select Counseling</option>
            {events.map((slectItems, index) => {
              return (
                <option key={index} value={slectItems.id}>
                  {slectItems.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="search-tab-header">
          <div className="search-bar">
            <input
              placeholder="Search event"
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <BsSearch onClick={handleSearchClick} />
          </div>

          <div className="search-tab">
            <p
              onClick={(e) => pastInfo(e)}
              className={clickActiveBtn(
                "buttonStatus",
                buttonStatus === "past" && "active"
              )}
            >
              Past
            </p>
            <p
              onClick={(e) => todayInfo(e)}
              className={clickActiveBtn(
                "buttonStatus",
                buttonStatus === "today" && "active"
              )}
            >
              Today
            </p>
            <p
              onClick={(e) => upcomingInfo(e)}
              className={clickActiveBtn(
                "buttonStatus",
                buttonStatus === "upcoming" && "active"
              )}
            >
              Upcoming
            </p>
          </div>
        </div>

        <div className="events-list">
          {data.map((items, index) => {
            const monthStart = moment(
              items.start_time,
              "YYYY-MM-DD HH:mm:ss"
            ).format("LLL");
            console.log(monthStart,'monthStart');
            const monthEnd = moment(
              items.end_time,
              "YYYY-MM-DD HH:mm:ss"
            ).format("LLL");
            const setMonth = monthStart.slice(0, 3);
            const setDate = monthStart.slice(6 , 8);
            const setEndMonth = monthEnd.slice(0 , 3);
            const setEnddate = monthEnd.slice(6, 8);
            const setFullMonth = monthStart.slice(0, 5);
            const setTime = monthStart.slice(-8);
            const setFullMonthEnd = monthEnd.slice(0, 5);
            const setTimeEnd = monthEnd.slice(-8);
            return (
              <div
                className={`events-list-wrapper ${
                  open[items.id] ? "active" : ""
                }`}
                key={index}
                onClick={() => handelClick(items.id)}
              >
                <div className="events-date">
                  <div className="events-month-date">
                    <p>{setMonth}</p>
                    <h3>{setDate}</h3>
                  </div>
                  <img src={ArrowDown} alt="arrowdown" />
                  <div className="events-month-date">
                    <p>{setEndMonth}</p>
                    <h3>{setEnddate}</h3>
                  </div>
                </div>
                <div className="events-description">
                  <p>{items.description}</p>
                  <div className="events-city">
                    <h6>{items.counselling}</h6>
                  </div>
                  <div className="events-date-calender">
                    <img src={DateIcons} alt="dateicons" />
                    <div className="full-set-date">
                      <h3>
                        {setDate} {setFullMonth}, {setTime}{" "}
                      </h3>
                    </div>
                    <span> - </span>
                    <div className="full-set-date">
                      <h3>
                        {setEnddate} {setFullMonthEnd}, {setTimeEnd}
                      </h3>
                    </div>
                  </div>
                  {open[items.id] ? (
                    <div>
                      {items.links.map((value, index) => {
                        return (
                          <div
                            className="eligibility-btn-header"
                            key={value.tag}
                          >
                            {value.tag ? (
                              <button>
                                <a href={value.link}>{value.tag}</a>
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    ""
                  )}
                  <div
                    className={`arrow-header ${
                      open[items.id] ? "arrow-up" : ""
                    }`}
                  >
                    <img src={ArrowIcons} alt="arrow" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
