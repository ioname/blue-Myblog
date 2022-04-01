let id1 = '13'
let end1 = '2'
let list = {
    1:25,
    2:30,
    3:1,
    4:5
}
let arr = Object.keys(list).sort(function(a,b){return list[b]-list[a]});
let a = []

console.log(arr);
    // console.log(cmd);