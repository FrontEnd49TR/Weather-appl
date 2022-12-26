// import { showErrorMessage } from "../ui/errorMessage.js";
// export class WeatherDataProcessor {

//     #cityGeocodes;

//     constructor() {
//         this.#cityGeocodes = [
//             { city: "Bethlehem, Israel", latitude: 31.705791, longitude: 35.200657 },
//             { city: "Ra'anana, Israel", latitude: 32.184448, longitude: 34.870766 },
//             { city: "Ashdod, Israel", latitude: 31.801447, longitude: 34.643497 },
//             { city: "Nazareth, Israel", latitude: 32.699635, longitude: 35.303547 },
//             { city: "Bat Yam, Israel", latitude: 32.017136, longitude: 34.745441 },
//             { city: "Tel Aviv - Yafo, Israel", latitude: 32.109333, longitude: 34.855499 },
//             { city: "Haifa, Israel", latitude: 32.794044, longitude: 34.989571 },
//             { city: "Karmiel, Israel", latitude: 32.919945, longitude: 35.290146 },
//             { city: "Herzliya, Israel", latitude: 32.166313, longitude: 34.843311 },
//             { city: "Rehovot, Israel", latitude: 31.894756, longitude: 34.809322 }
//         ];
//     }
//     getData(requestObject) {
//         //{city, dateFrom, dateTo, hourFrom, hourTo}
//         const url = this.getUrl(requestObject);
//         console.log("url", url);
//         const promiseResponse = fetch(url);
//         return this.processData(promiseResponse.then(response => response.json()));

//     }
//     getUrl(requestObject) {
//         const baseUrl = "https://api.open-meteo.com/v1/gfs?";
//         const baseParams = "&hourly=temperature_2m&timezone=IST&";
//          const city = this.getCities(requestObject);
//           const date = this.getMinMaxDate(requestObject);

//         return `${baseUrl}latitude=${city.latitude}&longitude=${city.longitude}${baseParams}start_date=${start_date}&end_date=${end_date}`
//     }


//     processData(promiseData) {
//         return promiseData(data => {
//             //TODO
//             // return {city, objects: [{date,hour,temperature},...]}
//         })
//     }
//     getMinMaxDate(requestObject) {
//         // {city, dateFrom, dateTo, hourFrom, hourTo}
//         const currentDate = new Date().slice(10);
//         const inputStartDate = requestObject.dateFrom;
//         const inputEndDate = requestObject.dateTo;
//         console.log("current",currentDate)   
// console.log("From",inputStartDate)
// console.log("From",inputEndDate)
//         // let start_date = "2022-12-18";
//         // let end_date = "2022-12-19";
//         return { minISODate: "...", maxISODate: "..." };
//     }
//     getCities(requestObject) {
//         //{city, dateFrom, dateTo, hourFrom, hourTo}
//         const inputCity = requestObject.city;
//         let latitude = 0;
//         let longitude = 0;
//         for (let i = 0; i < this.#cityGeocodes.length; i++) {
//             if (inputCity == this.#cityGeocodes[i].city) {
//                 latitude = this.#cityGeocodes[i].latitude;
//                 longitude = this.#cityGeocodes[i].longitude;
//             }
//         }
//         return { inputCity, latitude, longitude };
//     }
// }


export class WeatherDataProcessor {
    #cityGeocodes
    constructor() {
        this.#cityGeocodes = [
            { city: "Bethlehem, Israel", latitude: 31.705791, longitude: 35.200657 },
            { city: "Ra'anana, Israel", latitude: 32.184448, longitude: 34.870766 },
            { city: "Ashdod, Israel", latitude: 31.801447, longitude: 34.643497 },
            { city: "Nazareth, Israel", latitude: 32.699635, longitude: 35.303547 },
            { city: "Bat Yam, Israel", latitude: 32.017136, longitude: 34.745441 },
            { city: "Tel Aviv - Yafo, Israel", latitude: 32.109333, longitude: 34.855499 },
            { city: "Haifa, Israel", latitude: 32.794044, longitude: 34.989571 },
            { city: "Karmiel, Israel", latitude: 32.919945, longitude: 35.290146 },
            { city: "Herzliya, Israel", latitude: 32.166313, longitude: 34.843311 },
            { city: "Rehovot, Israel", latitude: 31.894756, longitude: 34.809322 }

        ];
    }
    getData(requestObject) {
        //{city, dateFrom, dateTo, hourFrom, hourTo}
        const url = this.getUrl(requestObject);
        const promiseResponse = fetch(url);
        return this.processData(promiseResponse.then(response => response.json()),
            requestObject);

    }
    getUrl(requestObject) {
        const baseUrl = "https://api.open-meteo.com/v1/gfs?";
        const baseParams = "&hourly=temperature_2m&timezone=IST&";
        // const geocodes = this.#cityGeocodes.find(gc => gc.city == requestObject.city);
        // const latitude = geocodes.latitude;
        // const longitude = geocodes.longitude;
        const city = this.getCities(requestObject);
        const latitude = city.latitude;
        const longitude = city.longitude;
        const date = this.getMinMaxDate(requestObject);
        const startDate = date.dateFrom;
        const endDate = date.dateTo;
        //  const startDate = requestObject.dateFrom;
        //  const endDate = requestObject.dateTo;
        // let startDate = "2022-12-18";
        // let endDate = "2022-12-19";
        const url = `${baseUrl}latitude=${latitude}&longitude=${longitude}${baseParams}start_date=${startDate}&end_date=${endDate}`
        console.log(url)
        return url;
    }
    processData(promiseData, requestObject) {
        return promiseData.then(data => {
            const times = data.hourly.time;
            const temperatures = data.hourly.temperature_2m;

            const timesSelectedDatesHours = times.filter((__, index) => {
                const hour = index % 24;
                return hour >= requestObject.hourFrom && hour <= requestObject.hourTo;
            })

            const temperaturesDatesHours = temperatures.filter((__, index) => {
                const hour = index % 24;
                return hour >= requestObject.hourFrom && index <= requestObject.hourTo;
            })
            const objects = timesSelectedDatesHours.map((dt, index) => {
                const dateTime = dt.split("T");
                const res = { date: dateTime[0], hour: dateTime[1], temperature: temperaturesDatesHours[index] }
                return res
            })


            return { city: requestObject.city, objects }
        })
    }

    getMinMaxDate(requestObject) {
        // {city, dateFrom, dateTo, hourFrom, hourTo}
        const current = new Date();
currentDate = current.split(10);
        const inputStartDate = requestObject.dateFrom;
        const inputEndDate = requestObject.dateTo;
        console.log("current", currentDate)
        console.log("From", inputStartDate)
        console.log("From", inputEndDate)
        // let start_date = "2022-12-18";
        // let end_date = "2022-12-19";
return {currentDate,inputEndDate}
        // return { minISODate: "...", maxISODate: "..." };
    }


    getCities(requestObject) {
        //{city, dateFrom, dateTo, hourFrom, hourTo}
        const inputCity = requestObject.city;
        let latitude = 0;
        let longitude = 0;
        for (let i = 0; i < this.#cityGeocodes.length; i++) {
            if (inputCity == this.#cityGeocodes[i].city) {
                latitude = this.#cityGeocodes[i].latitude;
                longitude = this.#cityGeocodes[i].longitude;
            }
        }
        return { inputCity, latitude, longitude };
    }



}


