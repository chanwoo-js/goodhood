const express = require("express");
const router = express.Router();
const db = require("../model/mysql")

router.get("/", (req, res)=>{
    const q = "SELECT * FROM user";
    db.query(q,(err,data) =>{
        if(err){
            res.json(err)
        }else {
            res.json(data)
        }
    })
})

// POST-------라우터를 기점으로 서버에서 직접 작성하여 정보를 가지고 db에 저장하는법1
router.post("/",(req, res)=> {
    const q = "INSERT INTO ghd.user (`name`,`user_id`,`password`,`phone_number`,`email`,`is_admin`) VALUES (?)";
    const values = [`이태영`,`snfjddl`,`snfjd13241324`,`01087255389`,`snfjddl@gmail.com`,`0` ];
    db.query(q,[values],(err, data)=> {
        if(err){
            res.json(err)
        }else{
            res.json("성공")
        }
    })
})

// POST-------라우터를 기점으로 body에 있는 정보를 가져온뒤 db에 저장하는법
router.post("/",(req, res)=> {
    const q = "INSERT INTO ghd.user (`name`,`user_id`,`password`,`phone_number`,`email`,`is_admin`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.user_id,
        req.body.password,
        req.body.phone_number,
        req.body.email,
        req.body.is_admin,
        ];
    db.query(q,[values],(err, data)=> {
        if(err){
            res.json(err)
        }else{
            res.json("성공")
        }
    })
})


router.delete("/:user_id",(req, res)=>{
    const user_id = req.params.user_id;
    const q = "DELETE FROM ghd.user WHERE user_id = ?"

    db.query(q,[user_id],(err,data)=>{
        if(err){
            res.json(err)
        }else{
            res.json("성공")
        }
    })
})


module.exports = router;