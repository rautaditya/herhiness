import { useEffect, useState } from "react";
import { getStaffById, updateStaff } from "../../api/staff";
import { useNavigate, useParams } from "react-router-dom";

const EditStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  useEffect(() => {
    getStaffById(id).then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateStaff(id, form);
    alert("Staff updated successfully");
    navigate("/staff");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Staff</h2>

      <input
        name="name"
        value={form.name || ""}
        onChange={handleChange}
      />

      <input
        name="mobile"
        value={form.mobile || ""}
        onChange={handleChange}
      />

      <input
        name="role"
        value={form.role || ""}
        onChange={handleChange}
      />

      <button type="submit">Update</button>
    </form>
  );
};

export default EditStaff;
