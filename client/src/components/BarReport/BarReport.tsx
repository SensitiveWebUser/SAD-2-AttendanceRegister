import Chart from 'react-apexcharts';

export const BarReport = (): JSX.Element => {
  const data = [10, 20, 50, 30];
  const categories = ['HF', 'MITP', 'SAAD', 'FYP'];

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
        width: '100%',
        foreColor: '#fff',
        toolbar: {
          show: false,
        },
        id: 'basic-bar',
      },
      xaxis: {
        style: {
          colors: ['#fff'],
        },
        categories: categories,
      },
    },
    series: [
      {
        name: 'Attendance %',
        data: data,
      },
    ],
  };

  return (
    <Chart
      options={options.options}
      series={options.series}
      type="bar"
      height="350"
      width="400"
    />
  );
};
