import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import ClipLoader from 'react-spinners/ClipLoader';
import { motion } from 'framer-motion';

ChartJS.register(Tooltip, Legend, ArcElement);

const PostEngagement = () => {
  const [engagementData, setEngagementData] = useState({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/post-engagements')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const formattedData = formatEngagementData(data);
        setEngagementData(formattedData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching engagement data:', error);
        setIsLoading(false);
      });
  }, []);

  const formatEngagementData = (data) => {
    const labels = data.map(item => `Month ${item._id}`);
    const counts = data.map(item => item.count);
    return {
      labels: labels,
      datasets: [
        {
          label: 'Post Engagements',
          backgroundColor: [
            '#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD',
            '#E67E22', '#2ECC71', '#1F77B4', '#D62728', '#9467BD'
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
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 2,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value} Posts`;
          },
        },
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: {
            size: 16,
            family: "'Poppins', sans-serif",
            weight: 'bold',
          },
          color: '#333',
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
      easing: 'easeOutBounce',
    },
    layout: {
      padding: {
        top: 30,
        bottom: 30,
      },
    },
    elements: {
      arc: {
        borderWidth: 4,
        borderColor: '#fff',
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">Post Engagement Overview</h1>
      </header>
      <main className="bg-white p-4 rounded-lg shadow-lg">
        <div className="max-w-lg mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <ClipLoader color="#FF5733" loading={isLoading} size={50} />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <Doughnut data={engagementData} options={options} />
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PostEngagement;
