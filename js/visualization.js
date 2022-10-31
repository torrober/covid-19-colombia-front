import { getDeptName, capitalize } from './utils.js';
import CovidAPI from './api/CovidAPI.js';
const covidAPI = new CovidAPI();
window.onload = () => {
  let params = new URLSearchParams(window.location.search);
  const DIVIPOLA_CODE = params.get('code');
  if (getDeptName(DIVIPOLA_CODE) == "") {
    window.location = "/"
  } else {
    covidAPI.getDeptName(DIVIPOLA_CODE).then((data) => {
      if (data.response == "failed") {
        Swal.fire({
          title: 'Error!',
          text: data.error,
          icon: 'error',
          showConfirmButton: false,
          allowOutsideClick: false
        })
      }
      else {
        populateCombobox(data)
        let dept = capitalize(getDeptName(DIVIPOLA_CODE).toLowerCase());
        document.title += " - " + dept;
        document.querySelector("#selectedDept").innerText += dept;
        showData();
      }
    })
  }
}
const populateCombobox = (data) => {
  let dropdown = $('#munSelect');
  for (let i = 0; i < data.content.length; i++) {
    let entry = $('<option>', { value: data.content[i].munID, text: capitalize(data.content[i].munName.toLowerCase()) })
    dropdown.append(entry);
  }
}
const showData = () => {
  let params = new URLSearchParams(window.location.search);
  const DIVIPOLA_CODE = params.get('code');
  console.log(document.querySelector("#munSelect").value)
  if (document.querySelector("#munSelect").value == 0) {
    covidAPI.getInfoMun(DIVIPOLA_CODE,false).then((data) => {
      if (data.response == "failed") {
        Swal.fire({
          title: 'Error!',
          text: data.error,
          icon: 'error',
          showConfirmButton: false,
          allowOutsideClick: false
        })
      }
      else {
        covidStats(data.content[0].recuperados, data.content[0].CasosRegistrados, data.content[0].muertos);
        covidStatsByYear([data.content[0].casos2020, data.content[0].casos2021, data.content[0].casos2022])
        covidBySex([data.content[0].CasosMasculinos/data.content[0].CasosRegistrados, data.content[0].CasosFemeninos/data.content[0].CasosRegistrados])
        covidByCaseType([data.content[0].recuperados, data.content[0].CasosRegistrados, data.content[0].muertos]);
        $('#content').show()
        $('.loading').hide()
      }
    })
    $("#casesTownText").show();
    $('#casesByTown').show();
  } else {
    $('#content').hide()
    $('.loading').show()
    covidAPI.getInfoMun(document.querySelector("#munSelect").value,true).then((data) => {
      if (data.response == "failed") {
        Swal.fire({
          title: 'Error!',
          text: data.error,
          icon: 'error',
          showConfirmButton: false,
          allowOutsideClick: false
        })
      }
      else {
        covidStats(data.content[0].recuperados, data.content[0].CasosRegistrados, data.content[0].muertos);
        covidStatsByYear([data.content[0].casos2020, data.content[0].casos2021, data.content[0].casos2022])
        covidBySex([data.content[0].CasosMasculinos/data.content[0].CasosRegistrados, data.content[0].CasosFemeninos/data.content[0].CasosRegistrados])
        covidByCaseType([data.content[0].recuperados, data.content[0].CasosRegistrados, data.content[0].muertos]);
        $('#content').show()
        $('.loading').hide()
      }
    })
  }
}

document.querySelector("#selectBtn").addEventListener("click", showData)

const covidByCaseType = (data) => {
  var options = {
    series: [{
      data: data
    }],
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Reportados', 'Recuperados', 'Fallecidos'],
    }
  };

  var chart = new ApexCharts(document.querySelector("#casesByType"), options);
  chart.render();
}
const covidBySex = (data) => {
  console.log(data)
  var options = {
    series: data,
    labels: ['Masculino', 'Femenino'],
    chart: {
      type: 'donut',
    },
    fill: { colors: ['#3b71ca', '#E91E63'] },
    colors: ['#3b71ca', '#E91E63'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  var chart = new ApexCharts(document.querySelector("#casesBySex"), options);
  chart.render();
}
const covidStatsByYear = (data) => {
  let myChart = new ApexCharts(document.querySelector("#casesByYear"), {
    chart: {
      type: 'line',
    },
    stroke: {
      curve: 'straight'
    },
    series: [{
      data: data
    }],
    xaxis: {
      categories: ['2020', '2021', '2022'],
    }
  })
  myChart.render();
}
const covidStats = (reported, recovered, deceased) => {
  document.querySelector("#reported").innerText = reported;
  document.querySelector("#recovered").innerText = recovered;
  document.querySelector("#deceased").innerText = deceased
}
