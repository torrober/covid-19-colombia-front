import {getDeptName, capitalize} from './utils.js';
window.onload = () => {
    let params = new URLSearchParams(window.location.search);
    const DIVIPOLA_CODE = params.get('code');
    if(getDeptName(DIVIPOLA_CODE)=="") {
        window.location= "/"
    } else {
        let dept = capitalize(getDeptName(DIVIPOLA_CODE).toLowerCase());
        document.title +=  " - " + dept;
        document.querySelector("#selectedDept").innerText += dept;
        $('#content').show()
        $('.loading').hide()
        showData();
    }
}
const showData = () => {
    covidStats("6,308,087","1,901","6,135,815","141,807");
    covidStatsByYear([18, 28, 47, 57, 77])
    covidBySex([30,20])
    covidByCaseType([6308087,1901,6135815,141807]);
    if(document.querySelector("#townSelect").value==0) {
        covidByTown();
        console.log(document.querySelector("#townSelect").value)
    }
}
const covidByTown= () => {
          
    var options = {
        series: [{
        data: [21, 22, 10, 28, 16, 21, 13, 30]
      }],
        chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [
          ['John', 'Doe'],
          ['Joe', 'Smith'],
          ['Jake', 'Williams'],
          'Amber',
          ['Peter', 'Brown'],
          ['Mary', 'Evans'],
          ['David', 'Wilson'],
          ['Lily', 'Roberts'], 
        ],
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      }
      };

      var chart = new ApexCharts(document.querySelector("#casesByTown"), options);
      chart.render();
}
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
        categories: ['Reportados', 'Activos', 'Recuperados','Fallecidos'],
      }
      };

      var chart = new ApexCharts(document.querySelector("#casesByType"), options);
      chart.render();
}
const covidBySex = (data) => {
          
    var options = {
        series: data,
        chart: {
        type: 'donut',
      },
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
        yaxis: {
          opposite: false,
        }
      })
      myChart.render();
}
const covidStats = (reported, active, recovered, deceased) => {
    document.querySelector("#reported").innerText = reported;
    document.querySelector("#active").innerText = active;
    document.querySelector("#recovered").innerText = recovered;
    document.querySelector("#deceased").innerText = deceased
}