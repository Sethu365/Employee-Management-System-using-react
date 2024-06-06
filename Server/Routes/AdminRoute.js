import express, { Router } from "express"; // Importing Express
import con from "../utils/db.js"; // Importing the database connection
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router(); // Creating an instance of Express router

router.post("/adminlogin", (req, res) => {
  // Handling POST requests to /adminlogin
  const sql = "SELECT * from admin WHERE email = ? AND password = ?"; // SQL query to select admin based on email and password
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    // Executing the query
    if (err) return res.json({ loginStatus: false, Error: "Query error" }); // Handling query errors
    if (result.length > 0) {
      // If admin with provided credentials exists
      const email = result[0].email; // Extracting email from the query result
      const token = jwt.sign(
        { role: "admin", email: email },
        "jwt_secret_key", // Secret key for signing the token
        { expiresIn: "1d" } // Token expiration time
      );     
      res.cookie('token', token); // Setting the token in a cookie   
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});

router.get('/category', (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

// router.post('/add_category', (req, res) => {
//   const sql = "INSERT INTO category (`name`) VALUES (?)"
//   con.query(sql, [req.body.category], (err, result) => {
//       if(err) return res.json({Status: false, Error: "Query Error"})
//       return res.json({Status: true})
//   })
// })

router.post('/add_category', (req, res) => {
  const { category } = req.body;

  // Check if category already exists
  con.query("SELECT * FROM category WHERE name = ?", [category], (err, rows) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      
      if (rows.length > 0) {
          return res.json({ Status: false, Error: "Category already exists" });
      } else {
          // Insert the category if it doesn't exist
          const sql = "INSERT INTO category (name) VALUES (?)";
          con.query(sql, [category], (err, result) => {
              if (err) return res.json({ Status: false, Error: "Query Error" });
              return res.json({ Status: true });
          });
      }
  });
});

//image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'Public/Images')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({
  storage: storage
})

router.post('/add_employee',upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employee 
    (name,email,password, address, salary,image, category_id) 
    VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary, 
            req.file.filename,
            req.body.category_id
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })
})

router.get('/employee', (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

router.get('/employee/:id',(req,res)=>{
  const id =req.params.id;
  const sql = "SELECT * FROM employee WHERE id=?";
  con.query(sql,[id],(err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

router.put('/edit_employee/:id',(req,res)=>{
  const id=req.params.id;
  const sql =`UPDATE employee 
  set name=?,email=?,salary=?,address=?,category_id=? Where id=?`
  
const values = [
  req.body.name,
  req.body.email,
  req.body.salary,
  req.body.address,  
  req.body.category_id
]
con.query(sql,[...values,id],(err, result) => {
  if(err) return res.json({Status: false, Error: "Query Error"})
  return res.json({Status: true, Result: result})
})
})

router.delete('/delete_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = "delete from employee where id = ?"
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

router.get('/admin_count', (req, res) => {
  const sql = "select count(id) as admin from admin";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

router.get('/employee_count', (req, res) => {
  const sql = "select count(id) as employee from employee";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

router.get('/salary_count', (req, res) => {
  const sql = "select sum(salary) as salaryOFEmp from employee";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

router.get('/admin_records',(req,res)=>{
  const sql = "select * from admin";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({Status: true})
})

//edit category 
router.get('/category/:id',(req,res)=>{
  const id =req.params.id;
  const sql = "SELECT * FROM category WHERE id=?";
  con.query(sql,[id],(err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

router.put('/edit_category/:id',(req,res)=>{
   const id=req.params.id;
  const sql = `UPDATE category SET name=? WHERE id=?`; 
  
  const values = [
    req.body.name,
    id 
  ];

  con.query(sql, values, (err, result) => {
    if(err) return res.json({Status: false, Error: "Query Error"});
    return res.json({Status: true, Result: result});
  });
});

router.delete('/delete_category/:id', (req, res) => {
  const id = req.params.id;
  const sql = "delete from category where id = ?"
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

//delete admin
router.delete('/delete_admin/:id', (req, res) => {
  const id = req.params.id;
  const sql = "delete from admin where id = ?"
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})


//marking attendance
router.post('/mark_attendance', (req, res) => {
  const sql = `INSERT INTO attendance (employee_id, date, check_in_time, check_out_time) VALUES (?, ?, ?, ?)`;
  const values = [
    req.body.employee_id, 
    req.body.date,
    req.body.check_in_time,
    req.body.check_out_time
  ];
  
  con.query(sql, values, (err, result) => {
    if(err) return res.json({Status: false, Error: "Query Error"+err})
    return res.json({Status: true, Result: result})
  })
})

//addshift
router.post('/add_shift', (req, res) => {
  const values = [ 
    req.body.shift_name,
    req.body.start_time, 
    req.body.end_time,
    req.body.shift_type
  ];
  const sql = `INSERT INTO shift_master (shift_name, start_time, end_time, shift_type) VALUES (?, ?, ?)`;
  con.query(sql, values, (err, result) => {
    if(err) return res.json({Status: false, Error: "Query Error"+err})
    return res.json({Status: true, Result: result})
  })
})

//shiftlist
router.get('/shift', (req, res) => {
  const sql = "SELECT * FROM shift_master";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

export { router as adminRouter }; 
