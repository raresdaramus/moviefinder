import { useState } from "react";
import { Container, Header, Menu, Search, Segment } from "semantic-ui-react";
import { DisplayType } from "../home";
import { useQuery } from "@tanstack/react-query";
import { fetchRatedMovies, fetchRatedTvShows } from "./query";
import { ColumnDisplay } from "../home/column-display";
import { Navigate } from "react-router-dom";

export const Rated = () => {
  const [activeTabs, setActiveTabs] = useState<string>(DisplayType.Movies);

  const { data: ratedMovies, isLoading: isLoadingRatedMovies } = useQuery({
    queryKey: ["ratedMovies"],
    queryFn: fetchRatedMovies,
  });

  const { data: ratedTvShows, isLoading: isLoadingRatedTvShows } = useQuery({
    queryKey: ["ratedTvShows"],
    queryFn: fetchRatedTvShows,
  });

  if (localStorage.getItem("guest_session_id") === null) {
    return <Navigate to="/auth" />;
  }

  return (
    <Container style={{ marginTop: 50 }}>
      <Menu pointing secondary>
        <Menu.Item
          name="Movies"
          active={activeTabs === DisplayType.Movies}
          onClick={() => {
            setActiveTabs(DisplayType.Movies);
          }}
        />
        <Menu.Item
          name="TvShows"
          active={activeTabs === DisplayType.TvShows}
          onClick={() => {
            setActiveTabs(DisplayType.TvShows);
          }}
        />
      </Menu>

      <Segment>
        {activeTabs === DisplayType.Movies ? (
          <div>
            <Header as={"h2"}>Rated Movies</Header>
            {isLoadingRatedMovies ? (
              <p>Loading...</p>
            ) : (
              <ColumnDisplay
                data={ratedMovies?.results || []} // Use optional chaining and provide a fallback
                displayType={DisplayType.Movies}
                isRated
              />
            )}
          </div>
        ) : (
          <div>
            <Header as={"h2"}>Rated TV Shows</Header>
            {isLoadingRatedTvShows ? (
              <p>Loading...</p>
            ) : (
              <ColumnDisplay
                data={ratedTvShows?.results || []} // Use optional chaining and provide a fallback
                displayType={DisplayType.TvShows}
                isRated
              />
            )}
          </div>
        )}
      </Segment>
    </Container>
  );
};
