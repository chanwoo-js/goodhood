const express = require("express");
const router = express.Router();
const db = require("../model/mysql")
const bcrypt = require("bcrypt")

// 회원가입 정보
router.post("/",(req, res)=>{
    const user = [
        req.body.user_id,
        req.body.password,
        req.body.name,
        req.body.phone_number,
        req.body.email,
    ]
    // 해쉬 암호화
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        // password를 받지 못했을 경우
        if (err) {
            console.error(err,"hashPassword err");
        }else {
            // passowrd 암호화까지 성공 했을 경우
            user.push(hashedPassword)
            const q = "INSERT INTO ghd.user (`user_id`, `password`, `name`, `phone_number`, `email`, `hashedPassword`) VALUES (?)";
            db.query(q,[user],(err, data)=>{
                if(err){
                    console.log(err,"query err")
                    res.json(false);
                }else{
                    console.log("회원가입 성공")
                    res.json(true);
                }
            })
        }
    })
})
// id 중복확인
router.post("/IdCheck",(req, res)=>{
    const user_id = req.body.user_id;
    const q = "SELECT * FROM ghd.user WHERE user_id = ?";
    db.query(q, [user_id], (err, data) => {
        if (err) {
            res.json(err);
        } else if(data.length === 0 ) {
            // [] 빈 배열 => 찾지 못했다면
            res.json(true); // 사용가능하다면
        } else {
            // data가 담겼을 경우 => 찾았다면
            res.json(false); // 이미 있다면*
        }
    });
});
module.exports = router;