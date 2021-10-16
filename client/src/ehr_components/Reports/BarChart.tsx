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
  data: Array<any>;
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
    w: { domain: oneWeekRange, barRatio: 0.3 },
    m: { domain: oneMonthRange, barRatio: 0.1 },
    y: { domain: oneYearRange, barRatio: 0.01 }
  };

  const handleSelectChange = (
    name: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTimeframe(event.target.value as TIMEFRAME);
  };

  return (
    <div className="card mt-4">
      <div className="card-header w-100 d-flex align-items-center justify-content-center">
        <h2 className="text-left m-0">{`${title}`}</h2>
        <div className="ml-auto">
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
        domain={{ x: chartRanges[timeframe].domain, y: [0, 10] }}
        domainPadding={{ x: 30 }}
        containerComponent={<VictoryContainer className="w-100 h-auto" />}
        animate={{ duration: 1000, onLoad: { duration: 100 } }}
      >
        <VictoryBar
          barRatio={chartRanges[timeframe].barRatio}
          data={data}
          labels={formatLabel}
          labelComponent={
            <VictoryTooltip
              flyoutPadding={{ left: 10, right: 10, top: 5, bottom: 5 }}
            />
          }
        />
      </VictoryChart>
    </div>
  );
}
