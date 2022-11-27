const options = {
  responsive: true,
  redraw: true,
  maintainAspectRatio: true,
  aspectRatio: 1,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const labels = ['Module1', 'Module2', 'Module3'];
const data = {
  labels: labels,
  datasets: [
    {
      label: '% Attendance',
      backgroundColor: '#5263ce',
      borderColor: 'blue',
      textColor: '#fff',
      data: [20, 10, 5],
    },
  ],
};
export const BarReport = (): JSX.Element => {
  // return <Bar options={options} data={data} />;
  return;
};
