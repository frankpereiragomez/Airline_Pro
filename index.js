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
let currentIds = flights.sort((a, b) => b.id - a.id)[0].id + 1;

const askNameAndGreet = () => {
  let name = null;
  while (!name) {
    name = prompt("Hi, what's your name?");
    name ?? alert("Please, insert name");
  }
  return name;
};

const showFlight = (flight, showId) => {
  return `${showId ? "Id: " + flight.id + ". " : "* "}The flight with origin: ${
    flight.from
  }, and destination: ${flight.to} has a cost of ${flight.cost}€ and ${
    flight.scale ? "make stopover" : "does not make any stopover"
  } `;
};

const showFlights = (filterCb, showId) => {
  let flightsFiltered = [...flights].sort((a, b) => a.id - b.id);
  if (!!filterCb) flightsFiltered = flightsFiltered.filter(filterCb);
  return flightsFiltered.reduce((accumulator, current) => {
    accumulator += `${showFlight(current, showId)} \n`;
    return accumulator;
  }, "");
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
  if (role && (role.toLowerCase() === "admin" || role.toLowerCase() === "user"))
    return role;
  return askRole();
};

const userAction = () => {
  const maxCost = +prompt("Search flights by entering a maximum cost");

  if (!maxCost || isNaN(maxCost)) {
    alert(" Please, insert only a number!");
    userAction();
  }
  const filteredFlightsByCost = showFlights(
    (flight) => flight.cost <= maxCost,
    true
  );

  if (!filteredFlightsByCost) alert("There are no flights for that price!");
  else alert(filteredFlightsByCost);
};

const getPromptData = (msg, checkData) => {
  let data = prompt(msg);
  if (checkData(data)) return data;
  return getPromptData(msg, checkData);
};

const deleteFlightById = (id) => {
  if (!id) return null;
  const flightIndex = flights.findIndex((flight) => {
    return parseInt(flight.id) === parseInt(id);
  });
  if (flightIndex !== -1) return flights.splice(flightIndex, 1)[0];
};

const adminActions = () => {
  const action = getPromptData("Remove or add flights ?", (data) => {
    while (data !== null) {
      return data.toLowerCase() === "remove" || data.toLowerCase() === "add";
    }
  });
  if (action === "remove") {
    const id = getPromptData(
      `Indica el id a eliminar \n
      ${showFlights(null, true)}`,
      (id) => !!id && !isNaN(id)
    );
    const deletedFlight = deleteFlightById(id);

    !!deletedFlight
      ? alert(`Deleted flight:\n ${showFlight(deletedFlight)}`)
      : alert("That id does not exist!");
  } else if (action === "add") {
    if (flights.length < 15) {
      const from = getPromptData(
        "Indicate the origin of the new flight",
        (data) => {
          return !!data && isNaN(data);
        }
      );
      const to = getPromptData(
        "Indicate your new flight destination",
        (data) => {
          return !!data && isNaN(data);
        }
      );
      const cost = getPromptData("Indicate your new flight cost", (data) => {
        return !!data && !isNaN(data);
      });
      const scale = confirm("New flight has scale ?");

      const newFlight = {
        id: currentIds,
        from,
        to,
        cost,
        scale,
      };
      flights.push(newFlight);
      currentIds++;
      alert(`New flight added:\n ${showFlight(newFlight)}`);
    } else {
      alert("You have reached 15 flights !!");
    }
  }
};

const lastUserCuestion = () => {
  let cuestion = prompt("Want to find other flights by cost ? (yes/no)");
  if (
    !cuestion ||
    (cuestion.toLowerCase() !== "yes" && cuestion.toLowerCase() !== "no")
  ) {
    alert("Please, only chose: yes or no.");
    lastUserCuestion();
  } else if (cuestion.toLowerCase() === "yes") {
    userAction();
    lastUserCuestion();
  }
};

const startAirline = () => {
  let userName = askNameAndGreet();
  alert(`Hi ${userName}, these are our flights:\n ${showFlights()} `);
  let mean = flightsMeanCost();
  alert(`****** The average cost of our flights is: ${mean} € ******`);
  const role = askRole();
  if (role === "user") {
    userAction();
  } else {
    let exit = false;
    while (!exit) {
      adminActions();
      exit = confirm("Do you want to exit from admin actions ? ");
    }
  }
  lastUserCuestion();
  const showScale = confirm("Do you want to see flights with stopovers?");
  showScale && alert(showFlights((flight) => flight.scale));
  alert(
    `****** Last five flights of the day: ******\n ${showFlights(
      (_, index, flightsArray) => {
        let indexLimited = flightsArray.length - 5;
        return index >= indexLimited;
      }
    )}`
  );
};
startAirline();
