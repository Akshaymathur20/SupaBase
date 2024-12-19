import React, { useState, useEffect } from 'react';
import { supabase } from './createClient';
import './App.css'

const App = () => {
  const [users, setUsers] = useState([]);
  // console.log(users);
  

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.error('Error fetching users:', error);
    } else {
      setUsers(data);
    }
    // const data = await supabase
    //            .from('users')
    //            .select('*');
    //            setUsers(data)
    //            console.log(data);
               
  }

  return (
    <div className="p-4">
    <h1 className="text-2xl font-semibold mb-4">User Table</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="border border-gray-200 px-4 py-2 text-sm font-medium">ID</th>
            <th className="border border-gray-200 px-4 py-2 text-sm font-medium">Name</th>
            <th className="border border-gray-200 px-4 py-2 text-sm font-medium">Age</th>
            
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-50 even:bg-gray-50 odd:bg-white text-center"
            >
              <td className="border border-gray-200 px-4 py-2 text-sm">{user.id}</td>
              <td className="border border-gray-200 px-4 py-2 text-sm">{user.Name}</td>
              <td className="border border-gray-200 px-4 py-2 text-sm">{user.Age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
      );
};

export default App;
