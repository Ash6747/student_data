const express = require("express");
const router = express.Router();
const student = require("../models/studentSchema");



// router.get("/",(req,res)=>{
//     console.log("connect");
// });

// register student

router.post("/register",async(req,res)=>{
    // console.log(req.body);
    const {name,email,age,mobile,gender,add,desc} = req.body;

    if(!name || !email || !age || !mobile || !gender || !add || !desc){
        res.status(422).json("plz fill the data");
    }

    try {
        
        const prestudent = await student.findOne({email:email});
        console.log(prestudent);

        if(prestudent){
            res.status(422).json("this is user is already present");
        }else{
            const addstudent = new student({
                name,email,age,mobile,gender,add,desc
            });

            await addstudent.save();
            res.status(201).json(addstudent);
            console.log(addstudent);
        }

    } catch (error) {
        res.status(422).json(error);
    }
})


// get studentdata

router.get("/getdata",async(req,res)=>{
    try {
        const studentdata = await student.find();
        res.status(201).json(studentdata)
        console.log(studentdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get individual student

router.get("/getstudent/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const studentindividual = await student.findById({_id:id});
        console.log(studentindividual);
        res.status(201).json(studentindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})


// update student data

router.patch("/updatestudent/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updatedstudent = await student.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updatedstudent);
        res.status(201).json(updatedstudent);

    } catch (error) {
        res.status(422).json(error);
    }
})


// delete student
router.delete("/deletestudent/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletstudent = await student.findByIdAndDelete({_id:id})
        console.log(deletstudent);
        res.status(201).json(deletstudent);

    } catch (error) {
        res.status(422).json(error);
    }
})




module.exports = router;