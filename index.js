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

/*
  Después de ver toda la información, el programa preguntará al usuario si es ADMIN/USER.
  - Si introduce algo diferente a ADMIN/USER o no introduce nada, mostramos un alert pidiéndole que se identifique como uno de los dos.
    -> USER: El usuario podrá buscar por precio, le mostramos los vuelos que tengan ese precio o más barato.
        - Si introduce algo que no sean números o deja el campo vacio, le mostramos un alert pidiéndole que solo introduzca números.
    -> Le preguntamos si desea hacer otra busqueda por precios
        -> Si: Repetir paso anterior(buscar vuelos por precio)
        -> No: Pasar al sguiente paso(mostrar los últimos cinco vuelos del día)
    -> ADMIN: El usuario puede crear/eliminar(por id) más vuelos, pidiendo la información por prompt().
        -> Crear:  
            - Si el usuario no introduce datos o introduce datos incorrectos se le pedirá con un alert() que solo introduzca los datos pertinentes
      -> Preguntar al usuario si desea crear otro vuelo
            Si: Repetir el paso anterior.
                - No podrá pasar de 15 vuelos, si se intenta introducir uno más, saltará un alert().
            No: Pasar al siguiente paso(mostrar los últimos cinco vuelos del día)
 -> Cerrar programa(Despedir al usuario).                  

            
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

const askRole = () => {
  let role = prompt("Are you an user or administrator? (admin/user)");
  if (
    !role ||
    (role.toLowerCase() !== "admin" && role.toLowerCase() !== "user")
  ) {
    askRole();
  } else if (role.toLowerCase() === "admin") {
    return adminActions();
  } else if (role.toLowerCase() === "user") {
    return userAction();
  }
};

const userAction = () => {
  const maxCost = +prompt("Enter your maximum cost");
  if (!maxCost || isNaN(maxCost)) {
    alert(" Please, insert only a number!");
    userAction();
  } else {
    console.log(`The flights with a maximum cost of ${maxCost} are: `);
    flights.forEach((flight) => {
      if (flight.cost <= maxCost) {
        console.log(
          `The flight with origin: ${flight.from}, and destination: ${
            flight.to
          } has a cost of ${flight.cost} and ${
            flight.scale ? "make stopover" : "does not make any stopover."
          }`
        );
      }
    });
  }
};

const createFlightsById = () => {
  let askId = +prompt("Introduce new id");
  if (!askId || isNaN(askId)) {
    alert("Please, introduce only a number id !");
    createFlightsById();
  } else {
    return askId;
  }
};

const createFlights = () => {};

const lastUserCuestion = () => {
  let cuestion = prompt("Want to find other flights by cost ? (yes/no)");
  if (
    !cuestion ||
    (cuestion.toLowerCase() !== "yes" && cuestion.toLowerCase() !== "no")
  ) {
    alert("Please, only chose: yes or no.");
    lastUserCuestion();
  } else if (cuestion.toLowerCase() === "yes") {
    return userAction();
  }
};

const init = () => {
  let name = askNameAndGreet();
  console.log("****** Our flights ****** : ");
  showFlights();
  console.log("*************************");
  let mean = flightsMeanCost();
  console.log(`****** The average cost of our flights is: ${mean} € ******`);
  askRole();
  lastUserCuestion();
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
