import { useState } from 'react';
import {Button} from 'semantic-ui-react';

enum DisplayType {
    // Movie or TvShow
    Movies = "movies",
    TvShows = "tvshows",
}

export const Home = () => {
    const [displayType, setDisplayType] = useState<DisplayType>(DisplayType.Movies);
    return (

        <div style={{marginTop: 50, height: "auto"}}>
            <Button.Group>
                <Button color={displayType === DisplayType.Movies ? "blue" : undefined} onClick={() => setDisplayType(DisplayType.Movies)}>
                    Movies
                </Button>
            </Button.Group>
        </div>
    )
}