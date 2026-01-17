import { useEffect, useState } from "react";
import { getAllStaff, deleteStaff } from "../../api/staff";
import { Link } from "react-router-dom";

const StaffList = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    getAllStaff().then((res) => setStaff(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this staff?")) {
      await deleteStaff(id);
      const res = await getAllStaff();
      setStaff(res.data);
    }
  };

  return (
    <div>
      <h2>Staff List</h2>
      <Link to="/staff/add">➕ Add Staff</Link>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {staff.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.role}</td>
              <td>{s.mobile}</td>
              <td>
                <Link to={`/staff/edit/${s._id}`}>Edit</Link>
                &nbsp;|&nbsp;
                <button onClick={() => handleDelete(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;
