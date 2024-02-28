const getHomeData = (req, res) => {
    setTimeout(() => {
        res.status(200).send({
            "code": 1,
            "status": "Success",
            "message": "Welcome to the home screen",
            "data": [
                {
                    "title": "Latest Movies",
                    "movies": [
                        {
                            "_id": "65bf99ebba59a7c7f40b9e8e",
                            "movie_name": "Oppenheimer"
                        },
                        {
                            "_id": "65bf9ad7ba59a7c7f40b9ee1",
                            "movie_name": "Animal"
                        },
                        {
                            "_id": "65bf9aeeba59a7c7f40b9ef1",
                            "movie_name": "Sam Bahadur"
                        },
                        {
                            "_id": "65bf9a9aba59a7c7f40b9ec8",
                            "movie_name": "Vash"
                        },
                        {
                            "_id": "65bf9b77ba59a7c7f40b9f19",
                            "movie_name": "Ved"
                        }
                    ]
                },
                {
                    "title": "Highest Rated Movies",
                    "movies": [
                        {
                            "_id": "65bf9aceba59a7c7f40b9eda",
                            "movie_name": "12th Fail"
                        },
                        {
                            "_id": "65bf9a8eba59a7c7f40b9ec2",
                            "movie_name": "Raado"
                        },
                        {
                            "_id": "65bf9b5bba59a7c7f40b9f01",
                            "movie_name": "Dashakriya"
                        },
                        {
                            "_id": "65bf99d1ba59a7c7f40b9e7d",
                            "movie_name": "Interstellar"
                        },
                        {
                            "_id": "65bf99ebba59a7c7f40b9e8e",
                            "movie_name": "Oppenheimer"
                        }
                    ]
                },
                {
                    "title": "G.O.A.T",
                    "movies": [
                        {
                            "_id": "65bf9a70ba59a7c7f40b9ea7",
                            "movie_name": "Chabutro"
                        },
                        {
                            "_id": "65bf99fbba59a7c7f40b9e96",
                            "movie_name": "The Irishman"
                        },
                        {
                            "_id": "65bf9a78ba59a7c7f40b9eaf",
                            "movie_name": "Chhello Divas"
                        },
                        {
                            "_id": "65bf9ac6ba59a7c7f40b9ed1",
                            "movie_name": "Go Goa Gone"
                        },
                        {
                            "_id": "65bf9b51ba59a7c7f40b9ef9",
                            "movie_name": "Har Har Mahadev"
                        }
                    ]
                },
                {
                    "title": "The OG's",
                    "movies": [
                        {
                            "_id": "65bf9ae1ba59a7c7f40b9ee9",
                            "movie_name": "Bhediya"
                        },
                        {
                            "_id": "65bf9b6fba59a7c7f40b9f11",
                            "movie_name": "Sairat"
                        },
                        {
                            "_id": "65bf9a86ba59a7c7f40b9eba",
                            "movie_name": "Nadi Dosh"
                        },
                        {
                            "_id": "65bf9b63ba59a7c7f40b9f08",
                            "movie_name": "Mann Kasturi Re"
                        },
                        {
                            "_id": "65bf99e0ba59a7c7f40b9e85",
                            "movie_name": "Johnny English Reborn"
                        }
                    ]
                }
            ]
        });
    }, 5000);
}


module.exports = {getHomeData}