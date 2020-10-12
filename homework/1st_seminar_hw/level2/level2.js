const member_array = require('./team3_members');

const introduce_members = member_array.map( member => {
    console.log(`이름: ${member.name}, 집: ${member.home}, 나이: ${member.age}, 취미: ${member.hobby}`);
});
