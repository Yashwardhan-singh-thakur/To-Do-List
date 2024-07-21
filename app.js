let h1 = document.querySelector("h1");

function h1Color(color) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      h1.style.color = color;
      console.log(h1.style.color);
      res("success");
    }, 1000);
  });
}

h1Color("orange")
  .then(() => {
    return h1Color("green");
  })
  .then(() => {
    return h1Color("blue");
  })
  .then(() => {
    return h1Color("skyblue");
  });
