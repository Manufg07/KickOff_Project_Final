import React from 'react';
import '../../App.css' 
import CL from '../../assets/uefa.svg'
import PL from '../../assets/premier-league.svg'
import Laliga from '../../assets/laligaa.png'
import SerieA from '../../assets/serie a.png'

const FootballLeagues = () => {
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="bg-white text-gray-900 font-sans">
      <nav className="bg-white shadow-lg p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">KICK off</span>
          <span className="text-2xl font-bold text-blue-600">Leagues</span>
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </nav>

      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4">
        <div className="max-w-7xl mx-auto notification-bar">
          <span>Latest Match Results: Team A 2-1 Team B | Team C 3-3 Team D | Team E 0-2 Team F</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          className="bg-white shadow-lg p-6 h-40 rounded-lg cursor-pointer interactive-box"
          onClick={() => handleNavigation('/champions_league')}
        >
          <div className="flex items-center">
            <div className="icon-bg w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">
              <img
                src={CL}
                alt="Champions League Logo"
                className="w-auto h-auto border border-1 border-blue-600"
              />
            </div>
            <h2 className="text-lg font-semibold">Champions League</h2>
          </div>
        </div>
        <div
          className="bg-white shadow-lg p-6 h-40 rounded-lg cursor-pointer interactive-box"
          onClick={() => handleNavigation('/premier_league')}
        >
          <div className="flex items-center">
            <div className="icon-bg w-12 h-12 bg-white border border-1 border-blue-600 flex items-center justify-center mr-3">
              <img
                src={PL}
                alt="Premier League Logo"
                className="w-auto h-auto"
              />
            </div>
            <h2 className="text-lg font-semibold">Premier League</h2>
          </div>
        </div>
        <div
          className="bg-white shadow-lg p-6 h-40 rounded-lg cursor-pointer interactive-box"
          onClick={() => handleNavigation('/la_liga')}
        >
          <div className="flex items-center">
            <div className="icon-bg w-12 h-12 bg-white border border-1 border-blue-600 text-white flex items-center justify-center mr-3">
              <img
                src={Laliga}
                alt="La Liga Logo"
                className="w-auto h-auto"
              />
            </div>
            <h2 className="text-lg font-semibold">La Liga</h2>
          </div>
        </div>
        <div
          className="bg-white shadow-lg p-6 h-40 rounded-lg cursor-pointer interactive-box"
          onClick={() => handleNavigation('/serie_a')}
        >
          <div className="flex items-center">
            <div className="icon-bg w-12 h-12 bg-white-600 border border-1 border-blue-600 flex items-center justify-center mr-3">
              <img
                src={SerieA}
                alt="Serie A Logo"
                className="w-auto h-auto"
              />
            </div>
            <h2 className="text-lg font-semibold">Serie A</h2>
          </div>
        </div>
        <div
          className="bg-white shadow-lg p-6 h-40 rounded-lg cursor-pointer interactive-box"
          onClick={() => handleNavigation('/bundesliga')}
        >
          <div className="flex items-center">
            <div className="icon-bg w-12 h-12 bg-white border border-1 border-blue-600 flex items-center justify-center mr-3">
              <img
                src="/images/bvb.png"
                alt="Bundesliga Logo"
                className="w-auto h-auto"
              />
            </div>
            <h2 className="text-lg font-semibold">Bundesliga</h2>
          </div>
        </div>
        <div
          className="bg-white shadow-lg p-6 h-40 rounded-lg cursor-pointer interactive-box"
          onClick={() => handleNavigation('/ligue_1')}
        >
          <div className="flex items-center">
            <div className="icon-bg w-12 h-12 bg-white border border-1 border-blue-600 flex items-center justify-center mr-3">
              <img
                src="/images/ligue1.png"
                alt="Ligue 1 Logo"
                className="w-8 h-8"
              />
            </div>
            <h2 className="text-lg font-semibold">Ligue 1</h2>
          </div>
        </div>
        <div
          className="bg-white shadow-lg p-6 h-40 rounded-lg cursor-pointer interactive-box"
          onClick={() => handleNavigation('/indian_super_league')}
        >
          <div className="flex items-center">
            <div className="icon-bg w-12 h-12 bg-white border border-1 border-blue-600 flex items-center justify-center mr-3">
              <img
                src="/images/isl.png"
                alt="Indian Super League Logo"
                className="w-8 h-8"
              />
            </div>
            <h2 className="text-lg font-semibold">Indian Super League</h2>
          </div>
        </div>
        <div
          className="bg-white shadow-lg p-6 h-40 rounded-lg cursor-pointer interactive-box"
          onClick={() => handleNavigation('/eredivisie')}
        >
          <div className="flex items-center">
            <div className="icon-bg w-12 h-12 bg-white border border-1 border-blue-600 flex items-center justify-center mr-3">
              <img
                src="/images/eredivise.png"
                alt="Eredivisie Logo"
                className="w-8 h-8"
              />
            </div>
            <h2 className="text-lg font-semibold">Eredivisie</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootballLeagues
