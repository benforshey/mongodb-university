var favoriteActors = [
    "Sandra Bullock",
    "Tom Hanks",
    "Julia Roberts",
    "Kevin Spacey",
    "George Clooney",
];

var pipeline = [
    {
        $match: {
            "tomatoes.viewer.rating": { $gte: 3 },
            countries: { $in: ["USA"] },
            // countries: "USA",
            cast: {
                $in: favoriteActors,
            },
        },
    },
    {
        $project: {
            _id: 0,
            title: 1,
            "tomatoes.viewer.rating": 1,
            starPower: {
                $size: {
                    $setIntersection: ["$cast", favoriteActors],
                },
            },
            countries: 1,
        },
    },
    {
        $sort: { starPower: -1, "tomatoes.viewer.rating": -1, title: -1 },
    },
    {
        $skip: 24,
    },
    {
        $limit: 1,
    },
];

// var options = { allowDiskUse: true };

var run = (pipeline) => {
    let aggregations = db.getSiblingDB("aggregations");

    if (!pipeline) {
        print("var pipeline isn't properly set up!");
    } else {
        try {
            print(
                "Answer is",
                JSON.stringify(
                    // aggregations.movies.aggregate(pipeline, options)._batch
                    aggregations.movies.aggregate(pipeline)._batch
                )
            );
        } catch (e) {
            print(e.message);
        }
    }
};
