// {
//     "game_id": {
//         "id": string,
//         "title": string,
//         "platform": string | string[],
//         "year": number,
//         "series": string | string[],
//         "is_fanwork": boolean,
//         "songs": [
//             {
//                 "id": string,
//                 "title": string,
//                 "types": string[],
//                 "ends"?: number[],
//                 "tags"?: string | string[]
//             }
//         ]
//     }
// }

function GameInfo({ game }) {
    const platform = typeof game.platform == "string" ? [game.platform] : game.platform || [];
    const series = typeof game.series == "string" ? [game.series] : game.series || [];
    return React.createElement("div", { className: "row my-4 mx-md-4 text-center alert alert-dark" }, [
        React.createElement("div", { className: "col-12" }, React.createElement("h3", { className: "text-center" }, game.title)),
        React.createElement("div", { className: "col-md-4 col-6" }, "Platform: " + platform.join(", ")),
        React.createElement("div", { className: "col-md-4 col-6" }, `Year: ${game.year}`),
        React.createElement("div", { className: "col-md-4 col-6" }, "Series: " + series.join(", ")),
        game.is_fanwork && React.createElement("div", { className: "col-md-4 col-6" }, "Fanwork"),
        React.createElement("div", { className: "col-12 mt-4" }, React.createElement("h4", { className: "text-center" }, "Songs")),
        game.songs.map(song => React.createElement(SongInfo, { key: song.id, song }))
    ]);
}

function SongInfo({ song }) {
    const types = typeof song.types == "string" ? [song.types] : song.types || [];
    const tags = typeof song.tags == "string" ? [song.tags] : song.tags || [];
    return React.createElement("div", { className: "row mx-2 alert alert-primary" }, [
        React.createElement("div", { className: "col-md-4 col-12 text-bold" }, song.title),
        React.createElement("div", { className: "col-md-4 col-6" }, "Types: " + types.join(", ")),
        React.createElement("div", { className: "col-md-4 col-6" }, "Tags: " + tags.join(", ")),
    ]);
}

function App({ games }) {
    return React.createElement("div", { className: "container-fluid" }, games.map(game => React.createElement(GameInfo, { key: game.id, game })));
}

fetch("./listing.json").then(r => r.json().then(json => {
    const games = Object.values(json).sort((g1, g2) => g1.id.toString().localeCompare(g2.id.toString()));
    games.forEach(game => game.songs = game.songs.sort((s1, s2) => s1.id.toString().localeCompare(s2.id.toString())));
    ReactDOM.render(React.createElement(App, { games }), document.getElementById("app"))
})).catch(err => {
    console.error(err);
    const alert = document.createElement("div");
    alert.className = "alert alert-danger m-5";
    alert.innerText = "Failed to load music library"
    document.getElementById("loading").replaceChildren(alert);
})