const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");

let yesScale = 1;
let noTexts = [
  "Marco",
  "Christian",
  "Lucas",
  "Tina",
  "Bruno",
  "Najeeb",
  "Judith",
  "Eva",
  "Felix"
];

let index = 0;

noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 50);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  noBtn.innerText = noTexts[index % noTexts.length];
  index++;

  yesScale += 0.1;
  yesBtn.style.transform = `scale(${yesScale})`;
});

yesBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <div class="success">
      Knew it 😎 <br>
      <br><br>
      <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTg1N2lxdTljZmZiOTlsbHowY3JjaXQ1OWRrN3hvb2xpbzZ5NXRpOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/W8hVGGjOjV82Rh6Oyi/giphy.gif" width="250"/>
    </div>
  `;
});
