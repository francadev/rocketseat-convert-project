// getting the form elements
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const form = document.querySelector("form")
const footer = document.querySelector("main footer")
const descriptionSpan = document.getElementById("description")
const resultH1 = document.getElementById("result")

// currency quotation 
const USD = 4.87
const EUR = 5.32
const GBP = 6.08

//manipulating input to receive only numbers
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, "")
})

// getting the submit form event
form.onsubmit = (event) => {
  event.preventDefault()
  
  switch (currency.value){
    case "USD":
      convertCurrency(amount.value, USD, "US$")
      break
    case "EUR":
      convertCurrency(amount.value, EUR, "€")
      break
    case "GBP":
      convertCurrency(amount.value, GBP, "£")
      break
  }
}

// currency convert function 
function convertCurrency(amount, price, symbol) {
  try {
    // calculates total
    let total = amount * price

    // ensures that the total is a number
    if(isNaN(total)){
      return alert("Por favor digite apenas números para conversão")
    }else{
      // applies the class that displays the footer
      footer.classList.add("show-result")
    }

    //format currency to BRL
    total = formatCurrencyBRL(total).replace("R$", "")

    // change the quote and the conversion result
    descriptionSpan.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`
    resultH1.textContent = `${total} Reais`

  } catch (error) {
    // remove the footer class
    console.log(error)
    footer.classList.remove("show-result")
    alert("Não foi possível converter, tente novamente mais tarde")
  }
}

// function to format currency to BRL
function formatCurrencyBRL(value){
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}