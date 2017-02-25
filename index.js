
var StringEnum = (strings) => {
    var result = {};
    if (!Array.isArray(strings)) { return result; }
    for (var s of strings) {
        result[s] = [s];
    }
    return result;
};

exports.default = StringEnum;
exports.StringEnum = StringEnum;