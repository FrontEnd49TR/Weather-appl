// export class DataForm {
   
//     #weatherForm;
//     #formElement;
//     #dateFromElement;
//     #dateToElement;
//     #hoursFromElement;
//     #hoursToElement;
//     #errorMessageElem;
    
   

//     constructor (params) {  
//         this.#weatherForm = document.getElementById(params.idformElement);
//         this.#formElement = document.querySelectorAll(`#${params.idformElement} [name]`);

//         this.#dateFromElement = document.getElementById(params.iddateFromElement);
//         this.#dateToElement = document.getElementById(params.iddateToElement);
//         this.#hoursFromElement = document.getElementById(params.idhoursFromElement);
//         this.#hoursToElement = document.getElementById(params.idhoursToElement);
//         this.#errorMessageElem = document.getElementById(params. iderrorMessageElem);

//     }
//     addHandler(processFun) {
//         this.#weatherForm.addEventListener("submit", this.handler.bind(this, processFun));
        
//     }
   
// handler(processFun, event ) {
//             event.preventDefault();
//             console.log("submitted");           //  console
//             const data = Array.from(this.#formElement).reduce(
//                 (res, cur) => {
//                     res[cur.name] = cur.value;
//                     return res;
//                 }, {}
//             )
//             console.log(data);              //  console
//             processFun(data);
//         }
        

    
//  }


 import { showErrorMessage } from "./errorMessage.js";
 export class DataForm {
     
     #formElement;
     #dateFromElement;
     #dateToElement;
     #hourFromElement;
     #hourToElement;
     #errorMessageElem;
     #inputElements;
     #dateFrom;
     #dateTo;
     #hourFrom;
     #hourTo
     
     constructor (params) {
        this.#formElement = document.getElementById(params.idForm);
        this.#inputElements = document.querySelectorAll(`#${params.idForm} [name]`);
        this.#dateFromElement = document.getElementById(params.idDateFrom);
        this.#dateToElement = document.getElementById(params.idDateTo);
        this.#hourFromElement = document.getElementById(params.idHourFrom);
        this.#hourToElement = document.getElementById(params.idHourTo);
        this.#errorMessageElem = document.getElementById(params.idErrorMessage);
     //    this.#dateFromElement.min = params.minDate;
        this.onChangeDate();
        this.onChangeHours();
 
     }
     addHandler(processFun) {
         this.#formElement.addEventListener('submit', (event) => {
             event.preventDefault();
             const data = Array.from(this.#inputElements)
             .reduce((res, cur) => {
                 res[cur.name] = cur.value;
                 return res;
             }, {});
             processFun(data);
 
 
         })
     }
     doubleNumber(number) {
       
         console.log(number * 2) ;
     }
     onChangeDate() {
         this.#dateFromElement.addEventListener('change', this.dateHandler.bind(this));
         this.#dateToElement.addEventListener('change', this.dateHandler.bind(this));
     }
     onChangeHours() {
         this.#hourFromElement.addEventListener('change', this.hourHandler.bind(this));
         this.#hourToElement.addEventListener('change', this.hourHandler.bind(this));
     }
     dateHandler(event) {
         if (event.target == this.#dateFromElement) {
             if (this.#dateTo && this.#dateTo < this.#dateFromElement.value) {
                 showErrorMessage(this.#dateFromElement, "date-from must be less or equal date-to"
                 , this.#errorMessageElem);
             } else {
                 this.#dateFrom = this.#dateFromElement.value;
             }
         }  else {
             if (this.#dateFrom && this.#dateFrom > this.#dateToElement.value) {
                 showErrorMessage(this.#dateToElement, "date-to must be greater or equal date-from"
                 , this.#errorMessageElem);
             } else {
                 this.#dateTo = this.#dateToElement.value;
             }
         }
     }
     hourHandler(event) {
         const hour = event.target.value;
         if(hour < 0 || hour > 23) {
             showErrorMessage(event.target, "hour-from must be in range [0-23]"
                 , this.#errorMessageElem);
 
         } else {
             if (event.target == this.#hourFromElement) {
                 if (this.#hourTo && this.#hourTo < hour) {
                     showErrorMessage(this.#hourFromElement, "hour-from must be less or equal hour-to"
                     , this.#errorMessageElem);
                 } else {
                     this.#hourFrom = hour;
                 }
             }  else {
                 if (this.#hourFrom && this.#hourFrom > this.#hourToElement.value) {
                     showErrorMessage(this.#hourToElement, "hour-to must be greater or equal hour-from"
                     , this.#errorMessageElem);
                 } else {
                     this.#hourTo = this.#hourToElement.value;
                 }
             }
         }
         }
         
 }
 




//  *****************************************************************************************************************

//  showSection(index) {
    //         this.#buttonsMenuElement.forEach(e => e.classList.remove(this.#active));
    //         this.#sectionsElement.forEach(e => e.hidden = true)
    //         this.#buttonArray[index].classList.add(this.#active);
    //         this.#sectionArray[index].hidden = false;
    //         if (index == 1) {
    //             this.#Cb1();
    //             // const books = library.getAllBooks();
    //             // listAllBooks.showBooks(books);
    //         }
