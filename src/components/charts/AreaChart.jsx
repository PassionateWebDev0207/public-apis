import React from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import PropTypes from 'prop-types';

const AreaChartComponent = ({data}) => {
  return (
    <ResponsiveContainer width='100%' height={320}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
}

AreaChartComponent.prototype = {
  width: PropTypes.number,
  data: PropTypes.array
}

AreaChartComponent.defaultProps = {
  data: [
    { name: 'Page A', value: 4000},
    { name: 'Page B', value: 3000},
    { name: 'Page C', value: 2000},
    { name: 'Page D', value: 2780}
  ]
}

export default React.memo(AreaChartComponent);