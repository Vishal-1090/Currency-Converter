const key = "120795ee7fd9232bff5bf26a";
const url =
  "https://v6.exchangerate-api.com/v6/120795ee7fd9232bff5bf26a/latest/USD";

const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const dropdowns = document.querySelectorAll(".dropdown select");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
function updateFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  const amount = document.querySelector(".amount input");
  const amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const base = fromCurr.value.toUpperCase();
  const target = toCurr.value.toUpperCase();

  const URL = `https://v6.exchangerate-api.com/v6/${key}/latest/${base}`;

  const res = await fetch(URL);
  const data = await res.json();

  const rate = data.conversion_rates[target];

  console.log(`${base} → ${target}:`, rate);
  const finVal = (rate * amtVal).toFixed(2);
  console.log(finVal);
  msg.innerText = `${amtVal}${"\t"}${
    fromCurr.value
  }${"\t"}=${"\t"}${finVal}${"\t"}${toCurr.value}`;
});
