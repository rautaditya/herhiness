import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffList from "../pages/staff/StaffList";
import AddStaff from "../pages/staff/AddStaff";
import EditStaff from "../pages/staff/EditStaff";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/staff" element={<StaffList />} />
        <Route path="/staff/add" element={<AddStaff />} />
        <Route path="/staff/update/:id" element={<EditStaff />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
