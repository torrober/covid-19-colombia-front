import deptInfo from './deptInfo.js';
import {capitalize} from './utils.js';
let selDept = ""
let deptIsSel = false

window.onload = () => {
    let map = document.querySelector("#map");
    map.addEventListener("click", buttonPressed)
    renderDropdown()
    document.querySelector("#continueBtn").addEventListener("click",handleSelectedDept)
}
const buttonPressed = e => {
    selDept = e.target.id
    if (parseInt(selDept)) {
        deptIsSel = true
        document.querySelector('#selectDept').value = selDept
    } else {
        deptIsSel = false
        document.querySelector('#selectDept').value = 0
    }
}

const renderDropdown = function () {
    let dropdown = $('#selectDept');
    for (let i = 0; i < deptInfo.length; i++) {
        let entry = $('<option>', { value: deptInfo[i].DeptID, text: capitalize(deptInfo[i].DeptName.toLowerCase()) })
        dropdown.append(entry);
    }
    $('#content').show()
    $('.loading').hide()
};

const handleSelectedDept = () => {
    const DIVIPOLA_CODE = document.querySelector('#selectDept').value
    if(DIVIPOLA_CODE != 0) {
        window.location = "visualization.html?code="+DIVIPOLA_CODE;
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Seleccione un departamento válido.',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
}
