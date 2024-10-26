export const fetchRatedMovies = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${localStorage.getItem(
      "guest_session_id"
    )}/rated/movies?language=en-US&page=1&sort_by=created_at.asc&api_key=${
      import.meta.env.VITE_API_KEY
    }`
  );

  return res.json();
};

export const fetchRatedTvShows = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${localStorage.getItem(
      "guest_session_id"
    )}/rated/tv?language=en-US&page=1&sort_by=created_at.asc&api_key=${
      import.meta.env.VITE_API_KEY
    }`
  );

  return res.json();
};

export const searchMovies = async (query: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query
    )}&include_adult=true&language=en-US&page=1&api_key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  if (!res.ok) {
    throw new Error("Failed to search movies");
  }
  const data = await res.json();
  return data.results || [];
};
