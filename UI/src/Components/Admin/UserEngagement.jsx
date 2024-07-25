import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import ClipLoader from 'react-spinners/ClipLoader';
import { motion } from 'framer-motion';

ChartJS.register(Tooltip, Legend, ArcElement);

const UserEngagement = () => {
  const [registrationData, setRegistrationData] = useState({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/user-registrations')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const formattedData = formatRegistrationData(data);
        setRegistrationData(formattedData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching registration data:', error);
        setIsLoading(false);
      });
  }, []);

  const formatRegistrationData = (data) => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const counts = Array(12).fill(0);
    data.forEach(item => {
      counts[item._id - 1] = item.count;
    });
    return {
      labels: labels,
      datasets: [
        {
          label: 'User Registrations',
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0',
            '#FFCE56', '#FF6384', '#36A2EB', '#FF9F40', '#4BC0C0',
            '#FFCE56', '#FF6384'
          ],
          data: counts,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: {
            size: 14,
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            weight: 'bold',
          },
          color: '#4A90E2',
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutCubic',
    },
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">User Registration Growth</h1>
      </header>
      <main className="bg-white p-4 rounded-lg shadow-lg">
        <div className="max-w-lg mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <ClipLoader color="#4B5563" loading={isLoading} size={50} />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <Doughnut data={registrationData} options={options} />
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserEngagement;
