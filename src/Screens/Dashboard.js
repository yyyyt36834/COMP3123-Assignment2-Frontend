import React, { useState,useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  
//import SessionContext from '../Contexts/Context';



export default function Dashboard() {

  const [employees, setEmployees] = useState([]); 
  const [employeeId, setEmployeeId] = useState('');
  const [employeeData, setEmployeeData] = useState({
      first_name: '',
      last_name: '',
      email: '',
      position: '',
      salary: 0,
      date_of_joining: '',
      department:  ''
  });
  const [option, setOption] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  // Get the state of login from context
  // const { value, setValue } = useContext(SessionContext); 

  // if the user is not logged in, redirect them to the login screen
  // if (!value.isAuthenticated) {
  //   navigate('/');
  // }

  // Check if the user is already logged in   
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); 
    }
  }, []);

  const getEmployees = async () => {
    try {
      const response = await axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/emp/employees`);
      setEmployees(response.data);  // Store the response data (employees) in the state
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // load employees data when the component mounts
  useEffect(() => {
    
    getEmployees(); 
  }, []);

  // log out the user
  const logout = () =>{ 
    // setValue({ isAuthenticated: false });
    // navigate('/'); 
    localStorage.removeItem('token'); 
    navigate('/');
  }

  // make a HTTP request to backend to delete an employee
  const addEmployeeToDB = async () =>{
    try {
      const response = await axios.post(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/emp/employees`, employeeData);
      alert('Employee added successfully');
      await getEmployees();
    } catch (error) {
      console.error('Error adding employee:', error);
  }
}
const updateEmployeeToDB = async () =>{
  try {
    const response = await axios.put(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/emp/employees/${employeeId}`, employeeData);
    alert('Employee updated successfully');
    await getEmployees();

  } catch (error) {
    console.error('Error updating employee:', error);
}
}

  //HTTP request to backend
  const addEmployee = () =>{
    return (
      <div>
            <h3>Add Employee</h3>
            <input
              type="text" name="first_name" placeholder="First Name" value={employeeData.first_name}
              onChange={(e)=>setEmployeeData({ ...employeeData, first_name: e.target.value })}
            />
            <input type="text" name="last_name" placeholder="Last Name"  value={employeeData.last_name}
              onChange={(e)=>setEmployeeData({ ...employeeData, last_name: e.target.value })}
            />
            <input type="email" name="email" placeholder="Email Address" value={employeeData.email}
              onChange={(e)=>setEmployeeData({ ...employeeData, email: e.target.value })}
            />
            <input type="text" name="position" placeholder="Position" value={employeeData.position}
              onChange={(e)=>setEmployeeData({ ...employeeData, position: e.target.value })}
            />
            <input type="number"  name="salary"  placeholder="Salary" value={employeeData.salary}
              onChange={(e)=>setEmployeeData({ ...employeeData  , salary: e.target.value })}
            />
            <input type="date" name="date_of_joining" value={employeeData.date_of_joining}
              onChange={(e)=>setEmployeeData({ ...employeeData, date_of_joining: e.target.value })}
            />
            <input type="text" name="department" placeholder="Department" value={employeeData.department}
              onChange={(e)=>setEmployeeData({ ...employeeData  , department: e.target.value })}
            />
            <button onClick={addEmployeeToDB}>Add Employee</button>
          </div>
    );
  }

  const viewDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/emp/employees/${employeeId}`);
      setEmployeeDetails(response.data);      
    } catch (error) {
      console.error('Error fetching employee:', error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (employeeId && option === 'viewDetails') {
      viewDetails();
    }
  }, [employeeId]);
 

  const updateEmployee = () =>{
    console.log("update info");  
    return (
      <div>
      <input type="text" name="first_name" placeholder="First Name" value={employeeData.first_name}
      onChange={(e)=>setEmployeeData({ ...employeeData, first_name: e.target.value })}
      />
      <input type="text" name="last_name" placeholder="Last Name"  value={employeeData.last_name}
        onChange={(e)=>setEmployeeData({ ...employeeData, last_name: e.target.value })}
      />
      <input type="email" name="email" placeholder="Email Address" value={employeeData.email}
        onChange={(e)=>setEmployeeData({ ...employeeData, email: e.target.value })}
      />
      <input type="text" name="position" placeholder="Position" value={employeeData.position}
        onChange={(e)=>setEmployeeData({ ...employeeData, position: e.target.value })}
      />
      <input type="number"  name="salary"  placeholder="Salary" value={employeeData.salary}
        onChange={(e)=>setEmployeeData({ ...employeeData  , salary: e.target.value })}
      />
      <input type="date" name="date_of_joining" value={employeeData.date_of_joining}
        onChange={(e)=>setEmployeeData({ ...employeeData, date_of_joining: e.target.value })}
      />
      <input type="text" name="department" placeholder="Department" value={employeeData.department}
        onChange={(e)=>setEmployeeData({ ...employeeData  , department: e.target.value })}
      />
      <button onClick={updateEmployeeToDB}>Update Employee</button>
    </div>
    )
  }
  const deleteEmployee = async () =>{
    if (!employeeId) {
      alert('Please select an employee to delete.');
      setOption('');
      return;
    }

    try {
      const response = await axios.delete(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/emp/employees?eid=${employeeId}`);
      await getEmployees();
      alert('Employee deleted successfully');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  }


  const handleRadioButton = (event) =>{ 
    const selectedEmployeeId = event.target.value; 
    setEmployeeId(selectedEmployeeId); 
  }

  

  return (
        <div>
        <select onChange={(e) => setOption(e.target.value)}>
          <option value="">Select an option</option>
          <option value="addEmployee">Add Employee</option>
          <option value="viewDetails">View Details</option>
          <option value="updateEmployee">Update Information</option>
          <option value="deleteEmployee">Delete Employee</option>
        </select>

        {option === 'addEmployee' && addEmployee()}
        {option === 'viewDetails' && (
        <div>
          {loading ? (
            <p>Loading...</p> // Display loading while waiting for the data
          ) : employeeDetails ? (
            <div>
              <h3>Employee Details</h3>
              <p>First Name: {employeeDetails.first_name}</p>
              <p>Last Name: {employeeDetails.last_name}</p>
              <p>Email: {employeeDetails.email}</p>
              <p>Position: {employeeDetails.position}</p>
              <p>Salary: {employeeDetails.salary}</p>
              <p>Date of Joining: {employeeDetails.date_of_joining}</p>
              <p>Department: {employeeDetails.department}</p>
              <p>Created At: {employeeDetails.created_at}</p>
              <p>Updated At: {employeeDetails.updated_at}</p>
            </div>
          ) : (
            <p>No employee details found</p>
          )}
        </div>
      )}
        {option === 'updateEmployee' && loading === false && updateEmployee()}
        {option === 'deleteEmployee' && <div>
          <button onClick={deleteEmployee}>Delete Selected Employee</button>
        </div>}

        {employees.map(employee => (
          <div key={employee._id}>
            <input 
              type="radio" 
              id={employee._id} 
              name="employee" 
              value={employee._id} 
              onChange={handleRadioButton} 
            />
            <label htmlFor={employee._id}>
              {employee.first_name} {employee.last_name} | Email: {employee.email}
            </label>
          </div>
        ))}
        <button onClick={logout}>Logout</button>
    </div>
  )
}
