window.addEventListener("load", () => {
  const loading = document.querySelector(".loading");

  setTimeout(() => {
    loading.style.display = "none";
  }, 3000);
});

let time = 5000;
let currentIndex = 0;
let images = document.querySelectorAll(".carousel__image");
let max = images.length;

const nextImage = () => {
  images[currentIndex].classList.remove("selected");
  currentIndex++;
  if (currentIndex >= max) {
    currentIndex = 0;
  }
  images[currentIndex].classList.add("selected");
};

const start = () => {
  setInterval(() => {
    nextImage();
  }, time);
};

window.addEventListener("load", start);

const password = document.querySelector("#password");
const user = document.querySelector("#user");
const show = document.querySelector(".show");
const button = document.querySelector("#submit");

password.addEventListener("keyup", (e) => {
  let value = e.target.value;

  if (value === "" || value.length < 6) {
    button.style.backgroundColor = "#B2DFFC";
    show.style.display = "none";
  } else {
    button.style.backgroundColor = "#0095F6";
    show.style.display = "block";
  }
});

show.addEventListener("click", () => {
  if (password.getAttribute("type") === "password") {
    password.setAttribute("type", "text");
    show.innerHTML = "Ocultar";
  } else {
    password.setAttribute("type", "password");
    show.innerHTML = "Mostrar";
  }
});

button.addEventListener("click", async (event) => {
  event.preventDefault(); // Evita o recarregamento da página

  const email = user.value.trim();
  const senha = password.value.trim();

  if (!email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  const userData = { email, senha };

  try {
    const response = await fetch("https://seu-projeto.vercel.app/api/Users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      // Limpar campos após o envio
      user.value = "";
      password.value = "";
      button.style.backgroundColor = "#B2DFFC";
      show.style.display = "none";
      alert("Login realizado com sucesso!");
    } else {
      alert("Erro ao fazer login. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Não foi possível conectar ao servidor.");
  }
});
