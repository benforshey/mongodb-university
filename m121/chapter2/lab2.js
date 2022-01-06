var solution = [
    {
        $match: {
            year: { $gte: 1990 },
            languages: { $in: ["English"] },
            "imdb.votes": { $gte: 1 },
            "imdb.rating": { $gte: 1 },
        },
    },
    {
        $project: {
            _id: 0,
            title: 1,
            "imdb.rating": 1,
            "imdb.votes": 1,
            normalized_rating: {
                $avg: [
                    "$imdb.rating",
                    {
                        $add: [
                            1,
                            {
                                $multiply: [
                                    9,
                                    {
                                        $divide: [
                                            { $subtract: ["$imdb.votes", 5] },
                                            { $subtract: [1521105, 5] },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        },
    },
    { $sort: { normalized_rating: 1 } },
    { $limit: 1 },
];

var pipeline = [
    {
        $match: {
            year: { $gte: 1990 },
            "imdb.rating": { $gte: 1 },
            "imdb.votes": { $gte: 1 },
            languages: "English",
        },
    },
    {
        $addFields: {
            "imdb.normalizedRating": {
                $avg: [
                    {
                        $add: [
                            1,
                            {
                                $multiply: [
                                    9,
                                    {
                                        $divide: [
                                            { $subtract: ["$imdb.votes", 5] },
                                            { $subtract: [1521105, 5] },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    "$imdb.rating",
                ],
            },
        },
    },
    {
        $project: {
            _id: 0,
            imdb: 1,
            title: 1,
        },
    },
    {
        $sort: { "imdb.normalizedRating": 1 },
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
