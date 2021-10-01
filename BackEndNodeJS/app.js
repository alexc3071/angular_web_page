// Imports
const http = require("http");
const axios = require("axios");
const express = require("express");
app = express();

// Constants
const api_key = "b06218c7e0a81ff7d537e353505750fe";
const back_prefix = "https://image.tmdb.org/t/p/original";
const post_prefix = "https://image.tmdb.org/t/p/w500";
const month_names = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Helper functions for producing the carousel data
function processPlayingMovies(response){
    let results = response.results;
    let pm_data = {"data": []};

    var i = 0;
    while(pm_data.data.length < 5){
        if(results[i].backdrop_path !== null && results[i].backdrop_path !== undefined){
            let m_item = {"media_type": "movie", "id" : results[i].id};
            m_item.backdrop_path = back_prefix + results[i].backdrop_path;
            if(results[i].title !== null && results[i].title !== undefined){
                m_item.title = results[i].title;
            }
            pm_data.data.push(m_item);
        }
        i ++;
    }
    return pm_data;
}

function currentPlayingMovies(){
    var tmdb_url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`;
    try{
        const promise = axios.get(tmdb_url);
        const pm_data = promise.then(response => processPlayingMovies(response.data));
        return pm_data;
    } catch(error) {
        console.error(error);
    }
}

function processSmallCarousel(response, media_type){
    let results = response.results;
    let sc_data = {"data": []};

    for(var i = 0; i < results.length; i++){
        if(results[i].poster_path !== null && results[i].poster_path !== undefined){
            let m_item = {"media_type": media_type, "id" : results[i].id};
            m_item.poster_path = post_prefix + results[i].poster_path;

            field_name = "title";
            if(media_type === "tv"){
                field_name = "name";
            }
            if(results[i][field_name] !== null && results[i][field_name] !== undefined){
                m_item.title = results[i][field_name];
            }
            
            sc_data.data.push(m_item);
        } 
    }
    return sc_data;
}

function smallCarouselData(tmdb_url, media_type){
    try{
        const promise = axios.get(tmdb_url);
        const pm_data = promise.then(response => processSmallCarousel(response.data, media_type));
        return pm_data;
    } catch(error) {
        console.error(error);
    }
}

// Helper functions for getting details of searched movie/tv show
function processItemDetails(response, media_type){
    let m_item = {};
    m_item['id'] = response.id;
    m_item['media_type'] = media_type;
    field_name = 'title';
    if(media_type == 'tv'){
	field_name = "name";
    }
    if(response[field_name] !== undefined && response[field_name] !== null ){
        m_item['title'] = response[field_name];
    }
    if(response.genres !== undefined && response.genres.length > 0){
        let genre_list = [];
        for(var i = 0; i < response.genres.length ; i++){
            genre_list.push(response.genres[i].name);
        }
        m_item['genres'] = genre_list.join(", ");
    }
    if(response.spoken_languages !== undefined && response.spoken_languages.length > 0){
        let lang_list = [];
        for(var i = 0; i < response.spoken_languages.length ; i++){
            lang_list.push(response.spoken_languages[i].english_name);
        }
        m_item['spoken_languages'] = lang_list.join(",");
    }
    let raw_release_date = response.release_date;
    if(media_type == "tv"){
        raw_release_date = response.first_air_date;
    }
    if(raw_release_date !== undefined && raw_release_date !== null){
        const split_date = raw_release_date.split("-");
        m_item['year'] = split_date[0];
        m_item['release_date'] = raw_release_date;
    }
    let raw_runtime = response.runtime;
    if(media_type == "tv"){
        raw_runtime = response.episode_run_time[0];
    }
    if(raw_runtime !== undefined && raw_runtime !== null){
        const hours = Math.floor(Number(raw_runtime) /60);
        const minutes = Number(raw_runtime) % 60;
	if(hours === 0 || hours === 0.0){
	    
            const runtime = minutes + "mins";
            m_item['runtime'] = runtime;
	}
	else{
            const runtime = hours + "hrs" + ' ' + minutes + "mins";
            m_item['runtime'] = runtime;
	}
    }
    if(response.overview !== undefined && response.overview !== null){
        m_item['overview'] = response.overview;
    }

    if(response.vote_average !== undefined && response.vote_average !== null){
        if (Number(response.vote_average) === 0.0){
            m_item['vote_average'] = "0";
        }
        else{
            m_item['vote_average'] = String(response.vote_average);
        }
    }

    if(response.tagline !== undefined && response.tagline !== null){
        m_item['tagline'] = response.tagline;
    }

    if(response.poster_path !== null && response.poster_path !== undefined){
        m_item['poster_path'] = post_prefix + response.poster_path;
    }
    else{
	m_item['poster_path'] = "https://cinemaone.net/images/movie_placeholder.png";
    }
    
    return m_item;
}

function processVideos(response, media_type){
    results = response.results;
    video_data = {}
    selected_item = null;
    if(results.length > 0){
        var i = 0;
        while(selected_item === null && i < results.length){
            if (results[i].site === "YouTube" && results[i].type === "Trailer"){
                selected_item = results[i]; 
            }
            i++;
        }
        i = 0;
        while(selected_item === null && i < results.length){
            if (results[i].site === "YouTube" && results[i].type === "Teaser"){
                selected_item = results[i]; 
            }
            i++;
        }
        if(selected_item !== null){
            if (selected_item.name !== undefined && selected_item.name !== null){
                video_data['video_name'] = selected_item.name;
            }
            video_data['video_key'] = selected_item.key;
        }
    }
    if(selected_item === null){
        video_data['video_name'] = "CSCI571: Web Technologies - HW8 Fall 2020 - Desktop Version";
        video_data['video_key'] = "tzkWB85ULJY";
    }

    return video_data;
}

function searchDetails(media_type, id){
    tmdb_url = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${api_key}&language=en-US&page=1`;
    video_url = `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${api_key}&language=en-US&page=1`;
    try{
        const promise_1 = axios.get(tmdb_url);
        const promise1 = promise_1.then(response => processItemDetails(response.data, media_type));

        const promise_2 = axios.get(video_url);
        const promise2 = promise_2.then(response => processVideos(response.data, media_type));

        const pm_data = Promise.all([promise1, promise2]).then(values =>{
            return Object.assign({}, values[0], values[1]);
        });

        return pm_data;
    } catch(error) {
        console.error(error);
    }
}

// Helper functions for getting data on reviews
function processReviewDetails(response, media_type){
    results = response.results;
    review_list = [];
    var i = 0
    while(review_list.length < 10 && i < results.length){
        r_item = {}

        // Get information for first line
        const author = results[i].author;
        if(author !== undefined && author !== null){
            
            r_item['first_line'] = "A review created by " + author;
        }
        // Get rating information
        var rating = "0";
        if(results[i].author_details.rating !== undefined && results[i].author_details.rating !== null){
            rating = String(results[i].author_details.rating);
        }
        r_item['rating'] = rating;

        // Get information for second line
        if(results[i].created_at !== undefined && results[i].created_at!== null){
            
            let second_line = "Written by " + author + ' on ';
            
            const split_created = results[i].created_at.split('T');
            const split_date = split_created[0].split('-');
            const split_time = split_created[1].split('.')[0].split(':');
	    
            second_line += month_names[parseInt(split_date[1])- 1];
	    second_line += ' ' + parseInt(split_date[2]) + ', ' + split_date[0];
	    
            let hour = parseInt(split_time[0]);
	    hour = (hour + 16) % 24;
            let r_time = "";
            if(hour === 0){
                r_time = "12:" + split_time[1] + ':' + split_time[2] + ' AM'; 
            }
            else if(hour > 0 && hour < 12){
                r_time = hour + ":" + split_time[1] + ':' + split_time[2]  + ' AM'; 
            }
            else if(hour == 12){
                r_time =  "12:" + split_time[1] + ':' + split_time[2] + ' PM'; 
            }
            else{
                r_time = String(hour - 12)  + ":" + split_time[1] + ':' + split_time[2] + ' PM'; 
            }
            r_item['second_line'] = second_line + ', ' + r_time;
        }
        if(results[i].url !== undefined && results[i].url !== null){
            r_item['url'] = results[i].url;
        }
        if(results[i].content !== undefined && results[i].content !== null){
            r_item['content'] = results[i].content;
        }
        if(results[i].author_details.avatar_path !== undefined && results[i].author_details.avatar_path !== null){
	    avatar_url = results[i].author_details.avatar_path;
	    if(avatar_url.includes("https://") || avatar_url.includes('http://')){
		r_item['avatar_path'] = avatar_url.substring(1);
	    }
	    else{
		r_item['avatar_path'] = "https://image.tmdb.org/t/p/original" + avatar_url;
	    }
        }
        else{
            r_item['avatar_path'] = "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW8/ReviewsPlaceholderImage.jpg";
        }
        review_list.push(r_item);
        i++;
    }
    review_data = {'data': review_list};
    return review_data;
}

function reviewDetails(media_type, id){
    tmdb_url = `https://api.themoviedb.org/3/${media_type}/${id}/reviews?api_key=${api_key}&language=en-US&page=1`;
    try{
        const promise = axios.get(tmdb_url);
        const pm_data = promise.then(response => processReviewDetails(response.data, media_type));
        return pm_data;
    } catch(error) {
        console.error(error);
    }
}

// Helper functions for getting data on cast
function processCastDetails(response, media_type){
    results = response.cast;
    cast_list = [];
    for(var i = 0; i < results.length; i++){
        if(results[i].profile_path !== undefined && results[i].profile_path !== null){
            c_item = {};
            profile_path = post_prefix + results[i].profile_path;
            c_item['profile_path'] = profile_path;
            c_item['id'] = results[i].id;

            if(results[i].name !== undefined && results[i].name !== null){
                c_item['name'] = results[i].name;
            }
            if(results[i].character !== undefined && results[i].character !== null){
                c_item['character'] = results[i].character;
            }
            cast_list.push(c_item);

        } 
    }
    cast_data = {'data': cast_list};
    return cast_data;
}

function castDetails(media_type, id){
    tmdb_url = `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${api_key}&language=en-US&page=1`;
    try{
        
        const promise = axios.get(tmdb_url);
        const pm_data = promise.then(response => processCastDetails(response.data, media_type));
        return pm_data;
    } catch(error) {
        console.error(error);
    }
}

// Helper functions for getting data on individual person
function processPersonDetails(response){
    if(response.birthday !== undefined && response.birthday !== null){
        p_details['birthday'] = 'Birth: ' + response.birthday;
    }
    if(response.place_of_birth !== undefined && response.place_of_birth !== null){
        p_details['birth_place'] = 'Birth Place: ' + response.place_of_birth;
    }
    if(response.gender !== undefined && response.gender !== null){
        p_gender = "Undefined";
        if(response.gender === 1){
            p_gender = "Female";
        }
        if(response.gender === 2){
            p_gender = "Male";
        }
        p_details['gender'] = 'Gender: ' + p_gender;
    }
    if(response.known_for_department !== undefined && response.known_for_department !== null){
        p_details['known_for'] = 'Known for: ' + response.known_for_department;
    }
    if(response.name !== undefined && response.name !== null){
        p_details['name'] = response.name;
    }
    if(response.homepage !== undefined && response.homepage !== null){
        p_details['homepage'] = response.homepage;
    }
    if(response.also_known_as !== undefined && response.also_known_as !== null){
        if(response.also_known_as.length > 0){
            p_details['also_known_as'] = 'Also Known as: ' + response.also_known_as.join(",");
        }
    }
    if(response.biography !== undefined && response.biography !== null){
        p_details['biography'] = response.biography;
    }
    return p_details;
}

function processPersonExternal(response){   
    p_details = {};
    if(response.imdb_id !== undefined && response.imdb_id !== null && response.imdb_id.length > 0){
        p_details['imdb_url'] = 'https://www.imdb.com/name/' + response.imdb_id;
    }
    if(response.facebook_id !== undefined && response.facebook_id !== null && response.facebook_id.length > 0){
        p_details['facebook_url'] = 'https://www.facebook.com/' + response.facebook_id;
    }
    if(response.instagram_id !== undefined && response.instagram_id !== null && response.instagram_id.length > 0){
        p_details['instagram_url'] = 'https://www.instagram.com/' + response.instagram_id;
    }
    if(response.twitter_id !== undefined && response.twitter_id !== null && response.twitter_id.length > 0){
        p_details['twitter_url'] = 'https://www.twitter.com/' + response.twitter_id;
    }
    
    return p_details;
}

function personDetails(id){
    tmdb_url = `https://api.themoviedb.org/3/person/${id}?api_key=${api_key}&language=en-US&page=1`;
    external_url = `https://api.themoviedb.org/3/person/${id}/external_ids?api_key=${api_key}&language=en-US&page=1`;
    try{
        const promise_1 = axios.get(tmdb_url);
        const promise1 = promise_1.then(response => processPersonDetails(response.data));
        
        const promise_2 = axios.get(external_url);
        const promise2 = promise_2.then(response => processPersonExternal(response.data));

        const pm_data = Promise.all([promise1, promise2]).then(values =>{
            return Object.assign({}, values[0], values[1]);
        });
        
        
        return pm_data;
    } catch(error) {
        console.error(error);
    }
}


// Helper functions for getting recommended items
function recommendedItems(media_type, id){
    tmdb_url = `https://api.themoviedb.org/3/${media_type}/${id}/recommendations?api_key=${api_key}&language=en-US&page=1`;
    try{
        const promise = axios.get(tmdb_url);
        const pm_data = promise.then(response => processSmallCarousel(response.data, media_type));
        return pm_data;
    } catch(error) {
        console.error(error);
    }
}

//Helper functions for getting similar items
function similarItems(media_type, id){
    tmdb_url = `https://api.themoviedb.org/3/${media_type}/${id}/similar?api_key=${api_key}&language=en-US&page=1`;
    try{
        const promise = axios.get(tmdb_url);
        const pm_data = promise.then(response => processSmallCarousel(response.data, media_type));
        return pm_data;
    } catch(error) {
        console.error(error);
    }
}



// Helper functions for multisearch querying
function processMulti(response){
    response = response.results;
    results_list = [];
    var i = 0;
    while(results_list.length < 7 && i < response.length){
        if(response[i].media_type === 'movie' || response[i].media_type === 'tv'){

            if(response[i].backdrop_path !== undefined && response[i].backdrop_path !== null
	       && response[i].poster_path !== undefined && response[i].poster_path !== null){
                m_item = {}
                m_item['id'] = response[i].id;
                m_item['backdrop_path'] =  "https://image.tmdb.org/t/p/w500" + response[i].backdrop_path
                m_item['media_type'] = response[i].media_type;

                field_name = "title";
                if(response[i].media_type === "tv"){
                    field_name = "name";
                }
                if(response[i][field_name] !== undefined && response[i][field_name] !== null){
                    m_item['name'] = response[i][field_name];
                }
                results_list.push(m_item);
            }
        }
        i++;
    }


    query_results = {'data': results_list};
    return query_results;
}

function multisearch(query){
    tmdb_url = `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=en-US&query=${query}`;
    try{
        const promise = axios.get(tmdb_url);
        const pm_data = promise.then(response => processMulti(response.data));
        return pm_data;
    } catch(error) {
        console.error(error);
    }
}

// App Routes

//App Routes for Carousels
app.get("/playingmovies", function (req, res){
    res.header("Access-Control-Allow-Origin", "*");
    currentPlayingMovies().then(pm_data => res.send(pm_data));
    console.log('Processed Playing Current Movies Request');
});
app.get("/popularmovies", function (req, res){
    res.header("Access-Control-Allow-Origin", "*");
    var tmdb_url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;
    smallCarouselData(tmdb_url, "movie").then(pm_data => res.send(pm_data));
});
app.get("/topmovies", function (req, res){
    res.header("Access-Control-Allow-Origin", "*");
    var tmdb_url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`;
    smallCarouselData(tmdb_url, "movie").then(pm_data => res.send(pm_data));
});
app.get("/trendingmovies", function (req, res){
    res.header("Access-Control-Allow-Origin", "*");
    var tmdb_url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`;
    smallCarouselData(tmdb_url, "movie").then(pm_data => res.send(pm_data));
});
app.get("/populartv", function (req, res){
    res.header("Access-Control-Allow-Origin", "*");
    var tmdb_url = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`;
    smallCarouselData(tmdb_url, "tv").then(pm_data => res.send(pm_data));
});
app.get("/toptv", function (req, res){
    res.header("Access-Control-Allow-Origin", "*");
    var tmdb_url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=en-US&page=1`;
    smallCarouselData(tmdb_url, "tv").then(pm_data => res.send(pm_data));
});
app.get("/trendingtv", function (req, res){
    res.header("Access-Control-Allow-Origin", "*");
    var tmdb_url = `https://api.themoviedb.org/3/trending/tv/day?api_key=${api_key}`;
    smallCarouselData(tmdb_url, "tv").then(pm_data => res.send(pm_data));
});
// App Route for movie / tv show details
app.get("/watch/:media/:id", function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    searchDetails(req.params.media, req.params.id).then(pm_data => res.send(pm_data));;
    console.log("Processed search details for " + req.params.media + ' ' + req.params.id);
});
// App Route for reviews
app.get("/reviews/:media/:id", function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    reviewDetails(req.params.media, req.params.id).then(pm_data => res.send(pm_data));;
    console.log("Processed reviews for " + req.params.media + ' ' + req.params.id);
});

// App Route for cast
app.get("/cast/:media/:id", function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    castDetails(req.params.media, req.params.id).then(pm_data => res.send(pm_data));;
    console.log("Processed cast for " + req.params.media + ' ' + req.params.id);
});

// App Route for a single cast member / actor
app.get("/person/:id", function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    personDetails(req.params.id).then(pm_data => res.send(pm_data));;
    console.log("Processed personal details for " +  req.params.id);
});

// App Route for recommended items
app.get("/recommended/:media/:id", function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    recommendedItems(req.params.media, req.params.id).then(pm_data => res.send(pm_data));;
    console.log("Returned recommended media for " + req.params.media + ' ' + req.params.id);
});

// App Route for similar items
app.get("/similar/:media/:id", function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    similarItems(req.params.media, req.params.id).then(pm_data => res.send(pm_data));;
    console.log("Returned similar media for " + req.params.media + ' ' + req.params.id);
});


//App Route for multisearch
app.get("/multisearch/:query", function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    multisearch(req.params.query).then(pm_data => res.send(pm_data.data));;
    console.log("Returned multisearch query results for " + req.params.query);
});


app.listen(8080);

// Debugging section
//currentPlayingMovies().then(pm_data =>console.log(pm_data));
//smallCarouselData(`https://api.themoviedb.org/3/trending/tv/day?api_key=${api_key}`, "tv").then(pm_data =>console.log(pm_data));
//searchDetails("movie", 587807).then(pm_data =>console.log(pm_data));
//reviewDetails("movie", 587807).then(pm_data =>console.log(pm_data));
//castDetails("movie", 587807).then(pm_data =>console.log(pm_data));
//recommendedItems("movie", 587807).then(pm_data =>console.log(pm_data));
//similarItems("movie", 587807).then(pm_data =>console.log(pm_data));
//getVideo("movie", 464052).then(pm_data =>console.log(pm_data));
//personDetails(550843).then(pm_data =>console.log(pm_data));
//multisearch("Game").then(pm_data =>console.log(pm_data));
