document.addEventListener('DOMContentLoaded', function () {
    // Carga los videos para cada sección usando la función fetchVideos.
    fetchVideos("videos-container", "PLAYLIST_ID_ENTREVISTAS"); // Entrevistas
    fetchVideos("tendencias-container", "PLAYLIST_ID_TENDENCIAS"); // Tendencias
    fetchVideos("consejos-container", "PLAYLIST_ID_CONSEJOS"); // Consejos
});

function fetchVideos(containerId, playlistId) {
    fetch(`/api/videos/${playlistId}`, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta para playlist", playlistId, data);
            // Si la respuesta no es un arreglo directo, intenta usar data.items
            let videos = Array.isArray(data) ? data : data.items;
            if (!videos || videos.length === 0) {
                console.error("No se encontraron videos para la playlist:", playlistId);
                return;
            }
            const container = document.getElementById(containerId);
            if (container) {
                const videosToShow = videos.slice(0, 4);
                container.innerHTML = videosToShow.map(video => `
                    <div class="col-md-6 mb-3">
                      <div class="video-box text-center">
                        <div class="video-wrapper">
                          <iframe src="https://www.youtube.com/embed/${video.snippet.resourceId.videoId}"
                                  allowfullscreen
                                  loading="lazy">
                          </iframe>
                        </div>
                        <p>${video.snippet.title || "Sin título"}</p>
                      </div>
                    </div>
                  `).join('');
            } else {
                console.error("No se encontró el contenedor de videos con ID:", containerId);
            }
        })
        .catch(error => console.error("Error loading videos for", containerId, error));
}