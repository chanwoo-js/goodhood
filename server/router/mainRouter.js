const express = require("express");
const router = express.Router();
// const db = require("../model/mysql")

// send - 단순 그대로 보내기
// GET-------라우터를 기점으로 db에 있는 정보를 조회하는방법
router.get("/", function(req, res){
    // ? / key=value / &:계속해서 / :id 변수 /
    let query = req.query; // req 안에는 query라고 있다. 이것은 주소란에 적힌 정보를 객체 형태로 가져오는 역할을 한다.
    console.log("[QUERY] : ", query); // 결과 => [QUERY] :  { page: '1' }
    let page = req.query.page; // req.query값이 객체이기 때문에 .page로 결과값만 바로 꺼내서 쓸 수 있게 되는것이다.
    console.log(page) // 1
    res.json({page: page}) // json {page : 1}
})

// json - json 화해서 보내기
// router.get("/hi", (req, res)=>{
//     res.json("hi");
// })

//

module.exports = router;