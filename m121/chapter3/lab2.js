var solution = [
    {
        $match: {
            languages: "English",
        },
    },
    {
        $project: { _id: 0, cast: 1, "imdb.rating": 1 },
    },
    {
        $unwind: "$cast",
    },
    {
        $group: {
            _id: "$cast",
            numFilms: { $sum: 1 },
            average: { $avg: "$imdb.rating" },
        },
    },
    {
        $project: {
            numFilms: 1,
            average: {
                $divide: [{ $trunc: { $multiply: ["$average", 10] } }, 10],
            },
        },
    },
    {
        $sort: { numFilms: -1 },
    },
    {
        $limit: 1,
    },
];

var pipeline = [
    {
        $match: {
            "imdb.rating": { $gte: 0 },
            languages: { $in: ["English"] },
        },
    },
    {
        $unwind: "$cast",
    },
    {
        $group: {
            _id: "$cast",
            average_rating: { $avg: "$imdb.rating" },
            num_films: { $sum: 1 },
        },
    },
    {
        $sort: {
            num_films: -1,
        },
    },
    {
        $limit: 1,
    },
];

var run = (pipeline) => {
    let aggregations = db.getSiblingDB("aggregations");

    if (!pipeline) {
        print("var pipeline isn't properly set up!");
    } else {
        try {
            print(
                "Answer is",
                JSON.stringify(aggregations.movies.aggregate(pipeline)._batch)
            );
        } catch (e) {
            print(e.message);
        }
    }
};
