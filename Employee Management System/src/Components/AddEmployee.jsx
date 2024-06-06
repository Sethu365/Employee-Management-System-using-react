import React, { useEffect, useState } from 'react'
import axios from "axios";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const navigate=useNavigate()
    const[employee,setEmployee] =useState({
        name:'',
        email:'',
        password:'',
        salary:'',
        address:'',
        category_id:'',
        image:''
    })
  const [category, setCategory] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit=(e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append('name',employee.name);
    formData.append('email',employee.email);
    formData.append('password',employee.password);
    formData.append('address',employee.address);
    formData.append('salary',employee.salary);
    formData.append('image',employee.image);
    formData.append('category_id',employee.category_id);

    axios.post("http://localhost:3000/auth/add_employee",formData)
    .then(result=>{
      if(result.data.Status) {
        navigate('/dashboard/employee')
    } else {
        alert(result.data.Error)
    }

    })
    .catch(err=>console.log(err))
  }

  
    const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e)=>setEmployee({...employee,name:e.target.value})}
            />
          </div>

          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="Email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e)=>setEmployee({...employee,email:e.target.value})}
            />
          </div>

          <div className="col-12">
            <label for="inputPassword4" className="form-label">
              Password
            </label>
            <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e)=>setEmployee({...employee,password:e.target.value})}
            />       
             <button
               type="button"
               onClick={togglePasswordVisibility}
               className="btn btn-outline-secondary"
               style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
              >
             <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </button>   
              </div>
              </div>

          <div className="col-12">
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              onChange={(e)=>setEmployee({...employee,salary:e.target.value})}
            />
          </div>

          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              onChange={(e)=>setEmployee({...employee,address:e.target.value})}
            />
          </div>

          <div className="col-12">
            <label for="category" className="form-label">
              Category
            </label>
            <select name="category" id="category" className="form-select"
                onChange={(e) => setEmployee({...employee, category_id: e.target.value})}>
                   <option value="" disabled>Select a category</option>
                   {category.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
            </select>
          </div>

          <div className="col-12">
            <label for="inputGroupFile01" className="form-label">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e)=>setEmployee({...employee,image:e.target.files[0]})}
            />
          </div>

          <div className="col-12 d-flex justify-content-center mt-3">
            <button type="submit" className="btn btn-primary btn-custom">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default AddEmployee;
