const base_url="https://api.currencyapi.com/v3/latest?apikey=cur_live_cYsGpz0JqLV9v37qoeYfbGpsLhKxwfvhwgsPyrKz";
const url="https://api.exchangerate-api.com/v4/latest";
// const base_url="https://api.currencyapi.com/v3/latest"

let btn=document.querySelector("form button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");

// for(code in countryList){
//     console.log(code,countryList[code]);
// }

const dropdowns=document.querySelectorAll(".dropdown select");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption); 
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
function updateFlag(element){
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    // console.log(fromCurr.value,toCurr.value);
    const URL=`${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    console.log(response);
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    console.log(rate);
    let finalrate=rate*amtVal;
    msg.innerText=`${amount}${fromCurr.value}=${finalrate}${toCurr.value}`;

});