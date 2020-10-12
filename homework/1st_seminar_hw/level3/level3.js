const members = require('./members');

// filter members
const OB_members = members.filter(i => i.status === 'OB');
const YB_members = members.filter(i => i.status === 'YB');

// Randomize each arrays
const Randomize = memArr => {
    for(var i = 0; i < memArr.length; i++) {
        // pick two random numbers and swap - memArr.length times
        tmp1 = Math.floor(Math.random() * memArr.length);
        tmp2 = Math.floor(Math.random() * memArr.length);
        [ memArr[tmp1], memArr[tmp2] ] = [ memArr[tmp2], memArr[tmp1] ];
    }
    return memArr;
};

// Organize in 'n' groups
const Organize = n => {
    const OB = Randomize(OB_members);
    const YB = Randomize(YB_members);
    var ans = new Array();

    // Initialize Answer array
    for(var i = 1; i <= n; i++){
        ans.push( [`< Group ${i} >`] );
    }

    // Push members
    OB.forEach( mem => ans[OB.indexOf(mem)%n].push(mem) );
    YB.forEach( mem => ans[YB.indexOf(mem)%n].push(mem) );

    return ans;
}

console.log(Organize(5));