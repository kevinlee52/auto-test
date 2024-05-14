function reverseSorted(input: readonly number[]): number[] {
return [...input].sort().reverse();
}
const started = [1, 2, 3, 4, 5];
const res = reverseSorted(started);
console.log(started);
console.log(res);