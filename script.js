let dummy_data = {
  Ship_1: [
    { label: "Feature 1", value: 3 },
    { label: "Feature 2", value: 5 },
    { label: "Feature 3", value: 4 },
    { label: "Feature 4", value: -22 },
    { label: "Feature 5", value: 6 },
    { label: "Final Prediction", value: 4 },
  ],
  Ship_2: [
    { label: "Feature 1", value: 13 },
    { label: "Feature 2", value: 15 },
    { label: "Feature 3", value: 14 },
    { label: "Feature 4", value: -2 },
    { label: "Feature 5", value: 16 },
    { label: "Final Prediction", value: 7 },
  ],
  Ship_3: [
    { label: "Feature 1", value: 23 },
    { label: "Feature 2", value: 25 },
    { label: "Feature 3", value: 42 },
    { label: "Feature 4", value: 3 },
    { label: "Feature 5", value: 6 },
    { label: "Final Prediction", value: 10 },
  ],
};

let baseData = [
  { label: "Feature 1", value: 3 },
  { label: "Feature 2", value: 5 },
  { label: "Feature 3", value: 4 },
  { label: "Feature 4", value: -22 },
  { label: "Feature 5", value: 6 },
  { label: "Final Prediction", value: 4 },
];

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
      return "#9174d8";
    } else if (item.value > 0) {
      return "#aae5e5";
    } else {
      return "#fdd3d6";
    }
  });

  new Chart("waterfall", {
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
        console.log(dummy_data[key]);
        baseData = dummy_data[key];
        Create_waterfall_graph();
        getScore();
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

// https://codepen.io/chriscoyier/pen/EyRroJ
// removing animation

// https://www.youtube.com/watch?v=dJr5b_860vQ&t=3s
// progress bar