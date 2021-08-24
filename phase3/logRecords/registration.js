let readline = require("readline-sync");
let fname_input = readline.question("Enter first name: ");
let lname_input = readline.question("Enter last name: ");
let gender_input = readline.question("Enter gender: ");
let email_input = readline.questionEMail("Enter email: ");

let fs = require("fs");

fs.readFile('db.json', 'utf8', function readFileCallback(err, data){
    if(err)
    {
        console.log(err);
    }
    else
    {
        obj = JSON.parse(data);

        d = new Date();

        dateString = (d.getMonth()+1) + "/" +
                    d.getDate()  + "/" +
                    d.getFullYear() + " - " +
                    d.getHours() + ":" +
                    d.getMinutes() + ":" +
                    d.getSeconds();

        obj.push({fname: fname_input, lname: lname_input, gender: gender_input, email: email_input, date: dateString});
        
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('db.json', json, err => {if(!err) console.log("Data stored.");}); // write it back 
    }
});


