import User from "../model/userModel.js";

export const create = async (req, res)=>{
    console.log("I am here!")
    try{
        const userData = new User (req.body);
        const {email} = userData;

        const userExist = await User.findOne({email})
        if (userExist){
            return res.status(400).json({message: "User already exists."});
        }
        const savedUser = await userData.save();
        res.status(200).json (savedUser);
    } catch (error) {
        res.status(500).json({error: "Internal Server error."});   
    }
};

export const fetch = async (req, res)=>{
    try {
        const users = await User.find();
        if (users.length === 0){
            return res.status(404).json({message: "User not Found"});
        }
        res.status(200).json(users);
    } catch (error){
        res.status(500).json({error: "Internal Server error."})
    }
};

export const update = async ( req, res) => {
    try{
        const id = req.params.id;
        const userExist = await User.findOne({_id:id })
        if (!userExist){
            return res.status(404).json({message: "User not Found."});
        }
        const updateUser = await User.findByIdAndUpdate(id, req.body, {new:true})
        res.status(201).json(updateUser);
    } catch (error) {
        res.status(500).json({ error: "Internal Server  error."});
    }
}

export const deleteUser = async(req, res) =>{
    try {
        const id = req.params.id;
        const userExist = await User.findOne({ _id : id })
        if (!userExist){
            return res.status(404).json({message: "User not Found."});
        }
        await User.findByIdAndDelete(id);
        res.status(201).json({message: "User deleted successfully."});
    } catch (error) {
        res.status(500).json({ error: "Internal Server error."});
    }
}