import { getusers,blockusers } from "../../services/Admin/Userservices";
import { settingusers,toggleblock } from "../../redux/Admin/Userslice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
function Users() {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchusers();
  }, []);
  const fetchusers = async () => {
    try {
      const data = await getusers();
      dispatch(settingusers(data));
    } catch (error) {
      console.log(error);
    }
  };
  const handleblock=async(user)=>{
    try{
        const updateduser=await blockusers(user.id,!user.blocked);
        dispatch(toggleblock(user.id))
    }catch(error){
        console.log(error)
    }
  }
  return (
    <>
      <div className="mt-8 bg-white rounded-2xl shadow-sm border border-[#e8dfd2] overflow-hidden">
        <div className="px-6 py-5 border-b border-[#e8dfd2] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#4A2C22]">
              User Management
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage registered users and their accounts
            </p>
          </div>

          <div className="bg-[#f7f3eb] px-4 py-2 rounded-lg">
            <span className="text-sm text-gray-500">Total Users</span>
            <span className="ml-2 font-semibold text-[#1F4D3A]">
              {users.length}
            </span>
          </div>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full bg-white overflow-hidden rounded-xl">
            <thead>
              <tr className="bg-[#1F4D3A] text-white">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  {" "}
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  {" "}
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1F4D3A] text-white flex items-center justify-center font-semibold">
                        {item.name?.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-medium text-[#4A2C22]">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">ID: {item.id}</p>
                      </div>
                    </div>
                  </td>
                  {/* <td className="px-4 py-3">{item.name}</td> */}
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.email}
                  </td>
                  <td className="px-4 py-3 ">
                    {" "}
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#e7f0eb] text-[#1F4D3A]">
                      {item.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                       {item.blocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={()=>handleblock(item)}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-[#f7f3eb] text-[#4A2C22] hover:bg-[#e8dfd2] transition">
                      {item.blocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Users;
