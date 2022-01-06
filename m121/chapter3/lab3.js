var solution = [];

var pipeline = [
    {
        $match: {
            airplane: /747|380/,
        },
    },
    {
        $lookup: {
            from: "air_alliances",
            localField: "airline.name",
            foreignField: "airlines",
            as: "alliances",
        },
    },
    { $unwind: "$alliances" },
    {
        $group: {
            _id: "$alliances.name",
            count: { $sum: 1 },
        },
    },
    {
        $sort: { count: -1 },
    },
    // {
    //     $limit: 1,
    // },
];

var run = (pipeline) => {
    let aggregations = db.getSiblingDB("aggregations");

    if (!pipeline) {
        print("var pipeline isn't properly set up!");
    } else {
        try {
            print(
                "Answer is",
                JSON.stringify(
                    aggregations.air_routes.aggregate(pipeline)._batch
                )
            );
        } catch (e) {
            print(e.message);
        }
    }
};

/**
 * Air Alliances
 {
	"_id" : ObjectId("5980bef9a39d0ba3c650ae9b"),
	"name" : "Star Alliance",
	"airlines" : [
		"Air Canada",
		"Adria Airways",
		"Avianca",
		"Scandinavian Airlines",
		"All Nippon Airways",
		"Brussels Airlines",
		"Shenzhen Airlines",
		"Air China",
		"Air New Zealand",
		"Asiana Airlines",
		"Copa Airlines",
		"Croatia Airlines",
		"EgyptAir",
		"TAP Portugal",
		"United Airlines",
		"Turkish Airlines",
		"Swiss International Air Lines",
		"Lufthansa",
		"EVA Air",
		"South African Airways",
		"Singapore Airlines"
	]
}
 */

/**
 * Air Routes
 {
	"_id" : ObjectId("56e9b39b732b6122f877fa96"),
	"airline" : {
		"id" : 470,
		"name" : "Air Burkina",
		"alias" : "2J",
		"iata" : "VBW"
	},
	"src_airport" : "OUA",
	"dst_airport" : "LFW",
	"codeshare" : "",
	"stops" : 0,
	"airplane" : "CRJ"
}
 */
