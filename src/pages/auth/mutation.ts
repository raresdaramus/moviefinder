export const mutationLogin = async () => {
    const res = await fetch(
        "https://api.themoviedb.org/3/authentication/guest_session/new",
        {
            headers: {
                Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzgzOGE5NWYyNzA0NTIyN2E3MThlNTViZmJlNzU5ZiIsIm5iZiI6MTcyOTc1NzY5Mi4wNjE4NzEsInN1YiI6IjY3MTk1M2FmMzRjMGZhYmQ2ODFjNDYzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iT1tIpDDi_HR2cmZ6WmFvgBWHMjyVSt1ftY2_fByC5g"
            },
        }
    );

    console.log(res.json);
    return res.json();
}