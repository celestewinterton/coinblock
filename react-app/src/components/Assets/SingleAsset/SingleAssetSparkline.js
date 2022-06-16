import { LineChart, Line, Tooltip, XAxis, ResponsiveContainer } from 'recharts';
import { format, addDays } from 'date-fns'
import { round, currency } from '../../../utils/calc'


const Sparkline = ({data}) => {

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const days = 6-Math.floor(payload[0].payload.i/(newData.length/7)) // seeing what day the data is from for 7d sparkline

      return (
        <div className="custom-tooltip card">
          <p className="tooltip-value">{`${currency(round(payload[0].value))}`}</p>
          <p className="tooltip-date">{`${format(addDays(new Date(), -days), 'MMM d y')}`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = () => {
    return (
      <>{format(new Date(), 'MMM d y')}</>
    )
  }

  let newData = data.map((data, i) => {
    return {i: i, value: data}
  })

  // const formatXAxis = (axis) => {format(axis, 'MMM d y')}
  console.log("Sparkline data", newData)

  return (
    <ResponsiveContainer height={300} width="100%">
      <LineChart width={500} height={300} data={newData} margin={{ top: 30, right: 0, left: 0, bottom: 5 }}>
        <Line type="monotone" dataKey="value" stroke="#0052FF" dot={false} name="Value" />
        <XAxis dataKey="i" tick={false} />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Sparkline;
