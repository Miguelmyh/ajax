console.log("Let's get this party started!");
const form = document.querySelector("#intro-form");
const results = document.querySelector(".results");
const btn = document.querySelector(".remove-btn");

async function getGiph(value) {
  const key = {
    params: {
      api_key: "rblVChGC0qVZ0OAwD7vMsgdppxmKFF8b",
      q: value,
    },
  };

  const giph = await axios.get(`http://api.giphy.com/v1/gifs/search`, key);
  console.log(giph.data.data[0].images.original.url);
  return giph.data.data;
}

async function searchValues(e) {
  e.preventDefault();
  const text = document.querySelector(".text");
  let textInput = text.value;
  if (textInput === "") return;
  console.log(textInput);
  const values = await getGiph(textInput);
  console.log(values);
  createGiphs(values);
}

async function createGiphs(arr) {
  if (!arr.length) return;
  let idx = Math.floor(Math.random() * arr.length - 1);
  let src = arr[idx].images.original.url;
  addElements(src);
}

function addElements(url) {
  let img = document.createElement("img");
  img.src = url;
  results.append(img);
}

function removeGiph() {
  form.reset();
  results.innerHTML = "";
}

form.addEventListener("submit", searchValues);
btn.addEventListener("click", removeGiph);
