import React from 'react'

const ViewUser = () => {
  return (
    <>
    <div class="bg-gray-100 ml-40">
        <div class="container max-w-6xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
            <div class="text-3xl font-bold text-center mb-6 text-indigo-600">Users List</div>
            <div class="text-right mb-6">
                <button class="bg-indigo-500 text-white rounded px-4 py-2 ml-2 hover:bg-indigo-600">Search</button>
                <button class="bg-indigo-500 text-white rounded px-4 py-2 ml-2 hover:bg-indigo-600">Filter</button>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr>
                            <th class="px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">User ID</th>
                            <th class="px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Name</th>
                            <th class="px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Email</th>
                            <th class="px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Mobile</th>
                            <th class="px-32 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tdiv id="userTablediv" class="divide-y divide-gray-200">
                        {/* <!-- Dynamic content will be loaded here --> */}
                    </tdiv>
                </table>
            </div>
        </div>
</div>
    </>
  )
}

export default ViewUser