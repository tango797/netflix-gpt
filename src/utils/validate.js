

export const checkValidData = (email,password,name)=>{

const isValidEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
const isValidPassword =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
const isValidName = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/.test(name)
if(!isValidEmail) return "Email Id Not valid"
if(!isValidPassword) return "Password is not null"
if(!isValidName) return "Name is not valid"
return null;
};

