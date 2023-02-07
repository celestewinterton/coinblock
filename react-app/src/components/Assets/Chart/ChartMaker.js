import { LineChart, Line, Tooltip, XAxis, ResponsiveContainer } from "recharts";
import { round, currency } from "../../../utils/calc";

const ChartMaker = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // console.log(payload, label, active)
      return (
        <div className="custom-tooltip card">
          <p className="tooltip-value">{`${
            isNaN(payload[0].value) ? 0 : currency(round(payload[0].value))
          }`}</p>
          <p className="tooltip-date">{`${label}`}</p>
        </div>
      );
    }
    return null;
  };

  // const formatXAxis = (axis) => {format(axis, 'MMM d y')}

  return (
    <ResponsiveContainer height={400} width="100%">
      <LineChart
        width={500}
        height={400}
        data={data}
        margin={{ top: 30, right: 0, left: 0, bottom: 5 }}
      >
        <Line
          type="monotone"
          dataKey="value"
          stroke="#0052FF"
          dot={false}
          name="Value"
        />
        <XAxis dataKey="date" />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartMaker;
