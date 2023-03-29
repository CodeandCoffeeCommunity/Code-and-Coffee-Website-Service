import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { People24Filled } from "@fluentui/react-icons";
import { Share24Filled } from "@fluentui/react-icons";
import { MeetupEvent } from "../lambda/dao/meetup.dao";
import { WebConf } from "./web-conf";

const PeopleIcon = People24Filled;
const ShareIcon = Share24Filled;

const EventContainer = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap");

  font-family: "Source Sans Pro", sans-serif;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 15px;
  border-bottom: 1px solid #dcdcdc;
  padding-bottom: 15px;
  padding-top: 15px;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const BreakContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;

  @media (max-width: 600px) {
    justify-content: left;
  }
`;

const DateContainer = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DateNumber = styled.p`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
`;

const DateMonth = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 400;
  color: #6c6c6c;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60px;
`;

const IconBreakContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;

  @media (max-width: 600px) {
    display: none;
  }
`;

const CityIcon = styled.img`
  box-shadow: 0 0 16px 16px white inset;
  border-radius: 2px;
`;

const SmallCityIcon = styled.img`
  box-shadow: 0 0 16px 16px white inset;
  border-radius: 2px;
  width: 30px;
  height: 30px;
  display: none;

  @media (max-width: 600px) {
    display: block;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  gap: 10px;

  @media (max-width: 600px) {
    align-items: center;
  }
`;

const DateInfo = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 400;
  color: #6c6c6c;
  font-size: 16px;
  margin: 0;
  align-items: end;
  gap: 10px;

  @media (max-width: 600px) {
    font-size: 14px;
    text-align: center;
  }
`;

const EventInfo = styled.p`
  font-weight: 700;
  font-size: 24px;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 20px;
    text-align: center;
  }
`;

const DescriptionInfo = styled.p`
  color: #6c6c6c;
  font-weight: 400;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 14px;
    text-align: center;
  }
`;

const RsvpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;

  @media (max-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const RsvpBreakContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CityContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CityLabel = styled.p`
  font-weight: 400;
  margin: 0;
  font-size: 12px;
  color: #6c6c6c;
`;

const AttendeeContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

const AttendeeCount = styled.p`
  font-weight: 700;
  margin: 0 0 0 5px;
  font-size: 15px;
`;

const AttendeeLabel = styled.p`
  font-weight: 400;
  margin: 0;
  font-size: 15px;
  color: #6c6c6c;
  padding-left: 4px;
`;

const EventImage = styled.img`
  max-width: 111px;
  max-height: 74px;
  border-radius: 5px;
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
  padding: 8px 16px;
  transition: background 0.2s, box-shadow 0.2s;

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

const MonthShortFormatter = new Intl.DateTimeFormat("default", {
  month: "short",
});
const MonthLongFormatter = new Intl.DateTimeFormat("default", {
  month: "long",
});
const WeekdayFormatter = new Intl.DateTimeFormat("default", {
  weekday: "long",
});
const DayFormatter = new Intl.DateTimeFormat("default", { day: "numeric" });
const HourFormatter = new Intl.DateTimeFormat("default", {
  hour: "numeric",
  hour12: true,
  minute: "2-digit",
});

const EVENT_DESCRIPTION_LENGTH = 125;

export function CoffeeEvent({ event }: { event: MeetupEvent }) {
  const [iconImage, setIconImage] = useState(
    undefined as undefined | ReactNode
  );
  const [smallIconImage, setSmallIconImage] = useState(
    undefined as undefined | ReactNode
  );
  function rsvpAction() {
    window.open(event.eventUrl, "_blank");
  }

  useEffect(() => {
    fetch(`${WebConf.rootUrl}/city-icons/${event.group.id}.png`).then(
      (response) => {
        if (response.ok) {
          setIconImage(
            <CityIcon
              src={`${WebConf.rootUrl}/city-icons/${event.group.id}.png`}
              alt={`${event.group.city} Icon`}
            />
          );
          setSmallIconImage(
            <SmallCityIcon
              src={`${WebConf.rootUrl}/city-icons/${event.group.id}.png`}
              alt={`${event.group.city} Icon`}
            />
          );
        }
      }
    );
  }, []);

  const date = new Date(event.dateTime);
  const eventDateString = `${WeekdayFormatter.format(
    date
  )}, ${MonthLongFormatter.format(date)} ${DayFormatter.format(
    date
  )} at ${HourFormatter.format(date)}`;
  const descriptionString =
    event.description.length > EVENT_DESCRIPTION_LENGTH
      ? event.description.substring(0, EVENT_DESCRIPTION_LENGTH) + " ..."
      : event.description;
  return (
    <EventContainer>
      <BreakContainer>
        <IconBreakContainer>
          <DateContainer>
            <DateNumber>{DayFormatter.format(date)}</DateNumber>
            <DateMonth>{MonthShortFormatter.format(date)}</DateMonth>
          </DateContainer>
          <IconContainer>{iconImage}</IconContainer>
        </IconBreakContainer>
        <InfoContainer>
          <DateInfo>
            {smallIconImage}
            {eventDateString}
          </DateInfo>
          <EventInfo>{event.title}</EventInfo>
          <DescriptionInfo>{descriptionString}</DescriptionInfo>
        </InfoContainer>
      </BreakContainer>
      <RsvpContainer>
        <EventImage src={event.imageUrl} alt="rsvp" />
        <RsvpBreakContainer>
          <CityContainer>
            <CityLabel>
              {event.venue.city}, {event.venue.state.toUpperCase()}
            </CityLabel>
          </CityContainer>
          <AttendeeContainer>
            <PeopleIcon />
            <AttendeeCount>{event.going}</AttendeeCount>
            <AttendeeLabel>attendees</AttendeeLabel>
          </AttendeeContainer>
          <CoffeeButton onClick={rsvpAction}>
            RSVP
            <ShareIcon />
          </CoffeeButton>
        </RsvpBreakContainer>
      </RsvpContainer>
    </EventContainer>
  );
}
