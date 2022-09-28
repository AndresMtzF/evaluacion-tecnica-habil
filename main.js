const employeeForm = document.getElementById('employeeForm')

employeeForm.onsubmit = (e) => {
    e.preventDefault();    
    let employeeFormData = new FormData(employeeForm);
    let employeeObj = toChangeFormDataToEmployeeObj(employeeFormData);
    console.log(employeeObj);
    saveEmployeeObj(employeeObj);
    insertRow(employeeObj);
}

function toChangeFormDataToEmployeeObj(employeeFormData){
    let name = employeeFormData.get('name');
    let fathersLastName = employeeFormData.get('fathersLastName');
    let mothersLastName = employeeFormData.get('mothersLastName');
    let birthdate = employeeFormData.get('birthdate');
    let area = employeeFormData.get('area');
    return {
        "name": name,
        "fathersLastName": fathersLastName,
        "mothersLastName": mothersLastName,
        "birthdate": birthdate,
        "area": area
    }
}

function insertRow(employeeObj){
        //obtener tabla
        let employeeTableRef = document.getElementById('employeeTable');
        let newEmployeeRowRef = employeeTableRef.insertRow(-1);
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