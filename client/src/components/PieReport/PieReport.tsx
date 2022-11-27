const options = {
  responsive: true,
  redraw: true,
  maintainAspectRatio: true,
  aspectRatio: 1,
  plugins: {
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
      borderColor: '#2b2c33',
      data: [20, 10, 5],
    },
  ],
};
export const PieReport = (): JSX.Element => {
  // return <Pie options={options} data={data} />;
  return;
};
