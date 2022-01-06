var pipeline = [
    {
        $match: {
            "imdb.rating": { $gte: 7 },
            genres: { $nin: ["Crime", "Horror"] },
            $or: [{ rated: { $eq: "G" } }, { rated: { $eq: "PG" } }],
            languages: { $all: ["English", "Japanese"] },
        },
    },
];

var validateLab1 = (pipeline) => {
    let aggregations = db.getSiblingDB("aggregations");
    if (!pipeline) {
        print("var pipeline isn't properly set up!");
    } else {
        try {
            var result = aggregations.movies
                .aggregate(pipeline)
                .toArray().length;
            let sentinel = result;
            let data = 0;
            while (result != 1) {
                data++;
                result = result % 2 === 0 ? result / 2 : result * 3 + 1;
            }
            if (sentinel === 23) {
                print("Answer is", data);
            } else {
                print("You aren't returning the correct number of documents");
            }
        } catch (e) {
            print(e.message);
        }
    }
};

/**

{
	"_id" : ObjectId("573a1390f29313caabcd4cf1"),
	"title" : "Ingeborg Holm",
	"year" : 1913,
	"runtime" : 96,
	"released" : ISODate("1913-10-27T00:00:00Z"),
	"cast" : [
		"Hilda Borgstr�m",
		"Aron Lindgren",
		"Erik Lindholm",
		"Georg Gr�nroos"
	],
	"poster" : "http://ia.media-imdb.com/images/M/MV5BMTI5MjYzMTY3Ml5BMl5BanBnXkFtZTcwMzY1NDE2Mw@@._V1_SX300.jpg",
	"plot" : "Ingeborg Holm's husband opens up a grocery store and life is on the sunny side for them and their three children. But her husband becomes sick and dies. Ingeborg tries to keep the store, ...",
	"fullplot" : "Ingeborg Holm's husband opens up a grocery store and life is on the sunny side for them and their three children. But her husband becomes sick and dies. Ingeborg tries to keep the store, but because of the lazy, wasteful staff she eventually has to close it. With no money left, she has to move to the poor-house and she is separated from her children. Her children are taken care of by foster-parents, but Ingeborg simply has to get out of the poor-house to see them again...",
	"lastupdated" : "2015-08-25 00:11:47.743000000",
	"type" : "movie",
	"directors" : [
		"Victor Sj�str�m"
	],
	"writers" : [
		"Nils Krok (play)",
		"Victor Sj�str�m"
	],
	"imdb" : {
		"rating" : 7,
		"votes" : 493,
		"id" : 3014
	},
	"countries" : [
		"Sweden"
	],
	"genres" : [
		"Drama"
	]
}

 */
