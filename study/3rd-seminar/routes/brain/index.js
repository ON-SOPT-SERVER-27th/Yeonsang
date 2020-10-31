const express = require('express');
const router = express.Router();

const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');

const brainsDB = require('../../modules/brainsDB');

router.get('/', (req, res) => {
    const brains = brainsDB;

    const result = {
        status : 200,
        message : "전체 회원 조회 성공",
        data : brains
    }
    return res.status(200).send(result);
    // return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_READ_ALL_SUCCESS, brains));
});

module.exports = router;