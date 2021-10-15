import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryTooltip,
  VictoryContainer
} from "victory";

interface BarChartProps {
  title: string;
  data: Array<any>;
  formatLabel: ({ datum }: { datum: any }) => string;
}

export default function BarChart(props: BarChartProps) {
  const { title, data, formatLabel } = props;

  const todaysDate = new Date();
  let sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  let oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  let oneYearAgo = new Date();
  oneYearAgo.setUTCFullYear(oneYearAgo.getUTCFullYear() - 1);

  return (
    <div className="card mt-4">
      <div className="card-header w-100 d-flex align-items-center justify-content-center">
        <h2 className="text-left m-0">{`${title}`}</h2>
        <div className="dropdown text-left ml-auto">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Dropdown
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button className="dropdown-item" type="button">
              Action
            </button>
            <button className="dropdown-item" type="button">
              Another action
            </button>
            <button className="dropdown-item" type="button">
              Something else here
            </button>
          </div>
        </div>
      </div>
      <VictoryChart
        height={400}
        width={800}
        theme={VictoryTheme.material}
        scale={{ x: "time" }}
        domain={{ x: [oneMonthAgo, todaysDate], y: [0, 10] }}
        domainPadding={{ x: 30 }}
        containerComponent={<VictoryContainer className="w-100 h-auto" />}
      >
        <VictoryBar
          barRatio={0.1}
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
