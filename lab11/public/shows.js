//I pledge my honor that I have abided by the Stevens Honor System.
function spaces(x){
    let b=true;
    for (const n in x){
        b = b && x[n]===" ";
    }
    return b;
}

$(document).ready(function() {
    (function($) {
        let searchInput = $('#search_term');
	    let showList = $('#showList');
        let s = $('#show');
        let submit = $('#submit');
        let home =$('#homeLink');
        let error =$('#error');
        error.hide();
        function bindToHome(home){
            $(home).click(function(event) {
                error.hide();
			    let href = event.target.href;
                let requestConfig = {
                    method: 'GET',
                    url: href
                };
                $.ajax(requestConfig).then(function(responseMessage){
                });
            });
        }
        function bindToShow(show) {
            $(show).click(function(event) {
                error.hide();
			    event.preventDefault();
                s.empty();
			    let href = event.target.href;
			    let requestConfig = {
				    method: 'GET',
				    url: href
			    };

			    $.ajax(requestConfig).then(function(responseMessage) {
                    if(responseMessage.name){
                        let name=$(`<h1>${responseMessage.name}</h1>`);
                        s.append(name);
                    }
                    else{
                        let name=$(`<h1>N/A</h1>`);
                        s.append(name);
                    }
                    if(responseMessage.image && responseMessage.image.medium){
                        let photo=$(`<img src="${responseMessage.image.medium}" alt="image for ${responseMessage.name}">`);
                        s.append(photo);
                    }
                    if(!responseMessage.image || !responseMessage.image.medium){
                        let photo=$(`<img src="public/no_image.jpeg" alt="no image for ${responseMessage.name}">`);
                        s.append(photo);
                    }
                    let dl=$("<dl></dl>");
                    if(responseMessage.language){
                        let lang1=$("<dt>Language</dt>");
                        let lang2=$(`<dd>${responseMessage.language}</dd>`);
                        dl.append(lang1);
                        dl.append(lang2);
                    }
                    else{
                        let lang1=$("<dt>Language</dt>");
                        let lang2=$(`<dd>N/A</dd>`);
                        dl.append(lang1);
                        dl.append(lang2);
                    }
                    if(responseMessage.genres && responseMessage.genres.length!==0){
                        let ul=$("<ul></ul>");
                        let genre1=$("<dt>Genres</dt>");
                        let genre2=$("<dd></dd>");
                        for(genre of responseMessage.genres){
                            let gen=$(`<li class="genres">${genre}</li>`);
                            ul.append(gen);
                        }
                        genre2.append(ul);
                        dl.append(genre1);
                        dl.append(genre2);
                    }
                    else{
                        let ul=$("<ul><li>N/A</li></ul>");
                        let genre1=$("<dt>Genres</dt>");
                        let genre2=$("<dd></dd>");
                        genre2.append(ul);
                        dl.append(genre1);
                        dl.append(genre2);
                    }
                    if(responseMessage.rating && responseMessage.rating.average){
                        let rating1=$("<dt>Average Rating</dt>");
                        let rating2=$(`<dd>${responseMessage.rating.average}</dd>`);
                        dl.append(rating1);
                        dl.append(rating2);
                    }
                    else{
                        let rating1=$("<dt>Average Rating</dt>");
                        let rating2=$(`<dd>N/A</dd>`);
                        dl.append(rating1);
                        dl.append(rating2);
                    }
                    if(responseMessage.network){
                        let network1=$("<dt>Network</dt>");
                        let network2=$(`<dd>${responseMessage.network.name}</dd>`);
                        dl.append(network1);
                        dl.append(network2);
                    }
                    else{
                        let network1=$("<dt>Network</dt>");
                        let network2=$(`<dd>N/A</dd>`);
                        dl.append(network1);
                        dl.append(network2);
                    }
                    if(responseMessage.summary){
                        let sum1=$("<dt>Summary</dt>");
                        let sum2=$(`<dd>${responseMessage.summary}</dd>`);
                        dl.append(sum1);
                        dl.append(sum2);
                    }
                    else{
                        let sum1=$("<dt>Summary</dt>");
                        let sum2=$(`<dd>N/A</dd>`);
                        dl.append(sum1);
                        dl.append(sum2);
                    }
                    if(dl){
                        s.append(dl);
                    }
                    showList.hide();
                    s.show();
                    bindToHome(home);
                    home.show();
			    });
		    });
	    }

        $(submit).click(function(event) {
            event.preventDefault();
            let search=searchInput.val();
            error.hide();
            if(spaces(search)){
                error.empty();
                let errorMessage=$("<p>Please input a non-empty search term, thank you!</p>")
                error.append(errorMessage);
                error.show()
            }
            else{
            showList.empty();
            var requestConfig = {
                method: 'GET',
                url: `http://api.tvmaze.com/search/shows?q=${search}`
            };
            $.ajax(requestConfig).then(function(responseMessage) {
                if(responseMessage.length==0){
                    s.hide();
                    error.empty();
                    let errorMessage=$("<p>Sorry, no results!</p>")
                    error.append(errorMessage);
                    error.show()
                }
                else{
                for (show of responseMessage){
                    let indShow=$(`<li><a class='indShow' href=${show.show._links.self.href}>${show.show.name}</a></li>`);
                    bindToShow(indShow);
                    showList.append(indShow);
                }
                s.hide();
                showList.show();
                }
                bindToHome(home);
                home.show();
            });
            }
        });

	    var requestConfig = {
	 	    method: 'GET',
	 	    url: 'http://api.tvmaze.com/shows'
	    };
        $.ajax(requestConfig).then(function(responseMessage) {
	 	    for (show of responseMessage){
                let indShow=$(`<li><a class='indShow' href=${show._links.self.href}>${show.name}</a></li>`);
                bindToShow(indShow);
                showList.append(indShow);
            }
            s.hide();
            showList.show();
	    });
    })(window.jQuery);
});