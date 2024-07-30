import React, {useEffect} from 'react';

const Spotify = () => {
    useEffect(() => {
        window.onSpotifyIframeApiReady = (IFrameAPI) => {
            const element = document.getElementById('embed-iframe');
            const options = {
                height: '250',
                width: '270',
                uri: 'spotify:episode:4GWzBIwldTzCNoUduU69eU'
            };
            const callback = (EmbedController) => {
            };
            IFrameAPI.createController(element, options, callback);
        };
    }, []);

    return (
        <div id="embed-iframe" className="block mt-40" style={{
            marginTop: 150
        }}></div>
    );
};

export default Spotify;