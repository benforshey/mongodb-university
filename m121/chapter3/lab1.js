var solution = [
    {
        $match: {
            awards: /Won \d{1,2} Oscars?/,
        },
    },
    {
        $group: {
            _id: null,
            highest_rating: { $max: "$imdb.rating" },
            lowest_rating: { $min: "$imdb.rating" },
            average_rating: { $avg: "$imdb.rating" },
            deviation: { $stdDevSamp: "$imdb.rating" },
        },
    },
];

var pipeline = [
    {
        $match: {
            "imdb.rating": { $gte: 0 },
            awards: { $regex: /^won \w oscar/i },
        },
    },
    {
        $group: {
            _id: null,
            highest_rating: { $max: "$imdb.rating" },
            lowest_rating: { $min: "$imdb.rating" },
            deviation: { $stdDevSamp: "$imdb.rating" },
        },
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
