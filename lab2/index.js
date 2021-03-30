//I pledge my honor that I have abided by the Stevens Honor System.
const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");

// Mean Tests
try {
    // Should Pass
    const meanOne = arrayUtils.mean([21, 21, 21]);
    console.log('mean passed successfully');
}
catch (e) {
    console.error('mean failed test case');
}
try {
    // Should Fail
    const meanTwo = arrayUtils.mean([]);
    console.error('mean did not error');
}
catch (e) {
    console.log('mean failed successfully');
}

// MedianSquared Tests
try {
    // Should Pass
    const medSqOne = arrayUtils.medianSquared([3, 5, 7, 2, 1, 121, 4, 100]);
    console.log('medianSquared passed successfully');
}
catch (e) {
    console.error('medianSquared failed test case');
}
try {
    // Should Fail
    const medSqTwo = arrayUtils.medianSquared(["dog", "cat", "rabbit", "horse", "chicken"]);
    console.error('medianSquared did not error');
}
catch (e) {
    console.log('medianSquared failed successfully');
}

// MaxElement Tests
try{
    //Should Pass
    const maxElemOne = arrayUtils.maxElement([1, 3, 500, -20, 5]);
    console.error('maxElement passed successfully');
}
catch (e){
    console.error('maxElement failed test case');
}
try{
    //Should Fail
    const maxElemTwo = arrayUtils.maxElement([1, 3, "hello", -20, 5]);
    console.error('maxElement did not error');
}
catch (e){
    console.error('maxElement failed successfully');
}

// Fill Tests
try{
    //Should Pass
    const fillOne = arrayUtils.fill(5, "yay");
    console.error('fill passed successfully');
}
catch (e){
    console.error('fill failed test case');
}
try{
    //Should Fail
    const fillTwo = arrayUtils.fill();
    console.error('fill did not error');
}
catch (e){
    console.error('fill failed successfully');
}

// CountRepeating Tests
try{
    //Should Pass
    const countRepOne = arrayUtils.countRepeating(["dog", 7, "cat", "dOg", "7", 7]);
    console.error('countRepeating passed successfully');
}
catch (e){
    console.error('countRepeating failed test case');
}
try{
    //Should Fail
    const countRepTwo = arrayUtils.countRepeating(["dog", 7, "cat", "dOg", "7", [7]]);
    console.error('countRepeating did not error');
}
catch (e){
    console.error('countRepeating failed successfully');
}

// IsEqual Tests
try{
    //Should Pass
    const isEqOne = arrayUtils.isEqual([1, [4,6,5]], [[5,4,6], 1]);
    console.error('isEqual passed successfully');
}
catch (e){
    console.log(e);
    console.error('isEqual failed test case');
}
try{
    //Should Fail
    const isEqTwo = arrayUtils.isEqual([10, 22, 37]);
    console.error('isEqual did not error');
}
catch (e){
    console.error('isEqual failed successfully');
}

//CamelCase Tests
try{
    //Should Pass
    const camCaseOne = stringUtils.camelCase("Wow thIS iS SO FuN");
    console.error('camelCase passed successfully');
}
catch (e){
    console.error('camelCase failed test case');
}
try{
    //Should Fail
    const camCaseTwo = stringUtils.camelCase("          ");
    console.error('camelCase did not error');
}
catch (e){
    console.error('camelCase failed successfully');
}

// ReplaceChar Tests
try{
    //Should Pass
    const repCharOne = stringUtils.replaceChar("HihoHeha");
    console.error('replaceChar passed successfully');
}
catch (e){
    console.error('replaceChar failed test case');
}
try{
    //Should Fail
    const maxElemTwo = stringUtils.replaceChar("");
    console.error('replaceChar did not error');
}
catch (e){
    console.error('replaceChar failed successfully');
}

// MashUp Tests
try{
    //Should Pass
    const mashUpOne = stringUtils.mashUp("Chicken", "Tender");
    console.error('mashUp passed successfully');
}
catch (e){
    console.error('mashUp failed test case');
}
try{
    //Should Fail
    const mashUpOne = stringUtils.mashUp("Hello", 7);
    console.error('mashUp did not error');
}
catch (e){
    console.error('mashUp failed successfully');
}

// MakeArrays Tests
try{
    //Should Pass
    const makeArrOne = objUtils.makeArrays([{a:1, b:2, c:3}, {d:4, e:5}, {f:6}, {g:7}]);
    console.error('makeArrays passed successfully');
}
catch (e){
    console.error('makeArrays failed test case');
}
try{
    //Should Fail
    const makeArrTwo = objUtils.makeArrays([{a:1, b:2, c:3}, {d:4, e:5}, {f:6}, 7]);
    console.error('makeArrays did not error');
}
catch (e){
    console.error('makeArrays failed successfully');
}

// IsDeepEqual Tests
try{
    //Should Pass
    const isDeEqOne = objUtils.isDeepEqual({a:{c:3, b:2}, d:4, f:{e:5}}, {f:{e:5}, a:{b:2, c:3}, d:4});
    console.error('isDeepEqual passed successfully');
}
catch (e){
    console.error('isDeepEqual failed test case');
}
try{
    //Should Fail
    const isDeEqTwo = objUtils.isDeepEqual({a:1, b:2, c:3});
    console.error('isDeepEqual did not error');
}
catch (e){
    console.error('isDeepEqual failed successfully');
}

// ComputeObject Tests
try{
    //Should Pass
    const compObjOne = objUtils.computeObject({a:2, b:4, c:6, d:8, e:10}, (x => {x*x}));
    console.error('computeObject passed successfully');
}
catch (e){
    console.error('computeObject failed test case');
}
try{
    //Should Fail
    const compObjTwo = objUtils.computeObject({a:2, b:4, c:6, d:8, e:10}, "700");
    console.error('computeObject did not error');
}
catch (e){
    console.error('computeObject failed successfully');
}

