import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Chart as ChartJS, Tooltip, Legend } from 'chart.js';

ChartJS.register(Tooltip, Legend);

const UserEngagement = () => {
  const [registrationData, setRegistrationData] = useState({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user registration data
    fetch('/admin/user-registrations')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const formattedData = formatRegistrationData(data);
        setRegistrationData(formattedData);
        setIsLoading(false); // Data has been fetched and processed
      })
      .catch(error => {
        console.error('Error fetching registration data:', error);
        setIsLoading(false); // Even if there's an error, we stop the loading state
      });
  }, []);

  const formatRegistrationData = (data) => {
    // Assuming data is an array of objects with _id as month number and count as registration count
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const counts = Array(12).fill(0);
    data.forEach(item => {
      counts[item._id - 1] = item.count; // -1 because _id is 1 for Jan, 2 for Feb, etc.
    });
    return {
      labels: labels,
      datasets: [
        {
          label: 'User Registrations',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
          data: counts,
          fill: true,
          tension: 0.4,
        },
      ],
    };
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
        <h1 className="text-2xl font-bold text-center text-gray-800">User Registration Growth</h1>
      </header>
      <main className="bg-white p-4 rounded-lg shadow-lg">
        <div className="max-w-md mx-auto">
          {isLoading ? (
            <p>Loading...</p> // Show loading state while fetching data
          ) : (
            <Line data={registrationData} options={options} />
          )}
        </div>
      </main>
    </div>
  );
};

export default UserEngagement;
