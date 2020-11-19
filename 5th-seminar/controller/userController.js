const crypto = require('crypto');
const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { User } = require('../models');
const { userService } = require('../service');


module.exports = {
    signup : async (req, res) => {
        const {
            email,
            password,
            userName
        } = req.body; // 1. req.body에서 데이터 가져오기
    
        //2. request data 확인하기, email, password, userName data가 없다면 NullValue 반환
        if (!email || !password || !userName) {
            console.log('필요한 값이 없습니다!');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
    
        try {
            //3. 존재하는 이메일인지 확인하기. 이미 존재하는 이메일면 ALREADY ID 반환
            
            /*
            const alreadyEmail = await User.findOne({
                where: {
                    email: email,
                }
            });
            */
            
            const alreadyEmail = await userService.readOneEmail(email);
    
            if (alreadyEmail) {
                console.log('이미 존재하는 이메일입니다.');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
            }
            
            /*
            //4. salt 생성 
            const salt = crypto.randomBytes(64).toString('base64');
            //5. 2차 세미나때 배웠던 pbkdf2 방식으로 (비밀번호 + salt) => 암호화된 password
            const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
    
            //6. User email, 암호화된 password, salt, userName 생성!
            const user = await User.create({
                email: email,
                password: hashedPassword,
                userName: userName,
                salt: salt,
            });
            */
            
            const user = await userService.signup(email, userName, password);
    
            console.log(user.userName);
            console.log(user);
            //7. status: 200 message: SING_UP_SUCCESS, data: id, email, userName 반환! (비밀번호, salt 반환 금지!!)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_UP_SUCCESS, {
                id: user.id,
                email,
                userName
            }));
        } catch (error) {
            console.error(error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_UP_FAIL));
        }
    },

    signin : async (req, res) => {
        const {id, password} = req.body; // 1. req.body에서 데이터 가져오기
        //2. request data 확인하기, id 또는 password data가 없다면 NullValue 반환
        if( !id || !password ){
            console.log('id 혹은 비밀번호가 입력되지 않았습니다');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
    
        //3. 존재하는 아이디인지 확인하기. 존재하지 않는 아이디면 NO USER 반환
        const mem = usersDB.filter(mem => mem.id == id);
        if(mem.length === 0) {
            console.log('id가 존재하지 않습니다.');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
        }
    
        //4. 비밀번호 확인하기 - 로그인할 id의 salt를 DB에서 가져와서  사용자가 request로 보낸 password와
        //   암호화를 한후 디비에 저장되어있는 password와 일치하면 true일치하지 않으면 Miss Match password 반환
        //5. status: 200 ,message: SIGNIN SUCCESS, data: id 반환 (비밀번호, salt 반환 금지!!)
        const salt = mem[0].salt;
        const encrypted_pw = mem[0].password;
        crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err,key) => {
            if(key.toString('base64') === encrypted_pw) {
                console.log('로그인 성공!');
                return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, id));
            }
            else {
                console.log('로그인 실패');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.SIGN_IN_FAIL));
            }
        })
    },

    readAll : async (req, res) => {
        //1. 모든 사용자 정보 (id, email, userName ) 리스폰스!
        // status: 200, message: READ_USER_ALL_SUCCESS, data: id, email, userName 반환
        try {
            const users = await User.findAll({
                attributes: ['id', 'email', 'userName'],
            });
            console.log(users);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_USER_ALL_SUCCESS, users));
        } catch (error) {
            console.error(error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusc.INTERNAL_SERVER_ERROR, responseMessage.READ_USER_ALL_FAIL));
        }
    },

    readOne : async (req, res) => {
        //1. parameter로 id값을 받아온다! (id값은 인덱스값)
        const {
            id
        } = req.params;
        //2. id값이 유효한지 체크! 존재하지 않는 아이디면 NO_USER 반환
        try {
            const user = await User.findOne({
                where: {
                    id: id,
                },
                attributes: ['id', 'email', 'userName'],
            });
    
            if (!user) {
                console.log('존재하지 않는 아이디 입니다.');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
            }
            //3. status:200 message: READ_USER_SUCCESS, id, email, userName 반환
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_USER_SUCCESS, user));
        } catch (error) {
            console.error(error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.READ_USER_FAIL));
        }
    }
}