import React from "react";
import { EventStats } from "./events.util";
import styled from "styled-components";

const Stat = styled.p`
  font-family: "Source Sans Pro", sans-serif;
  margin: 0;
`;

const StatsContainer = styled.div`
  margin-bottom: 20px;
  margin-left: 10px;
`;

export function CoffeeEventStats({ stats }: { stats: EventStats }) {
  console.log(stats);
  return (
    <StatsContainer>
      <Stat>Events: {stats.totalEvents}</Stat>
      <Stat>RSVPS: {stats.totalRSVPs}</Stat>
      <Stat>Active Chapters: {stats.totalActiveChapters}</Stat>
    </StatsContainer>
  );
}
