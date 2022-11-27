import Chart from 'react-apexcharts';

export const BarReport = (): JSX.Element => {
  const options = {
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: ['HF', 'MITP', 'SAAD', 'FYP'],
      },
    },
    series: [
      {
        name: 'series-1',
        data: [10, 60, 100, 30],
      },
    ],
  };

  return (
    <Chart
      options={options.options}
      series={options.series}
      type="bar"
      width="500"
    />
  );
};
