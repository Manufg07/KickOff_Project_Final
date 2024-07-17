import React from 'react'

const ChampionsLeague = () => {
  return (
    <>
    <div className="bg-gray-100 text-gray-900 font-sans">

        <nav className="bg-white shadow-lg p-4 sticky top-0 z-50 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <a href="#" className="text-2xl font-bold text-blue-600 hover:underline" onclick="redirectToHomepage()">KICK off</a>
                <span className="text-2xl font-bold text-blue-600">Champions League</span>
            </div>
            <input id="search-input" type="text" placeholder="Search by team name..." className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"/>
        </nav>

        <div className="max-w-7xl mx-auto mt-8 px-4">
            <h1 className="text-4xl font-bold text-indigo-600 text-center mb-8">Champions League Live Updates</h1>

            {/* <!-- Match Results Section --> */}
            <section id="match-results" className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">Match Results</h2>
                <div id="match-results-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* <!-- Match results will be injected here --> */}
                </div>
            </section>

            {/* <!-- Point Table Section --> */}
            <section id="point-table" className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">Point Table</h2>
                <div id="point-table-container" className="bg-white shadow-lg p-6 rounded-lg">
                    {/* <!-- Point table will be injected here --> */}
                </div>
            </section>

            {/* <!-- Top Scorers Section --> */}
            <section id="top-scorers">
                <h2 className="text-3xl font-semibold mb-4">Top Scorers</h2>
                <div id="top-scorers-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* <!-- Top scorers will be injected here --> */}
                </div>
            </section>
        </div>

</div>
    </>
  )
}

export default ChampionsLeague