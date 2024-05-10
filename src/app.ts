window.addEventListener("DOMContentLoaded", () => {
  const videoContainer = document.getElementById("player");

  fetch("http://localhost:3000/getVideo")
    .then((response) => {
      if (response.ok) {
        console.log(response);
        return response.json();
      } else {
        throw new Error("Failed to get latest video");
      }
    })
    .then((videoData) => {
      videoContainer.innerHTML = `
        <h3>${videoData.snippet.title}</h3>
        <p>${videoData.snippet.description}</p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/${videoData.id.videoId}"
          title="${videoData.snippet.title}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>`;
    });
});
