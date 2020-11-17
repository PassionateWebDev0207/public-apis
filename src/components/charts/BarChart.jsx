import React from 'react';
import { BarChart, Bar, Tooltip } from 'recharts';
import PropTypes from 'prop-types';

const BarChartComponent = ({data}) => {
  return (
    <BarChart
      width={220}
      height={220}
      data={data}
      margin={{
        top: 20, right: 10, left: 10, bottom: 20,
      }}
    >
      <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
      <Bar dataKey="uv" fill="#82ca9d" background={{ fill: '#eee' }} />
      <Tooltip />
    </BarChart>
  );
}

BarChartComponent.prototype = {
  data: PropTypes.array
}

BarChartComponent.defaultProps = {
  data: [
    { name: 'Page A', uv: 4000, pv: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398 },
    { name: 'Page C', uv: 2000, pv: 9800 },
    { name: 'Page D', uv: 2780, pv: 3908 }
  ]
}

export default React.memo(BarChartComponent);