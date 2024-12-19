import React, { useState, useEffect } from 'react';
import { supabase } from './createClient';
import './App.css'

const App = () => {
  const [users, setUsers] = useState([]);
  const [user,setUser]=useState({
    name:'',age:''
  })
  
  console.log(user);
  

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
  }

  function handleChange(e) {
      setUser(prevFormData=>{
        return{
          ...prevFormData,
        [ e.target.name]:e.target.value,
        }
      }) 
  }

  async function AddUser() {
    await supabase
           .from('users')
           .insert({name:user.name,age:user.age})
  }
  return (
    <div className="p-4">
  

    {/* Add User Form */}
    <form onSubmit={AddUser} className="mb-4">
      <div className="flex flex-col gap-4 mb-4">
        <input
          type="text"
          placeholder="Name"
          name = 'name'
          // onChange={(e) => setName(e.target.value)}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="number"
          placeholder="Age"
          name='age'
          // value={age}
          // onChange={(e) => setAge(e.target.value)}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />

        <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
        Add User
      </button>
      </div>
      
    </form>

    {/* {message && <p className="mb-4 text-sm text-center text-gray-700">{message}</p>} */}


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
