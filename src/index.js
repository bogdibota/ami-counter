import moment from "moment";
import "./styles.css";

const targetTime = moment("2019-03-05 20:15:00");

const createStar = (x, y) => {
  const newStar = document.createElement("div");
  newStar.className = "star";
  newStar.style.left = `${x}vw`;
  newStar.style.top = `${y}vh`;
  document.getElementById("bg").appendChild(newStar);
  return newStar;
};

const createFallingStar = (x1, y1, x2, y2) => {
  const newFallingStar = document.createElement("div");
  if (x1 > x2) {
    let aux = x2;
    x2 = x1;
    x1 = aux;
    newFallingStar.classList.add("rtl");
  }
  newFallingStar.classList.add("falling-star");
  newFallingStar.style.left = `${x1}vw`;
  newFallingStar.style.top = `${y1}vh`;
  newFallingStar.style.width = `${x2 - x1}vw`;
  newFallingStar.style.height = `${y2 - y1}vh`;
  const star = document.createElement("div");
  star.className = "star";
  newFallingStar.appendChild(star);
  document.getElementById("bg").appendChild(newFallingStar);
  return newFallingStar;
};

const handleStars = () => {
  const rand = ~~(Math.random() * 100);
  const toDelete = [];
  if (rand % 3 === 0) {
    toDelete.push(createStar(~~(Math.random() * 100), ~~(Math.random() * 50)));
  }
  if (rand % 5 === 0) {
    toDelete.push(
      createFallingStar(
        ~~(Math.random() * 100),
        ~~(Math.random() * 30),
        ~~(Math.random() * 100),
        ~~(Math.random() * 30) + 30
      )
    );
  }

  setTimeout(() => toDelete.forEach(it => it.remove()), 3000);
};

const updateTime = () => {
  const now = moment();
  let difference = moment.duration(targetTime.diff(now));

  const counter = document.getElementById("counter");
  if (difference.asMilliseconds() > 0) {
    counter.innerText = `${difference.get("d")}d ${difference.get(
      "h"
    )}h ${difference.get("m")}m ${difference.get("s")}s`;
  } else {
    counter.innerText = "🎉 NOW 🎉";
    counter.style.opacity = 1;
    counter.className = "party";
  }
  handleStars();
};

setInterval(updateTime, 1000);
