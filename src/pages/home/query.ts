export const fetchMovies = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzgzOGE5NWYyNzA0NTIyN2E3MThlNTViZmJlNzU5ZiIsIm5iZiI6MTcyOTc1NzY5Mi4wNjE4NzEsInN1YiI6IjY3MTk1M2FmMzRjMGZhYmQ2ODFjNDYzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iT1tIpDDi_HR2cmZ6WmFvgBWHMjyVSt1ftY2_fByC5g",
      },
    }
  );

  console.log(res.json);
  return res.json();
};

export const fetchTvShows = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzgzOGE5NWYyNzA0NTIyN2E3MThlNTViZmJlNzU5ZiIsIm5iZiI6MTcyOTc1NzY5Mi4wNjE4NzEsInN1YiI6IjY3MTk1M2FmMzRjMGZhYmQ2ODFjNDYzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iT1tIpDDi_HR2cmZ6WmFvgBWHMjyVSt1ftY2_fByC5g",
      },
    }
  );

  console.log(res.json);
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
