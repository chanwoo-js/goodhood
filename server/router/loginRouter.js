const express = require("express");
const router = express.Router();
const db = require("../model/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", (req, res, next) => {
    const { userId, password } = req.body;
    const idRegex = /^[a-zA-Z0-9]{4,13}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;

    if (
        !userId ||
        !password ||
        !idRegex.test(userId) ||
        !passwordRegex.test(password)
    ) {
        // 정규식, 유효성 하나라도 틀리면
        res.json(false);
    } else {
        // 정규식, 유효성 다 맞다면
        const q = "SELECT * FROM ghd.user WHERE user_id = ?";
        db.query(q, [userId], (err, data) => {
            if (data.length === 0) {
                // 아이디가 없다면
                console.log("사용자 인증 실패: 아이디 또는 비밀번호가 일치하지 않습니다.");
                res.json(false);
            } else {
                // 아이디가 있다면
                bcrypt.compare(password, data[0].hashedPassword, (err, result) => {
                    if (err) {
                        console.log(err, "비밀번호 검사 중 오류 발생");
                        res.json(false);
                    } else {
                        if (result) {
                            console.log(
                                "사용자 인증 성공: 아이디와 비밀번호가 일치합니다."
                            );
                            const token = jwt.sign(
                                {
                                    userId: data[0].user_id,
                                    name: data[0].name,
                                    isAdmin: data[0].is_admin,
                                },
                                "my_secret_key",
                                { expiresIn: "2h" }
                            );
                            res.cookie("token", token, {
                                httpOnly: true,
                                secure: true,
                                sameSite: "none",
                                maxAge: 2 * 60 * 60 * 1000,
                            });
                            res.json({ token });
                        } else {
                            console.log(
                                "사용자 인증 실패: 아이디 또는 비밀번호가 일치하지 않습니다."
                            );
                            res.json(false);
                        }
                    }
                });
            }
        });
    }
});

module.exports = router;
