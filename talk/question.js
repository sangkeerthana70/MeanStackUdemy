//here we expose the method called ask and chaining it to module.exports. 
var answer = "Now that's a good question";

module.exports.ask = function(question) {
    console.log(question);
    return answer;
};