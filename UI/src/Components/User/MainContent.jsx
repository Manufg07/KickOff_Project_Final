import React from 'react'

const MainContent = () => {
  return (
    <>
    {/* <!-- Main Content --> */}
    <div className="col-span-6 bg-white shadow-lg p-4 rounded-lg mt-8">
        <h2 className="text-lg font-semibold text-purple-600 mb-4">Latest</h2>

        {/* <!-- Posts Container --> */}
        <div id="posts" className="mt-6 space-y-6">
        {/* <!-- Posts will be dynamically added here --> */}
        </div>
    </div>
    </>
  )
}

export default MainContent