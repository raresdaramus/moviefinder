export const fetchMovieDetails = async (movieId: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzgzOGE5NWYyNzA0NTIyN2E3MThlNTViZmJlNzU5ZiIsIm5iZiI6MTcyOTc1NzY5Mi4wNjE4NzEsInN1YiI6IjY3MTk1M2FmMzRjMGZhYmQ2ODFjNDYzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iT1tIpDDi_HR2cmZ6WmFvgBWHMjyVSt1ftY2_fByC5g",
      },
    }
  );

  return res.json();
};
