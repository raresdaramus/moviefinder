import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Grid,
  Header,
  Image,
  Label,
  List,
  Loader,
  Segment,
} from "semantic-ui-react";
import { fetchMovieDetails } from "./query";

export const Movie = () => {
  const { id } = useParams<string>();

  if (!id) {
    return <div>Invalid movie ID</div>;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: () => fetchMovieDetails(id),
  });

  if (isLoading) {
    return <Loader active />;
  }

  if (!data) {
    return <div>No movie details available</div>; // Handle the case where data is not available
  }

  return (
    <div style={{ marginTop: 50 }}>
      <Segment>
        <Header>{data.title}</Header>
        <Grid columns={2} divided textAlign="left" style={{ marginTop: 20 }}>
          <Grid.Row>
            <Grid.Column width={6}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100",
                }}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                  size="medium"
                  centered
                />
              </div>
            </Grid.Column>
            <Grid.Column width={10}>
              <List>
                <List.Item>
                  <List.Header>Release Date: </List.Header>
                  <Label>{data.release_date}</Label>
                </List.Item>
                <List.Item>
                  <List.Header>Duration: </List.Header>
                  <Label>{data.runtime + " min"}</Label>
                </List.Item>
                <List.Item>
                  <List.Header>TMDb Rating: </List.Header>
                  <Label> {data.vote_average}</Label>
                </List.Item>
                <List.Item>
                  <List.Header>Genres: </List.Header>
                  {data.genres.map((genre: any) => (
                    <Label key={genre}> {genre.name} </Label>
                  ))}
                </List.Item>

                <List.Item>
                  <List.Header>Is The Movie For Adults (18+): </List.Header>
                  {data.adult ? "Yes" : "No"}
                </List.Item>
                <List.Item>
                  <List.Header>Budget: </List.Header>
                  {data.budget}
                </List.Item>

                <List.Item>
                  <List.Header>Popularity: </List.Header>
                  {data.popularity}
                </List.Item>
                <List.Item>
                  <List.Header>Production Companies: </List.Header>
                  {data.production_companies
                    .map((company: any) => company.name)
                    .join(", ")}
                </List.Item>

                <List.Item>
                  <List.Header>Revenue: </List.Header>
                  {data.revenue}
                </List.Item>

                <List.Item>
                  <List.Header>Language: </List.Header>
                  {data.original_language}
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};
