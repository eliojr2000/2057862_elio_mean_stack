let http = require("http");
let url = require("url");
let fs = require("fs");

let indexPage = fs.readFileSync("index.html","utf-8");


let server = http.createServer((request,response)=>
{
    let urlInfo = url.parse(request.url,true);

    if(urlInfo.path != "/favicon.ico")
    {
        
        if(urlInfo.pathname == "/addTask")
        {
            let rawdata = fs.readFileSync('tasks.json');
            let tasks = JSON.parse(rawdata);

            let input = urlInfo.query;

            let empId = input.empId;
            let taskId = input.taskId;
            let task = input.task;
            let deadline = input.deadline;

            response.writeHead(200,{"content-type":"text/html"});

            // All entries in the query must have something entered
            if(empId == "" ||
                taskId == "" ||
                task == "" ||
                deadline == "")
            {
                response.write("You must fill out all required fields!");
                response.write(indexPage);
            }
            else // If all entries in the query aren't empty
            {
                // Now we check that the task ID is unique:
                let result = tasks.find(t => t.taskId == taskId);
                if(result != undefined)
                {
                    // The taskId is already on the json file so we reject it
                    response.write("This Task ID already exists! Choose another one or delete the current one.");
                    response.write(indexPage);
                }
                else
                {
                    // We're good to go to add this task
                    tasks.push({"empId":empId, "taskId": taskId, "task": task, "deadline": deadline});
                    rawdata = JSON.stringify(tasks);
                    fs.writeFileSync('tasks.json', rawdata);
                    response.write("Task added successfully!");
                    response.write(indexPage);
                }
            }
        }
        else if(urlInfo.pathname == "/showTasks")
        {
            let rawdata = fs.readFileSync('tasks.json');
            let tasks = JSON.parse(rawdata);

            response.writeHead(200,{"content-type":"text/html"});
            response.write(indexPage);
            let first = 
            `
            <table border=1>
                <tr>
                    <th>
                        Task ID
                    </th>
                    <th>
                        Emp ID
                    </th>
                    <th>
                        Task
                    </th>
                    <th>
                        Deadline
                    </th>
                </tr>
            `;

            let second = "";

            tasks.forEach(n =>
            {
                second += "<tr> <td>" + n.taskId + "</td> <td>" + n.empId + "</td> <td>" + n.task + "</td> <td>" + n.deadline + "</td> </tr>"
            });

            let third = "</table>";

            response.write(first + second + third);
        }
        else if(urlInfo.pathname == "/deleteTask")
        {
            let rawdata = fs.readFileSync('tasks.json');
            let tasks = JSON.parse(rawdata);

            let input = urlInfo.query;
            let taskId = input.taskId;

            response.writeHead(200,{"content-type":"text/html"});

            let result = tasks.find(t => t.taskId == taskId);

            if(result != undefined)
            {
                // Task found, deleting it...
                let index = tasks.indexOf(result);
                tasks.splice(index, 1);
                response.write("Task #" + taskId+ " successfully deleted.");
                response.write(indexPage);
                }
            else
            {
                // Could not find this task
                response.write("Task not found.");
                response.write(indexPage);
            }

            rawdata = JSON.stringify(tasks);
            fs.writeFileSync('tasks.json', rawdata);
        }
        else
        {
            response.write(indexPage);
        }
    }
    response.end();

})

server.listen(9090,()=>console.log("Server running on port number 9090."))