import React, {useEffect} from "react";
import {Chart} from "frappe-charts";
import {Container} from "@chakra-ui/react";

import {getWeekLimits} from "../../Utils/DateOperations";

const MonthWise = () => {
  const weekLimits = getWeekLimits(new Date());
  const heatmap = null;

  useEffect(() => {
    new Chart("#heatmap", {
      type: "heatmap",
      title: "Activities",
      data: {
        dataPoints: {
          "1654232400": 100,
          "1654335312": 500,
        },
        // object with timestamp-value pairs
        start: weekLimits.inicio,
        end: weekLimits.fin, // Date objects
      },
      countLabel: "Logs",
      radius: 5,
      height: 200,
      discreteDomains: 0, // default: 1
      //colors: ["#ebedf0", "#c0ddf9", "#73b3f3", "#3886e1", "#17459e"],
      colors: ["#dffeec", "#90edb3", "#65e495", "#3cdd78", "#22c35e"],
      // Set of five incremental colors,
      // preferably with a low-saturation color for zero data;
      // def: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']
    });
  }, []);

  return (
    <Container>
      <div id="heatmap"/>
    </Container>
  );
};

export default MonthWise;
