import { Grid, Box, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
// import { Bar } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

interface data {
  options: ChartOptions<'line'>;
  data: ChartData<'line'>;
}

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'First dataset',
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
    },
    {
      label: 'Second dataset',
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: '#742774',
    },
  ],
};

export const BarReport = (): JSX.Element => {
  const { user } = useAuth0();
  const [barLabel, setBarLabel] = useState();

  return (
    <>
      <Typography>{user.name}</Typography>
      {/* <Bar
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: user.name,
            },
            legend: {
              display: false,
            },
          },
        }}
      /> */}
    </>
  );
};
