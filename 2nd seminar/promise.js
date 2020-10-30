
/* const getNumber = new Promise((resolve, reject) => {
    console.log("getNumber Pending");
    setTimeout(() => {
        resolve(100);
    }, 1000);
})


getNumber
    .then(value => {
        console.log(value);
        return value * 2;
    })  // promise 만들어 지니까 1초 걸림
    .then(value => {
        console.log(value);
        return value * 3;
    })  // 이미 promise 있어서 1초 지연 X
    .then(value => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(value + 1000);
        }, 1000)
    })  // 새로 promise를 만드니까 1초 걸림
})
.then(value => console.log(value));
*/

// 중학교 -> 고등학교 -> 대학교
const 자퇴 = true;
const middleSchool = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(`중학교`);
  }, 1000)
});

const highSchool = school => new Promise((resolve, reject) => {
  if (자퇴) {
    setTimeout(() => {
      reject(new Error('에러!'));
    }, 1000)
  } else {
    setTimeout(() => {
      resolve(`${school} => 고등학교`);
    }, 1000)
  }
})

const univ = school => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(`${school} => 대학교`);
  }, 1000)
})

middleSchool() //
  .then(school => highSchool(school))
  .catch(err => {
    return `검정고시`;
  })
  .then(school => univ(school))
  .then(result => console.log(result))
  .catch(error => console.error(error));