import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Chart as ChartJS, Tooltip, Legend } from 'chart.js';

ChartJS.register(Tooltip, Legend);

const UserEngagement = () => {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Likes',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
        data: [65, 59, 80, 81, 56, 55],
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Comments',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        pointBackgroundColor: 'rgba(153, 102, 255, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(153, 102, 255, 1)',
        data: [28, 48, 40, 19, 86, 27],
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Shares',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        pointBackgroundColor: 'rgba(255, 159, 64, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 159, 64, 1)',
        data: [35, 23, 60, 75, 64, 42],
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: {
            size: 12,
          },
          usePointStyle: true,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#4B5563',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(229, 231, 235, 0.3)',
        },
        ticks: {
          color: '#4B5563',
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutCubic',
    },
  };

  return (
    <div className="container mx-auto p-4 ml-40">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">User Engagement</h1>
      </header>
      <main className="bg-white p-4 rounded-lg shadow-lg">
        <div className="max-w-md mx-auto">
          <Line data={data} options={options} />
        </div>
      </main>
    </div>
  );
};

export default UserEngagement;
