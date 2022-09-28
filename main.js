const employeeForm = document.getElementById('employeeForm')

employeeForm.onsubmit = (e) => {
    e.preventDefault();    
    let employeeFormData = new FormData(employeeForm);
    let employeeObj = toChangeFormDataToEmployeeObj(employeeFormData);
    console.log(employeeObj);
    saveEmployeeObj(employeeObj);
    insertRow(employeeObj);
    employeeForm.reset();
}

function getNewId(){
    let lastId = localStorage.getItem("lastId") || "-1";
    let newId = JSON.parse(lastId) + 1;
    localStorage.setItem("lastId", JSON.stringify(newId));
    return newId;
}

function toChangeFormDataToEmployeeObj(employeeFormData){
    let name = employeeFormData.get('name');
    let fathersLastName = employeeFormData.get('fathersLastName');
    let mothersLastName = employeeFormData.get('mothersLastName');
    let birthdate = employeeFormData.get('birthdate');
    let area = employeeFormData.get('area');
    let idEmployee = getNewId();
    return {
        "name": name,
        "fathersLastName": fathersLastName,
        "mothersLastName": mothersLastName,
        "birthdate": birthdate,
        "area": area,
        "idEmployee": idEmployee
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    let employeeObjArray = JSON.parse(localStorage.getItem("employeeData"));
    employeeObjArray.forEach(employeeData => {
        insertRow(employeeData);
        console.log('Se inserta el elemento');
    })
})

function insertRow(employeeObj){
        //obtener tabla
        let employeeTableRef = document.getElementById('employeeTable');
        let newEmployeeRowRef = employeeTableRef.insertRow(-1);
        newEmployeeRowRef.setAttribute("employee-id", employeeObj["idEmployee"])
        //agregar tabla
        let newEmployeeCellRef = newEmployeeRowRef.insertCell(0);
        newEmployeeCellRef.textContent = employeeObj["name"];
    
        newEmployeeCellRef = newEmployeeRowRef.insertCell(1);
        newEmployeeCellRef.textContent = employeeObj["fathersLastName"];
        
        newEmployeeCellRef = newEmployeeRowRef.insertCell(2);
        newEmployeeCellRef.textContent = employeeObj["mothersLastName"];
    
        newEmployeeCellRef = newEmployeeRowRef.insertCell(3);
        newEmployeeCellRef.textContent = employeeObj["birthdate"];
    
        newEmployeeCellRef = newEmployeeRowRef.insertCell(4);
        newEmployeeCellRef.textContent = employeeObj["area"];

        let deleteButton = document.createElement("button");
        deleteButton.textContent = 'Eliminar';
        newEmployeeCellRef = newEmployeeRowRef.insertCell(5).appendChild(deleteButton);

        deleteButton.addEventListener('click', (e) => {
            let employeeRow = e.target.parentNode.parentNode;
            let employeeId = employeeRow.getAttribute('employee-id');
            employeeRow.remove();
            deleteEmployeeObj(employeeId);

        })
}

function deleteEmployeeObj(idEmployee){
    let employeeObjArray = JSON.parse(localStorage.getItem("employeeData"));
    let employeeIndexArray = employeeObjArray.findIndex( element => element.idEmployee === idEmployee);
    employeeObjArray.splice(employeeIndexArray, 1);
    let employeeArrayJSON = JSON.stringify(employeeObjArray);
    //guardar array de empleados en formato json en el localStorage
    localStorage.setItem("employeeData", employeeArrayJSON)
}

function saveEmployeeObj(employeeObj){
    let employeeArray = JSON.parse(localStorage.getItem("employeeData")) || [];
    employeeArray.push(employeeObj);
    console.log(employeeArray);
    //Convertir array de empleados a json
    let employeeArrayJSON = JSON.stringify(employeeArray);
    //guardar array de empleados en formato json en el localStorage
    localStorage.setItem("employeeData", employeeArrayJSON)
}