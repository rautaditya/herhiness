import { useState } from "react";
import { createStaff } from "../../api/staff";
import { useNavigate } from "react-router-dom";

const AddStaff = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createStaff(form);
    alert("Staff added successfully");
    navigate("/staff");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Staff</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="mobile" placeholder="Mobile" onChange={handleChange} />
      <input name="role" placeholder="Role" onChange={handleChange} />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button type="submit">Save</button>
    </form>
  );
};

export default AddStaff;
