import { color } from '@mui/system';
import Chart from 'react-apexcharts';

export const BarReport = (): JSX.Element => {
  const options = {
    options: {
      tooltip: {
        enabled: false,
      },
      dataLabels: {
        formatter: function (val) {
          return val + '%';
        },
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
      },
      chart: {
        toolbar: {
          show: false,
        },
        id: 'basic-bar',
      },
      xaxis: {
        categories: ['HF', 'MITP', 'SAAD', 'FYP'],
      },
    },
    series: [
      {
        name: 'Attendance %',
        data: [10, 60, 100, 30],
      },
    ],
  };

  return (
    <Chart
      options={options.options}
      series={options.series}
      type="bar"
      width="120%"
      height="auto"
    />
  );
};
