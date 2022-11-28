import Chart from 'react-apexcharts';

export const PieReport = (): JSX.Element => {
  const options = {
    options: {
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
      },
      tooltip: {
        enabled: false,
      },
    },
    labels: ['HF', 'MITP', 'SAAD', 'FYP'],
    series: [10, 60, 100, 30],
  };

  return (
    <Chart
      options={options.options}
      series={options.series}
      type="pie"
      width="150%"
      height="auto"
    />
  );
};
