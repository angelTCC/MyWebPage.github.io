function loadContent(id, file, callback) {
    fetch(file)
      .then((response) => {
        if (!response.ok) throw new Error("Error loading " + file);
        return response.text();
      })
      .then((html) => {
        document.getElementById(id).innerHTML = html;
        // Call the callback function (if provided) after loading the component
        //if (callback) callback();
      })
      .catch((error) => console.error(error));
  }

// Load components
loadContent("about", "components/about.html");
loadContent("header", "components/header.html");
loadContent("skills", "components/skills.html");
loadContent("projects", "components/projects.html");
loadContent("contact", "components/contact.html");
loadContent("footer", "components/footer.html");
loadContent("topics", "components/topics.html");
loadContent("education", "components/education.html");
loadContent("learning", "components/learning.html");

window.onload = function() {
  const hero = document.querySelector('.hero');
  const navbar = document.querySelector('.navbar');
  
  // Obtener la altura de la barra de navegación
  const navbarHeight = navbar.offsetHeight;
  
  // Establecer la altura de .hero al 100vh menos la altura de la navbar
  hero.style.height = `calc(110vh)`;
};


//------------ TOPICS
function openNotion(url) {
  // Replace with the URL you want to open
  window.open(url, "_blank");
}
