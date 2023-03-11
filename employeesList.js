
var employeesListApp = {
    employeesList: [],
    openEditorModal: function( employeeId) {

        if(employeeId) 
        {
            var employeeObj = employeesListApp.employeesList.find(function(obj) {
                return obj.employeeId == employeeId;
            })
            if(employeeObj) {
                  employeesListApp.fillEmployeeFields(employeeObj);
            }
        }
        else{
             // clear all the  inputs
             $("[employee-input]").val("");
        }

        // remove the validation classes
        $("[employee-input]").removeClass("is-invalid");
        $("[employee-input]").removeClass("is-valid");

        // opens the modal pop up
        $("#employee-editor-modal").modal("show");
    },
    fillEmployeeFields: function(employeeObj) {
        $("#employee-code").val(employeeObj.employeeCode);
        $("#employee-name").val(employeeObj.employeeName);
        $("#employee-department").val(employeeObj.department);
        $("#employee-company").val(employeeObj.company);
        $("#employee-salary").val(employeeObj.salary);
        $("#employee-comments").val(employeeObj.comments);
    },
    saveEmployees: function()  {

        // We will save the employees
        // here we dont have DB interaction so we will save employees inside an array

        // if any one of the input field is empty then we will not save
        if(employeesListApp.validateDetails() === false) {
            return ;
        }

        var employeeObj = new Object();

        employeeObj.employeeCode = $("#employee-code").val();
        employeeObj.employeeName = $("#employee-name").val();
        employeeObj.department = $("#employee-department").val();
        employeeObj.company = $("#employee-company").val();
        employeeObj.salary = $("#employee-salary").val();
        employeeObj.comments = $("#employee-comments").val();


        employeeObj.employeeId = employeesListApp.employeesList.length + 1;

       employeesListApp.employeesList.push(employeeObj);

       $("#employee-editor-modal").modal("hide");

       employeesListApp.addEmployeeRowToTable(employeeObj);

       $("#no-data-alert").hide();

    },
    validateDetails: function() {
       
        var isValid = true;

        $("[employee-input]").removeClass("is-invalid");
        $("[employee-input]").removeClass("is-valid");

        if($("#employee-code").val() == null || $("#employee-code").val() == "") {
            isValid = false;
            $("#employee-code").addClass("is-invalid");
        }
        else{
            $("#employee-code").addClass("is-valid");
        }

        if($("#employee-name").val() == null || $("#employee-name").val() == "") {
            isValid = false;
            $("#employee-name").addClass("is-invalid");
        }else{
            $("#employee-name").addClass("is-valid");
        }

        if($("#employee-department").val() == null || $("#employee-department").val() == "") {
            isValid = false;
            $("#employee-department").addClass("is-invalid");
        }else{
            $("#employee-department").addClass("is-valid");
        }

        if($("#employee-company").val() == null || $("#employee-company").val() == "") {
            isValid = false;
            $("#employee-company").addClass("is-invalid");
        }else{
            $("#employee-company").addClass("is-valid");
        }

        if($("#employee-salary").val() == null || $("#employee-salary").val() == "") {
            isValid = false;
            $("#employee-salary").addClass("is-invalid");
        }else{
            $("#employee-salary").addClass("is-valid");
        }

        if($("#employee-comments").val() == null || $("#employee-comments").val() == "") {
            isValid = false;
            $("#employee-comments").addClass("is-invalid");
        }else{
            $("#employee-comments").addClass("is-valid");
        }
     
        return isValid;

    },
    addEmployeeRowToTable: function(employeeObj) {
        
        var tbody = $("#employee-tbody");

        var tr = `<tr id="employee-${employeeObj.employeeId}">  
                        <td>${employeeObj.employeeCode}</td>
                        <td>${employeeObj.employeeName} </td>
                        <td>${employeeObj.department} </td>
                        <td>${employeeObj.company} </td>
                        <td>${employeeObj.salary} </td>
                        <td>
                            <a class="btn btn-primary" onclick="employeesListApp.viewEmployee('${employeeObj.employeeId}')"> View </a>
                            <a class="btn btn-danger" onclick="employeesListApp.deleteEmployee('${employeeObj.employeeId}')"> Delete </a>
                            <a class="btn btn-info" onclick="employeesListApp.openEditorModal('${employeeObj.employeeId}')"> Edit </a>
                        </td>
                  </tr> `

           tbody.append(tr);       
    },
    viewEmployee: function(employeeId) {
        var employeeObj = employeesListApp.employeesList.find(function(obj) {
            return obj.employeeId == employeeId;
        })

        if(employeeObj)  {
            $("#lbl-employee-code").html(employeeObj.employeeCode);
            $("#lbl-employee-name").html(employeeObj.employeeName);
            $("#lbl-employee-department").html(employeeObj.department);
            $("#lbl-employee-company").html(employeeObj.company);
            $("#lbl-employee-salary").html(employeeObj.salary);
        }

        $("#employee-details-modal").modal('show');
    },

    deleteEmployee: function(employeeId) {
       $("#employee-" + employeeId).remove();

       employeesListApp.employeesList =  employeesListApp.employeesList.filter(function(obj) {
                return obj.employeeId != employeeId;
       });

       if(employeesListApp.employeesList.length == 0) {
          $("#no-data-alert").show();
       }
       
    },
    
}


$(function() {
    $("#btn-add-employees").click(function() {
        employeesListApp.openEditorModal();
    })

    $("#btn-save-employee").click(function() {
        employeesListApp.saveEmployees();
    })
})