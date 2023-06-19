import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllUsers } from "../../util/APIUtils";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (error) {
        toast("Oops! Something went wrong.", { type: "error" });
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="home-container  bg-black">
      <div className="container">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-200 dark:text-gray-200">
            <thead className="text-xs text-gray-300 uppercase bg-gray-800 dark:bg-gray-800 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr
                  key={user.id}
                  className="bg-gray-700 border-b dark:bg-gray-700 dark:border-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-300 whitespace-nowrap dark:text-gray"
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
