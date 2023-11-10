const StringValidate = (inputString) =>{
    let  value = inputString.replace(/\s+/g, ' ');
    return value.toLowerCase();
}

export default StringValidate;