import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Accordion,
  Card,
  Grid,
  Header,
  Image,
  Label,
  List,
  Loader,
  Segment,
} from "semantic-ui-react";

import { fetchTvShowDetails } from "./query";

export const TvShow = () => {
  const { id } = useParams<string>();

  if (!id) {
    return <div>Invalid Tv Show ID</div>;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: () => fetchTvShowDetails(id),
  });

  if (isLoading) {
    return <Loader active />;
  }

  if (!data) {
    return <div>No Tv Show details available</div>; // Handle the case where data is not available
  }

  // const seasonsPanels = data.seasons.map((season: any) => ({
  //   key: season.id,
  //   title: `Season ${season.season_number}`,
  //   content: {
  //     content: (
  //       <Card
  //         style={{ height: "70" }}
  //         meta={season.air_date}
  //         descirption={`${season.episode_count} episodes`}
  //       />
  //     ),
  //   },
  // }));

  return (
    <div style={{ marginTop: 50 }}>
      <Segment>
        <Header>{data.name}</Header>
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
                  <List.Header>Is The Movie For Adults (18+): </List.Header>
                  {data.adult ? "Yes" : "No"}
                </List.Item>
                <List.Item>
                  <List.Header>Genres: </List.Header>
                  {data.genres.map((genre: any) => (
                    <List.Item key={genre}> {genre.name} </List.Item>
                  ))}
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
                  <List.Header>You can watch it on: </List.Header>
                  {data.networks.map((network: any) => (
                    <Image
                      key={network.id}
                      src={`https://image.tmdb.org/t/p/original/${network.logo_path}`}
                      size="small"
                      style={{ marginRight: 10 }}
                    />
                  ))}
                </List.Item>
                <List.Item>
                  <List.Header>Number of Seasons: </List.Header>
                  {data.number_of_seasons}
                </List.Item>
                <List.Item>
                  <List.Header>Episodes per season </List.Header>
                  {data.number_of_episodes / data.number_of_seasons}
                </List.Item>
                {/* <List.Item>
                  <List.Header>Seasons: </List.Header>
                  <List.Description
                    style={{ height: "200px", overflowY: "scroll" }}
                  >
                    <Accordion
                      defaultActiveIndex={0}
                      panels={seasonsPanels}
                      styled
                    />
                  </List.Description>
                </List.Item> */}
                <List.Item>
                  <List.Header>Episode Duration: </List.Header>
                  {data.episode_run_time.join(", ") + " min"}
                </List.Item>
                <List.Item>
                  <List.Header>TMDb Rating: </List.Header>
                  {data.vote_average}
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
