import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Employee from './Components/Employee';
import Category from './Components/Category';
import Profile from './Components/Profile';
import AddCategory from './Components/AddCategory';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';
import EditCategory from './Components/EditCategory';
import Start from './Components/Start';
import EmployeeLogin from './Components/EmployeeLogin';
import EmployeeDetail from './Components/EmployeeDetail';
import AttendanceForm from './Components/AttendanceForm';
import AttendanceManagement from './Components/AttendanceManagement';
import EmpHome from './Components/EmpHome';
import EmployeeProfile from './Components/EmployeeProfile';
import PvtRoute from './Components/PvtRoute';
import ShiftList from './Components/ShiftList';
import ShiftForm from './Components/ShiftForm';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Start/>} />

        <Route path='/adminlogin' element={<Login />} />             
        <Route path='/dashboard' element={<PvtRoute><Dashboard /></PvtRoute>}>
          <Route path='' element={<Home />} />
          <Route path='/dashboard/employee' element={<Employee />} />
          <Route path='/dashboard/category' element={<Category />} />
          <Route path='/dashboard/profile' element={<Profile/>} />         
          <Route path='/dashboard/add_category' element={<AddCategory/>} />         
          <Route path='/dashboard/add_employee' element={<AddEmployee/>} />         
          <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}/>        
          <Route path='/dashboard/edit_category/:id' element={<EditCategory />}/>        
          <Route path='/dashboard/employee/:id/mark_attendance' element={<AttendanceForm />}/>  
          <Route path='/dashboard/shift' element={<ShiftList />}/>  
          <Route path='/dashboard/add_shift' element={<ShiftForm />}/>  
        </Route>


        <Route path='/employeelogin' element={<EmployeeLogin />} />
        <Route path='/employee_detail/:id' element={<EmployeeDetail />}>
            <Route path='' element={<EmpHome/>} />
            <Route path='/employee_detail/:id/profile' element={<EmployeeProfile/>} /> 
            <Route path='/employee_detail/:id/attendance' element={<AttendanceManagement />} />
        </Route>


      </Routes>
    </Router>
  );
}

export default App;
