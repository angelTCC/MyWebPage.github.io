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


// ----------ABOUT------------
const navLinks = document.querySelectorAll(".nav-link.about");
const contents = document.querySelectorAll(".about-content-tab");
console.log(contents)

// Add a click event listener to each nav-link
navLinks.forEach((link, index, array) => {

  link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default behavior of the link

      // Remove 'active' class from all nav-links
      navLinks.forEach((item) => item.classList.remove("active"));
      contents.forEach((content) => content.classList.remove("live"))
      //images.forEach((image)=> image.classList.remove("live"))

      // Add 'active' class to the clicked link
      link.classList.add("active");
      contents[index].classList.add("live");
      //images[index].classList.add("live")
  });
});


//------------ TOPICS


