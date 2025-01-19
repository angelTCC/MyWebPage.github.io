function loadContent(id, file) {
    fetch(file)
      .then((response) => {
        if (!response.ok) throw new Error("Error loading " + file);
        return response.text();
      })
      .then((html) => {
        document.getElementById(id).innerHTML = html;
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