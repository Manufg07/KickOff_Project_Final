import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const ChampionsLeague = () => {
  const { league } = useParams();
  const [allMatches, setAllMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [standings, setStandings] = useState([]);
  const [scorers, setScorers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLiveInfo(league);
  }, [league]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = allMatches.filter(match =>
        match.homeTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.awayTeam.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMatches(filtered);
    } else {
      setFilteredMatches(allMatches);
    }
  }, [searchTerm, allMatches]);

  const fetchLiveInfo = async (league) => {
    try {
      const response = await fetch(`http://localhost:5000/api/football?league=${league}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched data:', data); // Log the fetched data
      setAllMatches(data.matches || []);
      setStandings(data.standings || []);
      setScorers(data.scorers || []);
    } catch (error) {
      console.error('Error fetching live information:', error);
      showError(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const displayMatchResults = (matches) => {
    if (matches.length > 0) {
      return matches.map((match, index) => (
        <motion.div
          key={index}
          className="match-card shadow-lg rounded-lg mb-8 overflow-hidden p-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gray-300 text-black text-center py-2">
            <p className="text-lg font-bold">{match.homeTeam.name} vs {match.awayTeam.name}</p>
            <p>{new Date(match.utcDate).toLocaleString()}</p>
            <p>Status: {match.status}</p>
            <p>Score: {match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}</p>
          </div>
        </motion.div>
      ));
    } else {
      return <p className="text-white text-center">No match data available.</p>;
    }
  };

  const displayPointTable = (standings) => {
    if (standings.length > 0 && standings[0].table) {
      return (
        <motion.table
          className="w-full border border-gray-300 divide-y divide-gray-300 rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead className="bg-gradient-to-r from-green-200 to-gray-300">
            <tr>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Team</th>
              <th className="px-4 py-2">Played</th>
              <th className="px-4 py-2">Won</th>
              <th className="px-4 py-2">Drawn</th>
              <th className="px-4 py-2">Lost</th>
              <th className="px-4 py-2">Points</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {standings[0].table.map((team, index) => (
              <motion.tr key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1 }}>
                <td className="px-4 py-2">{team.position}</td>
                <td className="px-4 py-2">{team.team.name}</td>
                <td className="px-4 py-2">{team.playedGames}</td>
                <td className="px-4 py-2">{team.won}</td>
                <td className="px-4 py-2">{team.draw}</td>
                <td className="px-4 py-2">{team.lost}</td>
                <td className="px-4 py-2">{team.points}</td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      );
    } else {
      return <p className="text-white text-center">Point table data not available.</p>;
    }
  };

  const displayTopScorers = (scorers) => {
    if (scorers.length > 0) {
      return scorers.map((scorer, index) => (
        <motion.div
          key={index}
          className="scorer-card shadow-lg rounded-lg p-4 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gray-200 text-gray-900 text-center py-2">
            <h3 className="text-xl font-bold mb-2">{scorer.player.name}</h3>
            <p>Team: {scorer.team.name}</p>
            <p>Goals: {scorer.numberOfGoals}</p>
          </div>
        </motion.div>
      ));
    } else {
      return <p className="text-white text-center">Top scorers data not available.</p>;
    }
  };

  const showError = (error) => {
    console.error('showError function called with:', error);
    alert(`Failed to load live information. Error: ${error.message}`);
  };

  return (
    <div className="bg-gray-900 text-gray-200 font-sans min-h-screen">
      <motion.nav
        className="bg-gradient-to-r from-blue-800 to-blue-900 p-4 sticky top-0 z-50 flex justify-between items-center shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-white"></span>
          <h1 className="text-4xl font-bold text-white text-center mb-8">{league.replace('_', ' ')} Live Updates</h1>
        </div>
        <input
          id="search-input"
          type="text"
          placeholder="Search by team name..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={searchTerm}
          onChange={handleSearch}
        />
      </motion.nav>

      <div className="max-w-7xl mx-auto mt-8 px-4">
        <section id="match-results" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-center text-white">Match Results</h2>
          <div id="match-results-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayMatchResults(filteredMatches)}
          </div>
        </section>

        <section id="point-table" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-center text-white">Point Table</h2>
          <div id="point-table-container" className="bg-white shadow-lg p-6 rounded-lg">
            {displayPointTable(standings)}
          </div>
        </section>

        <section id="top-scorers">
          <h2 className="text-3xl font-semibold mb-4 text-center text-white">Top Scorers</h2>
          <div id="top-scorers-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTopScorers(scorers)}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChampionsLeague;
