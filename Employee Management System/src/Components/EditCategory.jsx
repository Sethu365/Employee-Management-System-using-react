import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const EditCategory = () => {
        const { id } = useParams();
        const navigate = useNavigate();
        const [category, setCategory] = useState({
          name: "",
        });
  
      useEffect(() => {
      axios
      .get("http://localhost:3000/auth/category/" + id)
      .then((result) => {
        setCategory({
          ...category,
          name: result.data.Result[0].name,
         
        });
      })
      .catch((err) => console.log(err));
  }, [id]);
        
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/auth/edit_category/" + id, category)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/category");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div style={{ height: '75vh' }}className='d-flex justify-content-center align-items-center '>
    <div className='p-3 rounded w-21 border '>
    
        <h2>Edit Category</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor='category'><strong>Category:</strong></label>
                <input
                    type='text'
                    name='category'
                    autoComplete='off'
                    placeholder='Enter Category'
                    value={category.name}
                    onChange={(e) => setCategory({ ...category, name: e.target.value })}
                    className='form-control rounded-0'
                />
            </div>
         
            <button type='submit' className='btn btn-primary w-100 rounded mb-2'>Edit Category</button>
           
        </form>
    </div>
</div>
  )
}

export default EditCategory