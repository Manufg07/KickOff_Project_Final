import React, { useEffect, useState } from 'react';

const ChampionsLeague = () => {
  const [allMatches, setAllMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [standings, setStandings] = useState([]);
  const [scorers, setScorers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLiveInfo();
  }, []);

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

  const fetchLiveInfo = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/football'); // Ensure the port matches your server
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Client Received Data:', data);
        setAllMatches(data.matches);
        setStandings(data.standings || []); // Handle missing standings
        setScorers(data.scorers || []); // Handle missing scorers
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
        <div key={index} className="match-card shadow-lg rounded-lg mb-8 overflow-hidden p-4 bg-blue-300">
          <div className="bg-blue-200 text-gray-600 text-center py-2">
            <p className="text-lg font-bold">{match.homeTeam.name} vs {match.awayTeam.name}</p>
            <p>{new Date(match.utcDate).toLocaleString()}</p>
            <p>Status: {match.status}</p>
            <p>Score: {match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}</p>
          </div>
        </div>
      ));
    } else {
      return <p className="text-gray-600 text-center">No match data available.</p>;
    }
  };

  const displayPointTable = (standings) => {
    if (standings.length > 0 && standings[0].table) {
      return (
        <table className="w-full border border-gray-300 divide-y divide-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-blue-100">
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
              <tr key={index}>
                <td className="px-4 py-2">{team.position}</td>
                <td className="px-4 py-2">{team.team.name}</td>
                <td className="px-4 py-2">{team.playedGames}</td>
                <td className="px-4 py-2">{team.won}</td>
                <td className="px-4 py-2">{team.draw}</td>
                <td className="px-4 py-2">{team.lost}</td>
                <td className="px-4 py-2">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return <p className="text-gray-600 text-center">Point table data not available.</p>;
    }
  };

  const displayTopScorers = (scorers) => {
    if (scorers.length > 0) {
      return scorers.map((scorer, index) => (
        <div key={index} className="scorer-card shadow-lg rounded-lg p-4 bg-white">
          <div className="bg-gray-200 text-gray-600 text-center py-2">
            <h3 className="text-xl font-bold mb-2">{scorer.player.name}</h3>
            <p>Team: {scorer.team.name}</p>
            <p>Goals: {scorer.numberOfGoals}</p>
          </div>
        </div>
      ));
    } else {
      return <p className="text-gray-600 text-center">Top scorers data not available.</p>;
    }
  };

  const showError = (error) => {
    console.error('showError function called with:', error);
    alert('Failed to load live information. Please try again later.');
  };

  return (
    <div className="bg-gray-100 text-gray-900 font-sans">
      <nav className="bg-white p-4 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a href="#" className="text-2xl font-bold text-blue-600 hover:underline"></a>
          <span className="text-2xl font-bold text-blue-600"></span>
          <h1 className="text-4xl font-bold text-indigo-600 text-center mb-8">Champions League Live Updates</h1>
        </div>
        <input
          id="search-input"
          type="text"
          placeholder="Search by team name..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={searchTerm}
          onChange={handleSearch}
        />
      </nav>

      <div className="max-w-7xl mx-auto mt-8 px-4">
       
        <section id="match-results" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-center">Match Results</h2>
          <div id="match-results-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayMatchResults(filteredMatches)}
          </div>
        </section>

        <section id="point-table" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Point Table</h2>
          <div id="point-table-container" className="bg-white shadow-lg p-6 rounded-lg">
            {displayPointTable(standings)}
          </div>
        </section>

        <section id="top-scorers">
          <h2 className="text-3xl font-semibold mb-4">Top Scorers</h2>
          <div id="top-scorers-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTopScorers(scorers)}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChampionsLeague;
