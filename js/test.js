var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// function reverseSorted(input: number[]): number[] {
// return input.sort().reverse();
// }
// const started = [1, 2, 3, 4, 5];
// const res = reverseSorted(started);
// console.log(started);
// console.log(res);
function reverseSorted(input) {
    return __spreadArray([], input, true).sort().reverse();
}
var started = [1, 2, 3, 4, 5];
var res = reverseSorted(started);
console.log(started);
console.log(res);
