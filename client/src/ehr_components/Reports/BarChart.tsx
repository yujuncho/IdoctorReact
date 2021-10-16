import React, { useState } from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryTooltip,
  VictoryContainer
} from "victory";

import Select from "../ui/Select";

interface BarChartProps {
  title: string;
  data: Array<any> | undefined;
  formatLabel: ({ datum }: { datum: any }) => string;
}

enum TIMEFRAME {
  WEEK = "w",
  MONTH = "m",
  YEAR = "y"
}

const timeframeOptions = [
  { value: TIMEFRAME.WEEK, label: "Last week" },
  { value: TIMEFRAME.MONTH, label: "Last month" },
  { value: TIMEFRAME.YEAR, label: "Last year" }
];

export default function BarChart(props: BarChartProps) {
  const [timeframe, setTimeframe] = useState(TIMEFRAME.WEEK);
  const { title, data, formatLabel } = props;

  const todaysDate = new Date();
  let oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  let oneWeekRange: [Date, Date] = [oneWeekAgo, todaysDate];
  let oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  let oneMonthRange: [Date, Date] = [oneMonthAgo, todaysDate];
  let oneYearAgo = new Date();
  oneYearAgo.setUTCFullYear(oneYearAgo.getUTCFullYear() - 1);
  let oneYearRange: [Date, Date] = [oneYearAgo, todaysDate];

  const chartRanges = {
    w: { domain: oneWeekRange, barWidth: 30 },
    m: { domain: oneMonthRange, barWidth: 15 },
    y: { domain: oneYearRange, barWidth: 1 }
  };

  const handleSelectChange = (
    name: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTimeframe(event.target.value as TIMEFRAME);
  };

  return (
    <div className="card mt-4">
      <div className="card-header w-100 d-sm-flex align-items-center justify-content-center">
        <h2 className="text-left m-0">{`${title}`}</h2>
        <div className="ml-auto mt-3 mt-sm-0">
          <Select
            name="timeframe"
            placeholder="Select timeframe"
            value={timeframe}
            options={timeframeOptions}
            onChange={handleSelectChange}
          />
        </div>
      </div>
      <VictoryChart
        height={400}
        width={800}
        theme={VictoryTheme.material}
        scale={{ x: "time" }}
        domain={{ x: chartRanges[timeframe].domain }}
        domainPadding={{ x: 30 }}
        containerComponent={<VictoryContainer className="w-100 h-auto" />}
        animate={{ duration: 1000, onLoad: { duration: 0 } }}
      >
        <VictoryBar
          barWidth={chartRanges[timeframe].barWidth}
          data={data || []}
          x={data => new Date(data.date)}
          y="count"
          labels={formatLabel}
          labelComponent={
            <VictoryTooltip
              flyoutPadding={{ left: 10, right: 10, top: 5, bottom: 5 }}
            />
          }
        />
      </VictoryChart>
      {data === undefined && (
        <div
          className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center p-3 bg-secondary"
          style={{ opacity: "70%" }}
        >
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
