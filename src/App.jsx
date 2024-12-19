import React, { useState, useEffect } from 'react';
import { supabase } from './createClient'; 
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ name: '', age: '' });
  const [user2, setUser2] = useState({ id: '', name: '', age: '' });

  //cosole.log(user2);
  useEffect(() => {
    fetchUsers();
  }, []);

  
  async function fetchUsers() {
    try {
      const { data, error } = await supabase.from('users').select('*');
      if (error) throw error;
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err.message);
    }
  }

  // Handle change for add form
  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  // Handle change for update form
  function handleChange2(e) {
    const { name, value } = e.target;
    setUser2((prev) => ({ ...prev, [name]: value }));
  }

  // Add a new user
  async function addUser(e) {
    e.preventDefault();
    try {
      const { error } = await supabase.from('users').insert([user]);
      if (error) throw error;
      fetchUsers();
      setUser({ name: '', age: '' });
    } catch (err) {
      console.error('Error adding user:', err.message);
    }
  }

  // Delete a user
  async function deleteUser(userId) {
    try {
      const { error } = await supabase.from('users').delete().eq('id', userId);
      if (error) throw error;
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err.message);
    }
  }

  // Display user data in update form
  function displayUser(userId) {
    const selectedUser = users.find((u) => u.id === userId);
    if (selectedUser) setUser2(selectedUser);
  }

  // Update a user
  async function updateUser(e) {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('users')
        .update({ name: user2.name, age: user2.age })
        .eq('id', user2.id);
      if (error) throw error;
      fetchUsers();
      setUser2({ id: '', name: '', age: '' });
    } catch (err) {
      console.error('Error updating user:', err.message);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>

      {/* Add User Form */}
      <form onSubmit={addUser} className="mb-4">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Name"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
          />
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
            placeholder="Age"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
          />
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Add User
          </button>
        </div>
      </form>

      {/* Update User Form */}
      {user2.id && (
        <form onSubmit={updateUser} className="mb-4">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={user2.name}
              onChange={handleChange2}
              placeholder="Name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
            <input
              type="number"
              name="age"
              value={user2.age}
              onChange={handleChange2}
              placeholder="Age"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* Users Table */}
      <table className="min-w-full border-collapse border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="text-center hover:bg-gray-50">
              <td className="border px-4 py-2">{u.id}</td>
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.age}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => deleteUser(u.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => displayUser(u.id)}
                  className="px-2 py-1 ml-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

