export function validateStringParameter(keyName: string, inputValue: string) {
    if(!inputValue && !inputValue.length) {
        throw new Error(`${keyName} value is undefined: actual value ${inputValue}`)
    }
}