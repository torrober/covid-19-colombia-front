export default class CovidAPI{
    url ="http://localhost/covid-19-colombia-backend/";
    async getDeptName(DIVIPOLA_CODE) {
        const path = `${this.url}getMunicipioNames.php?deptID=${DIVIPOLA_CODE}`;
        const options = {
            headers: {
              Accept: 'application/json'
            }
        };
        const response = await fetch(path,options)
        return response.json();
    }
}