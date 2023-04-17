import React, { useEffect, useState } from "react";
import { CoffeeEvent } from "./coffee-event";
import styled from "styled-components";
import { CalendarLtr32Regular } from "@fluentui/react-icons";
import { getEvents } from "./coffee.dao";

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${({ height }: { height: number }) => height}px;
  padding: 15px;
  border-radius: 20px;
  box-shadow: 3px 3px 33px rgba(0, 0, 0, 0.04);

  @media (max-width: 600px) {
    padding: 0;
  }
`;

const EventTitle = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond&display=swap");
  font-family: "Cormorant Garamond", serif;
  font-weight: 700;
  font-size: 36px;
  margin: 0 0 10px 0;
`;

const CoffeeButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #d4b9ff;
  gap: 10px;
  border: 1px solid #000000;
  border-radius: 5px;
  font-weight: 700;
  font-size: 15px;
  padding: 16px 80px;
  transition: background 0.2s, box-shadow 0.2s;
  margin-bottom: 15px;
  margin-top: 15px;

  :hover {
    background: #dbc4ff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    cursor: pointer;
  }

  :active {
    background: #a063ff;
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
      0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
  }
`;

const EventHolder = styled.div`
  border-top: 1px solid #dcdcdc;
  border-bottom: 1px solid #dcdcdc;
  overflow-y: scroll;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* width */

  ::-webkit-scrollbar {
    width: 10px;
    transform: rotate(180deg);
  }

  /* Track */

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */

  ::-webkit-scrollbar-thumb {
    background: #d4b9ff;
    border: 1px solid black;
    border-radius: 2px;
  }

  /* Handle on hover */

  ::-webkit-scrollbar-thumb:hover {
    background: #dbc4ff;
    border: 2px solid black;
    border-radius: 2px;
  }
`;

export function CoffeeCalendar({ height }: { height: number }) {
  const [coffeeEvents, setCoffeeEvents] = useState([] as Array<JSX.Element>);
  function moreEventsAction() {
    window.open(
      "https://calendar.google.com/calendar/u/0/r?cid=fs1sc4j8ff3gpgkknc8gvg9c6lljko23@import.calendar.google.com"
    );
  }
  useEffect(() => {
    getEvents().then((events) => {
      const newCoffeeEvents = [] as Array<JSX.Element>;
      for (const event of events) {
        newCoffeeEvents.push(<CoffeeEvent event={event} key={event.id} />);
      }
      newCoffeeEvents.push(
        <CoffeeButton key={"more-events"} onClick={moreEventsAction}>
          Subscribe to Calendar
          <CalendarLtr32Regular />
        </CoffeeButton>
      );
      setCoffeeEvents(newCoffeeEvents);
    });
  }, []);

  return (
    <CalendarContainer height={height}>
      <EventTitle>Events</EventTitle>
      <EventHolder>{coffeeEvents}</EventHolder>
    </CalendarContainer>
  );
}
