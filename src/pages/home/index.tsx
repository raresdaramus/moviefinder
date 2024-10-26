import { useState } from "react";
import { Button, Container, Menu, Search, Segment } from "semantic-ui-react";
import { ColumnDisplay } from "./column-display";
import { fetchMovies, fetchTvShows, searchMovies } from "./query";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

export enum DisplayType {
  Movies = "movies",
  TvShows = "tvshows",
}

export const Home = () => {
  const [displayType, setDisplayType] = useState<DisplayType>(
    DisplayType.Movies
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: movieData, isLoading: isLoadingMovies } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  const { data: tvShowData, isLoading: isLoadingTvShows } = useQuery({
    queryKey: ["tvshows"],
    queryFn: fetchTvShows,
  });

  // This query will only run if searchQuery length is more than 2
  const { data: searchData, isLoading: isLoadingSearch } = useQuery({
    queryKey: ["searchMovies", searchQuery],
    queryFn: () => searchMovies(searchQuery),
    enabled: searchQuery.length > 2, // Enable query only if searchQuery has more than 2 characters
    // NOTE: Add stale time and cache time if necessary for better performance
  });

  if (localStorage.getItem("guest_session_id") === null) {
    return <Navigate to="/auth" />;
  }

  const handleSearchChange = (
    e: React.MouseEvent<HTMLElement>,
    { value }: { value?: string }
  ) => {
    setSearchQuery(value || ""); // Safely set the search query
  };

  return (
    <Container style={{ marginTop: 50 }}>
      <Button.Group>
        <Button
          color={displayType === DisplayType.Movies ? "blue" : undefined}
          onClick={() => setDisplayType(DisplayType.Movies)}
        >
          Movies
        </Button>
        <Button
          color={displayType === DisplayType.TvShows ? "blue" : undefined}
          onClick={() => setDisplayType(DisplayType.TvShows)}
        >
          TV Shows
        </Button>
      </Button.Group>

      <Menu secondary style={{ marginTop: 20 }}>
        <Menu.Item position="right">
          <Search
            placeholder="Search Movies or TV Shows..."
            value={searchQuery}
            onSearchChange={handleSearchChange}
            loading={isLoadingSearch}
            results={searchQuery.length > 2 ? searchData?.results || [] : []}
            onResultSelect={(e, { result }) => {
              console.log("Selected item:", result);
            }}
          />
        </Menu.Item>
      </Menu>

      {isLoadingMovies || isLoadingTvShows || isLoadingSearch ? (
        <div>Loading...</div>
      ) : (
        <Segment style={{ marginTop: 20 }}>
          {displayType === DisplayType.Movies ? (
            <ColumnDisplay
              data={
                searchQuery.length > 2
                  ? searchData?.results
                  : movieData?.results
              }
              displayType={DisplayType.Movies}
            />
          ) : (
            <ColumnDisplay
              data={tvShowData?.results}
              displayType={DisplayType.TvShows}
            />
          )}
        </Segment>
      )}
    </Container>
  );
};
