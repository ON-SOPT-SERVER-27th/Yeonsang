const express = require('express');
const router = express.Router();
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
let membersDB = require('../../modules/membersDB');
/** 멤버를 생성 */
router.post('/', (req, res) => {
    // 비 구조화 할당을 사용하여 req.body 객체 안의 값 추출 가능
    const { name, part, age } = req.body;   // 1. Request 바디에서 받아올 값들을 선언!
    // const name = req.body.name; .... 와 같음

    if ( !name || !part || !age) {      // 2. 만약 클라이언트(post man)에서 필요한 정보를 안보내준다면 서버가 원하는 요청이 아니니 BAD REQUEST로 응답해주기!
        console.log('필요한 값이 없습니다!');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    const idx = membersDB[membersDB.length - 1].idx + 1;    // 3. idx(기본키) 값은 서버에서 값을 정해주자! 마지막 idx 값에서 하나 늘리기
    membersDB.push( {   // 4. membersDB는 array로 된 DB니까 Array Method push()를 이용해서 DB에 값을 추가!
        // TIP: Key - value 쌍으로 되어 있는 객체는 key - value 값이 같으면 value 값 생략 가능
        idx,    // idx: idx,
        name,
        part,
        age
    })
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_CREATE_SUCCESS, membersDB));
    // 5. 여기까지 잘 왔으면 OK response로 응답!
});

/** 모든 멤버 조회 */
router.get('/', (req, res) => {
    const members = membersDB;
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_READ_ALL_SUCCESS, members));
});

/** idx 값으로 특정 멤버 조회 */
router.get('/:idx', (req, res) => {     // 1. Request parameter에 idx 값을 담아서 idx값이랑 일치하는 member의 정보를 보고싶어요!
    const { idx } = req.params;     // 2. params에서 idx 값을 받아와서 idx 변수에 저장!

    if ( !idx ) {       // 3. Params에서 받아온 idx 값을 요청을 안했다면 BAD REQUEST로 응답
        console.log('필요한 값이 없습니다!');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    const member = membersDB.find(member => member.idx == idx); // 4. 받아온 idx값이 membersDB에 존재하는 디비인지 체크!

    if(member === undefined) {      // 5. idx가 없는 값이면 BAD REQUEST로 응답
        console.log('idx가 유효하지 않습니다'); 
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }
    
    // 6. idx를 DB에서 잘 찾아왔다면 response OK
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_READ_SUCCESS, member));
});

/** idx값으로 특정 멤버 삭제 */
router.delete('/:idx', (req, res) => {
    const { idx } = req.params;

    if( !idx ) {
        console.log('필요한 값이 없습니다!');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    const member = membersDB.filter(member => member.idx == idx);   // filter 메소드도 됩니당

    if(member.length === 0) {
        console.log('idx가 유효하지 않습니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    // filter() 사용해서 클라에서 받아온 idx 값이 아닌 걸로 골라서 membersDB로 다시 할당해 줌
    membersDB = membersDB.filter(member => member.idx != idx);
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_DELETE_SUCCESS, membersDB));
});

/** idx값으로 특정 멤버 정보 수정 */
router.put('/:idx', (req, res) => {
    const { idx } = req.params;
    const { name, part, age } = req.body;

    if( !idx ) {
        console.log('필요한 값이 없습니다!');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    if ( !name || !part || !age) {
        console.log('필요한 값이 없습니다!');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    const memberIdx = membersDB.findIndex(member => member.idx == idx);     // findIndex()를 사용해서 idx가 몇 번째 배열에 있는지 확인

    if(memberIdx === -1){
        console.log('idx가 유효하지 않습니다');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    membersDB[memberIdx] = {
        // membersDB[memberIdx] 인덱스에 접근하여 값 수정
        idx: Number.parseInt(idx),  // params로 들어온 값은 String으로 들어오게 되어, int형으로 변환 필요하다
        name,
        part,
        age,
    }

    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_UPDATE_SUCCESS, membersDB));
});

module.exports = router;