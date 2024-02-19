document.addEventListener("DOMContentLoaded", function () {
  const inputTaille = document.getElementById("taille");
  const inputPoids = document.getElementById("poids");
  const inputPompes = document.getElementById("pompes");
  const inputTractions = document.getElementById("tractions");

  let taille;
  let poids;
  let maxPompes;
  let maxTractions;
  let imc;
  let situation;
  let strong;
  let caseSituation = document.querySelector(".situation");
  let caseNumber = document.querySelector(".number");

  function addInputListener(input, variableToUpdate) {
    input.addEventListener("input", function () {
      const inputValue = input.value;
      const inputName = input.id;
      // Mettre à jour la variable correspondante
      variableToUpdate = inputValue;
      // Appeler la fonction de mise à jour des valeurs
      updateValues();
    });
  }

  let calculImc = (taille, poids) => {
    let result = 0;
    let tailleEnM = taille / 100;
    let tailleAuCarre = tailleEnM * tailleEnM;

    result = poids / tailleAuCarre;

    result = result.toFixed(1);

    return result;
  };

  let calculForce = (pompes, tractions, imc) => {
    let strong = parseInt(pompes) + parseInt(tractions) * 6;
    if (imc <= 21) {
      strong *= 0.7;
    }
    if (imc > 21 && imc <= 22) {
      strong *= 0.9;
    }
    if (imc >= 25) {
      strong *= 1.1;
    }
    if (imc >= 28) {
      strong *= 1.2;
    }
    if (imc >= 31) {
      strong *= 1.3;
    }
    if (imc >= 33) {
      strong *= 1.4;
    }
    if (imc >= 38) {
      strong *= 1.5;
    }
    if (imc >= 42) {
      strong *= 1.6;
    }
    return strong;
  };

  function updateValues() {
    taille = inputTaille.value;
    poids = inputPoids.value;
    maxPompes = inputPompes.value;
    maxTractions = inputTractions.value;
    imc = calculImc(taille, poids);
    strong = calculForce(maxPompes, maxTractions, imc);
    console.log(strong);
    if (
      maxPompes &&
      maxTractions &&
      !isNaN(maxPompes) &&
      !isNaN(maxTractions)
    ) {
      if (strong >= 23 && strong <= 55) {
        number = "NORMAL";
        caseNumber.style.backgroundColor = "green";
      } else if (strong < 23) {
        number = "FAIBLE";
        caseNumber.style.backgroundColor = "red";
      } else if (strong > 55 && strong <= 120) {
        number = "BONNE";
        caseNumber.style.backgroundColor = "green";
      } else if (strong > 120 && strong <= 230) {
        number = "PUISSANTE";
        caseNumber.style.backgroundColor = "green";
      } else if (strong > 230) {
        number = "DEMONIAQUE";
        caseNumber.style.backgroundColor = "green";
      }
      document.getElementById("number").innerText = number;
    } else {
      caseNumber.style.backgroundColor = "transparent";
      document.getElementById("number").innerText = "";
    }

    console.log("Taille:", taille);
    console.log("Poids:", poids);
    console.log("Max Pompes:", maxPompes);
    console.log("Max Tractions:", maxTractions);
    if (isNaN(imc)) imc = 0.0;
    document.getElementById("res").innerText = imc;
    if (taille && poids && !isNaN(taille) && !isNaN(poids)) {
      if (imc > 25 && imc <= 30) {
        situation = "SURPOIDS";
        caseSituation.style.backgroundColor = "orange";
      } else if (imc > 18.5 && imc < 25) {
        situation = "NORMAL";
        caseSituation.style.backgroundColor = "green";
      } else if (imc <= 18.5) {
        situation = "MAIGREUR";
        caseSituation.style.backgroundColor = "red";
      } else if (imc >= 30 && imc < 35) {
        situation = "OBESITE MODEREE";
        caseSituation.style.backgroundColor = "orange";
      } else if (imc >= 35 && imc < 40) {
        situation = "OBESITE SEVERE";
        caseSituation.style.backgroundColor = "red";
      } else if (imc >= 40) {
        situation = "OBESITE MORBIDE";
        caseSituation.style.backgroundColor = "red";
      }

      document.getElementById("situation").innerText = situation;
    } else {
      caseSituation.style.backgroundColor = "transparent";
      document.getElementById("situation").innerText = "";
    }
  }

  addInputListener(inputTaille, taille);
  addInputListener(inputPoids, poids);
  addInputListener(inputPompes, maxPompes);
  addInputListener(inputTractions, maxTractions);
});
