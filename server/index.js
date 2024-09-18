import express from 'express'
import mongoose from 'mongoose'
 import { Users } from './model/users.model.js';
import cors from 'cors';

//TvQ1yGt4csNc1lcr
const app = express()
const PORT = 3000;

app.use(express.json())
app.use(cors())

app.get('/api/users', async(req, res) => {
    try{
        const users = await Users.find()
        res.status(200).json(users)

    }catch(error){
        res.status(500).json({message: error.message})
    }  
});

app.post('/api/users', async(req, res) =>{

    try{
        const userGot = await Users.create(req.body)
        if (!userGot) return res.status(200).json({message: 'user not there'}) 
        res.status(201).json(req.body)

    }catch(error){
        res.status(400).json({message: error.message})
    }
})
app.get('/api/users/:username', async(req, res) =>{
   const {username} = req.params
    try{
        const user = await Users.findOne({ users: { $regex: username, $options: 'i' } })
        if (!user) return res.status(200).json({message: 'user not there'}) 
        res.status(201).json(user)

    }catch(error){
        res.status(400).json({message: error.message})
    }
});

// PATCH route to find a user by name and update their gifname
app.patch('/api/users/:name', async (req, res) => {
    const { name } = req.params;  // Get the user's name from URL parameters
    const { gifname } = req.body;  // Get the new gifname from the request body
  
    try {
      // Find the user by their "users" field (name) and update their gifname
      const updatedUser = await Users.findOneAndUpdate(
        { users: name }, // Search by the 'users' field (username)
        { gifname },     // Update the gifname
        { new: true }    // Return the updated user object
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(updatedUser);  // Return the updated user data
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  



 
mongoose.connect('mongodb+srv://irukaonwubiko:TvQ1yGt4csNc1lcr@first.iz7vq.mongodb.net/?retryWrites=true&w=majority&appName=first')
 .then(() => {
    console.log('connected')
    app.listen(PORT, () =>console.log(`your server is running on PORT ${PORT}`))
 } )
 .catch(() =>{
    console.log('error')

 })

