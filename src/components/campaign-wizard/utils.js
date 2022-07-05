
export const phoneNumberCorrection = (text) => {

    let newText = String(text).trim();
    if (newText === "")
        return String("");
    newText = newText.replace(/\D/g, '');
    newText = newText.replace('-', '');

    if (newText.length < 9)
        return String(text);

    //  correction
    if (newText.startsWith("0972"))
        newText = newText.replace(/^(0972)/, "972");

    if (newText.startsWith("05"))
        newText = newText.replace(/^(05)/, "9725");

    if (newText.startsWith("07"))
        newText = newText.replace(/^(07)/, "9727");

    if (newText.startsWith("5") && newText.length == 9)
        newText = newText.replace(/^(5)/, "9725");

    if (newText.startsWith("7") && newText.length == 9)
        newText = newText.replace(/^(7)/, "9727");

    if (newText.startsWith("972") && newText.length == 12)
        return newText;

    // TODO - handle international numbers
    return "";
}

export const phoneNumberExtract = (text) =>{
    
    var regex =/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/g;
    
    let newText = String(text).trim();
    if (newText === "")
        return "";
    let res = newText.match(regex);
    
    if(res !== null) {
        return [...res];
    }

    return [];
}

export const uniqueID = () => {
    return Math.floor(Math.random() * Math.random() * Date.now())
}
