//Pasos a seguir
/*
  Se le preguntará al usuario su nombre y se le dará la bienvenida, guardaremos el nombre
    - Si el nombre está vacío, mostramos un alert exigiendole uno
  Le muestro todos los vuelos al usuario ejem: El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
  El usuario verá el coste medio de los vuelos
  Preguntar al usuario si desea ver los vuelos con escala
    -> Si: Mostrar vuelos con escalas
        -> Vamos al siguiente paso
    -> No: Vamos al siguiente paso 
  Y, sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.
                
 */

const flights = [
  { id: 00, to: "New York", from: "Barcelona", cost: 700, scale: false },
  { id: 01, to: "Los Angeles", from: "Madrid", cost: 1100, scale: true },
  { id: 02, to: "Paris", from: "Barcelona", cost: 210, scale: false },
  { id: 03, to: "Roma", from: "Barcelona", cost: 150, scale: false },
  { id: 04, to: "London", from: "Madrid", cost: 200, scale: false },
  { id: 05, to: "Madrid", from: "Barcelona", cost: 90, scale: false },
  { id: 06, to: "Tokyo", from: "Madrid", cost: 1500, scale: true },
  { id: 07, to: "Shangai", from: "Barcelona", cost: 800, scale: true },
  { id: 08, to: "Sydney", from: "Barcelona", cost: 150, scale: true },
  { id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150, scale: false },
];

const askNameAndGreet = () => {
  let name = null;
  while (!name) {
    name = prompt("Hi, what's your name?");
    name ?? alert("Please, insert name"); // expresión truthy que ejecuta la segunda parte del ?? solo si la primera no se cumple. (Es como un ternario pero sin el else)
  }
  console.log(`Hi ${name} !`);
  return name;
};

const showFlights = (filterCb) => {
  let flightsFiltered = [...flights].sort((a, b) => a.id - b.id); // Ordenar los flights por id
  if (!!filterCb) flightsFiltered = flightsFiltered.filter(filterCb);
  flightsFiltered.forEach((flight) => {
    console.log(
      `The flight with origin: ${flight.from}, and destination: ${
        flight.to
      } has a cost of ${flight.cost}€ y ${
        flight.scale ? "make stopover" : "does not make any stopover"
      } `
    );
  });
};

const flightsMeanCost = () => {
  const totalCost = flights.reduce((accumulator, current) => {
    accumulator += current.cost;
    return accumulator;
  }, 0);
  return totalCost / flights.length;
};

const init = () => {
  let name = askNameAndGreet();
  console.log("****** Our flights ****** : ");
  showFlights();
  console.log("*************************");
  let mean = flightsMeanCost();
  console.log(`****** The average cost of our flights is: ${mean} € ******`);
  console.log("*************************");
  const showScale = confirm("Do you want to see flights with stopovers?");
  showScale && showFlights((flight) => flight.scale);
  console.log("****** Last five flights of the day: ******");
  showFlights((_, index, flightsArray) => {
    let indexLimited = flightsArray.length - 5;
    return index >= indexLimited;
  });
};
init();
