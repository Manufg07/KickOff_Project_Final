import React from 'react'

const ViewPost = () => {
  return (
    <>
    <div class="bg-gray-100 ml-40">
        <div class="container max-w-6xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
            <div class="text-3xl font-bold text-center mb-6 text-indigo-600">Posts List</div>
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr>
                            <th class="px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Post ID</th>
                            <th class="px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">User ID</th>
                            <th class="px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Text</th>
                            <th class="px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Image</th>
                            <th class="px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Video</th>
                            <th class="px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Created At</th>
                            <th class="px-32 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="postTableBody" class="divide-y divide-gray-200">
                        {/* <!-- Dynamic content will be loaded here --> */}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
  )
}

export default ViewPost