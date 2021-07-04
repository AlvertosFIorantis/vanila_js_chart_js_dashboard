let dummy_data = {
  Ship_1: {
    data: [
      { label: "Feature 1", value: 3 },
      { label: "Feature 2", value: 5 },
      { label: "Feature 3", value: 4 },
      { label: "Feature 4", value: -22 },
      { label: "Feature 5", value: 6 },
      { label: "Final Prediction", value: 4 },
    ],
    info: {
      county: "Greece",
      name: "Evergreen",
      BuildYear: 1989,
      GrossTonnage: 4800,
      CompanyName: "Shipping SA",
      image:
        "https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  },
  Ship_2: {
    data: [
      { label: "Feature 1", value: 13 },
      { label: "Feature 2", value: 15 },
      { label: "Feature 3", value: 14 },
      { label: "Feature 4", value: -2 },
      { label: "Feature 5", value: 16 },
      { label: "Final Prediction", value: 7 },
    ],
    info: {
      county: "UK",
      name: "Titanic",
      BuildYear: 1912,
      GrossTonnage: 3000,
      CompanyName: "Shipping UK",
      image:
        "https://images.pexels.com/photos/68737/cruise-ship-holidays-cruise-vacation-68737.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  },
  Ship_3: {
    data: [
      { label: "Feature 1", value: 23 },
      { label: "Feature 2", value: 25 },
      { label: "Feature 3", value: 42 },
      { label: "Feature 4", value: 3 },
      { label: "Feature 5", value: 6 },
      { label: "Final Prediction", value: 10 },
    ],
    info: {
      county: "USA",
      name: "New York",
      BuildYear: 2000,
      GrossTonnage: 4000,
      CompanyName: "Shipping US",
      image:
        "https://images.pexels.com/photos/2051027/pexels-photo-2051027.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  },
};

let baseData = [];
let baseInfo = {};

// initialize the waterfall graph outside the function
let waterfall = null;
// https://stackoverflow.com/questions/24815851/how-to-clear-a-chart-from-a-canvas-so-that-hover-events-cannot-be-triggered
// scroll down to find the answer

const Create_waterfall_graph = () => {
  const labels = baseData.map((o) => o.label);
  const data = [];
  let total = 0;
  for (let i = 0; i < baseData.length; i++) {
    const vStart = total;
    total += baseData[i].value;
    data.push([vStart, total]);
  }

  // data a a 2 day array with the initial and last value for each label for exmaple the label A will be 0-3 since the value is 3 the label B will be maped to 3-8 etc

  // const backgroundColors = data.map((o, i) => "#9174d8");

  // map the array with the values and if the value is negative i use the "red" collor and if it is possitive i will use the last one
  const backgroundColors = baseData.map((item, index) => {
    console.log(item);
    if (item.label === "Final Prediction") {
      return "#04f27f";
    } else if (item.value > 0) {
      return "#3b27d8";
    } else {
      return "#f20c0f";
    }
  });

  if (waterfall != null) {
    waterfall.destroy();
  }

  // save the new Chart in to a variable so i can reference if and destroy it before creating the new one
  waterfall = new Chart("waterfall", {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColors,
          barPercentage: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const v = data.datasets[0].data[tooltipItem.index];
            return Array.isArray(v) ? v[1] - v[0] : v;
          },
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
};

// Search box
let search = document.querySelector(".search");
let searchIcon = document.querySelector(".search__icon");
let searchInput = document.querySelector(".search__input");
let searchClose = document.querySelector(".search__close");
let searchDelete = document.querySelector(".search__delete");

searchIcon.addEventListener("click", () => {
  search.classList.add("search-open");
  searchInput.focus();
});

searchClose.addEventListener("click", () => {
  search.classList.remove("search-open");
  //clear search field on close
  searchInput.value = "";
});

searchDelete.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
});

// functionality for search
let value_in_data;
searchInput.addEventListener("keyup", function (event) {
  event.preventDefault();

  if (event.keyCode === 13) {
    // code 13 === Enter button on keyboard
    console.log("Search input: ", searchInput.value);
    value_in_data = searchInput.value;
    console.log("How the base data should be now: ", dummy_data.value_in_data);
    // baseData = dummy_data.value_in_data;
    Object.keys(dummy_data).map(function (key, index) {
      if (key === searchInput.value) {
        console.log(dummy_data[key].data);
        baseData = dummy_data[key].data;
        // creating the lookup table for the info
        baseInfo = dummy_data[key].info;
        Create_waterfall_graph();
        getScore();
        sideBarHelperFunction();
      }
    });
  }
});

// End Search box
// Start Score container

const getScore = () => {
  // Animateing dinamically progress bar
  let numb = document.querySelector(".number");

  // Reset the animation
  remove_animation();

  var style = document.createElement("style");
  style.type = "text/css";

  if (baseData[5].value < 5) {
    let = degrees_variable_left = 180 * (baseData[5].value / 5);
    let = degrees_variable_right = 0;
  } else {
    let = degrees_variable_left = 180;
    let = degrees_variable_right = 180 * (baseData[5].value / 10);
  }
  var keyFrames = `\
@-webkit-keyframes left {\
    100% {\
        -webkit-transform: rotate(${degrees_variable_left}deg);\
    }\
}\
@-moz-keyframes left {\
    100% {\
        -webkit-transform: rotate(${degrees_variable_left}deg);\
    }\
}\
@-webkit-keyframes right{\
    100% {\
        -webkit-transform: rotate(${degrees_variable_right}deg);\
    }\
}\
@-moz-keyframes right {\
    100% {\
        -webkit-transform: rotate(${degrees_variable_right}deg);\
    }\
}`;
  style.innerHTML = keyFrames;
  document.getElementsByTagName("head")[0].appendChild(style);

  // Adding again animation
  add_animation();

  if (typeof getScoreInterval !== "undefined") {
    clearInterval(getScoreInterval);
  }

  let counter = 0;
  let interval_time = 0;
  if (baseData[5].value < 5) {
    interval_time = 4000 / (baseData[5].value / 0.1);
  } else {
    interval_time = 8000 / (baseData[5].value / 0.1);
  }

  getScoreInterval = setInterval(() => {
    if (counter.toFixed(2) == baseData[5].value) {
      clearInterval(getScoreInterval);
    } else {
      counter += 0.1;

      numb.textContent = counter.toFixed(2);
    }
  }, interval_time);
};

// // End Score container

// Reset Animations helper function

function remove_animation() {
  // i have to use the offsetWidth
  let left_progress = document.getElementById("left_progress");
  left_progress.classList.remove("left_progress");
  void left_progress.offsetWidth;
  let right_progress = document.getElementById("right_progress");
  right_progress.classList.remove("right_progress");
  void right_progress.offsetWidth;
}

function add_animation() {
  let left_progress = document.getElementById("left_progress");
  left_progress.classList.add("left_progress");
  let right_progress = document.getElementById("right_progress");
  right_progress.classList.add("right_progress");
}

//end of Reset Animations helper function

// Start function for populating content for the side bar
const sideBarHelperFunction = () => {
  let ShipImage = document.getElementById("ShipImage");
  let ShipName = document.getElementById("ShipName");
  let ShipCounty = document.getElementById("ShipCounty");
  let ShipBuildYear = document.getElementById("ShipBuildYear");
  let ShipGrossTonnage = document.getElementById("ShipGrossTonnage");
  let ShipCompanyName = document.getElementById("ShipCompanyName");

  console.log("Base info", baseInfo);
  ShipName.innerHTML = baseInfo.name;
  ShipCounty.innerHTML = baseInfo.county;
  ShipBuildYear.innerHTML = baseInfo.BuildYear;
  ShipGrossTonnage.innerHTML = baseInfo.GrossTonnage;
  ShipCompanyName.innerHTML = baseInfo.CompanyName;
  ShipImage.src = baseInfo.image;
};
// end function for populating content for the side bar

// https://codepen.io/chriscoyier/pen/EyRroJ
// removing animation

// https://www.youtube.com/watch?v=dJr5b_860vQ&t=3s
// progress bar
