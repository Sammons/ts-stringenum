
var fs = require('fs')

const GenTypeTokens = (count, customPrefix) => {
    let prefix = customPrefix || 'S';
    let tokens = [];

    for (let i = 1; i <= count; ++i) {
        tokens.push(prefix + i);
    }

    return tokens;
};

const GenerateSequenceOfFunctions = (count) => {
    let functionStrings = '';
    for (var i = count; i > 0; --i) {
        let tokens = GenTypeTokens(i);
        let functionDef = functionTemplate(tokens);
        functionStrings += functionDef;
    }
    return functionStrings;
}

const GenerateStringEnumModule = (maxTupleLength) => {
    fs.writeFileSync('index.d.ts',
        moduleTemplate(GenerateSequenceOfFunctions(maxTupleLength || 10)));
}

const moduleTemplate = (functionStrings) =>
`
declare module 'ts-stringenum' {
    import {StringEnum} from '~ts-stringenum';
    export {StringEnum};
    export default StringEnum;
}
declare module '~ts-stringenum' {
    ${functionStrings}
}
`;


const functionTemplate = (tokenList) => `

    /** 
     * Generates an object from an array of strings
     * where each string becomes a key and a value
     * e.g { hello: 'hello' }
     */
    export function StringEnum<
        ${tokenList.map(t => ` ${t} extends string `).join()}
    >( s: [${tokenList.join()}] ): 
        ${
    tokenList.map((t, i) => `
                { [Key in (typeof s)['${i}']]: (typeof s)['${i}'] }
            `).join(' & ')
    };

`;

if (!module.parent) {
    GenerateStringEnumModule(25)
}