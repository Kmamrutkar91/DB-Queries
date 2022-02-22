const express = require('express')
const mysql = require('mysql')
const app = express()
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    port: 3307,
    database: "employee",
    user: "root",
    password: "",

})
db.connect(err => {
    if (err) throw err
    console.log("Connected")
})

app.get('/', (req, resp) => {
    resp.send("Welcome to Employee API")
})

app.get('/employee', (req, resp) => {
    db.query('select * from employee_table', (err, result) => {
        if (err) throw err
        resp.send(result)
    })
})

app.get('/employee/:empId', (req,resp)=>{
    db.query('select * from employee_table where empid =?',[req.params.empId], (err, result) => {
        if (err) throw err
        resp.send(result)
    })
})

app.put('/employee/:empId', (req,resp)=>{
    db.query('update employee_table set empSalary=? where empid=?',[req.body.empSalary, req.params.empId], (err,result,fields)=>{
        if (err) throw err
        resp.send("Record Updated Successfully!")
    })
})

app.post('/employee/addEmployee', (req,resp)=>{
    let temp=req.body
    let test = 'INSERT INTO employee_table SET ?'
    db.query(test,temp, (err,result)=>{
        if (err) throw err
        // resp.end(JSON.stringify(result))
        resp.send("Data Inserted Successfully!")
    })
})

app.delete('/employee/:empId', (req,resp)=>{
    db.query('delete from employee_table where empid=?',[req.params.empId], (err, result) => {
        if (err) throw err
        resp.send("DELETED SUCCESSFULLY!")
    })
})

app.listen('3000')