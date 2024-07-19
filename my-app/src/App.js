import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
function App() {
const MOCK_API_URL = 'https://6695de320312447373c04622.mockapi.io/:endpoint'

const {users, setUsers} = useState([{}])

const {newUserName, setNewUserName} = useState('')
const {newUserAddress, setNewUserAddress} = useState('')
const {newUserPosition, setNewUserPosition} = useState('')


const {updatedName, setUpdatedName} = useState('')
const {updatedAddress, setUpdatedAddress} = useState('')
const {updatedPosition, setUpdatedPosition} = useState('')

function getUsers() {
  fetch(MOCK_API_URL)
    .then(data => data.json())
    .then(data => setUsers(data))
}
useEffect(getUsers, [])

function deleteUser(id) {
fetch(`${MOCK_API_URL}/${id}`, {
  method: 'DELETE'
}).then(() => {
  getUsers()
})
}

function updateUser(e,userObject) {
e.preventDefault()

  let updatedUserObject = {
    ...userObject}
    
    
    

  

fetch('${MOCK_API_URL}/${userObject.id}', {
  method: 'PUT',
  body: JSON.stringify(),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(() => getUsers())

}

function postNewUser(e) {
e.preventDefault()
   
  fetch(MOCK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newUserName,
      address: newUserAddress,
      position: newUserPosition
    
})
  }).then(() => getUsers())
}

  return

<div className="App">
    <>
    <form>
        <h3>Post new user form</h3>
        <label>Name</label>
        <input onChange={(e) => setNewUserName(e.target.value)}></input>
        <label>Address</label>
        <input onChange={(e) => setNewUserAddress(e.target.value)}></input>
        <label>Position</label>
        <input onChange={(e) => setNewUserPosition(e.target.value)}></input>
        <button onClick={(e) => postNewUser(e)}>Submit</button>
    </form>
    </>
</div>

    {users.map((user, index) => (
        <div key={index}>
            <div className="user">
                <div>Name: {user.name}</div><br></br>
                <div>Address: {user.address}</div><br></br>
                <div>Position: {user.position}</div><br></br>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
            <form>
                <h3>Update user form</h3>
                <label>Name</label>
                <input onChange={(e) => setUpdatedName(e.target.value)}></input>
                <label>Address</label>
                <input onChange={(e) => setUpdatedAddress(e.target.value)}></input>
                <label>Position</label>
                <input onChange={(e) => setUpdatedPosition(e.target.value)}></input>
                <button onClick={() => updateUser(user)}>Submit</button>
            </form>
        </div>
    ))}
  
}

export default App;
