// 1. Search 



// 2. Query SoundCloud

// object names used like classnames to wrap large sums of code use capital 
var SoundCloudAPI = {};

SoundCloudAPI.init = function() {
	SC.initialize({
		client_id: '195d273fb18f4a9a75ebda65c1aa2631'
	});
};

SoundCloudAPI.init();

SoundCloudAPI.getTrack = function(inputValue){
	// find all sounds of buskers licensed under 'creative commons share alike'
	SC.get('/tracks', {
	  q: inputValue
	}).then(function(tracks) {
	  console.log(tracks);
	  SoundCloudAPI.renderTracks(tracks);
	});

};

// 3. Display the cards

SoundCloudAPI.getTrack("the weekend");


SoundCloudAPI.renderTracks = function(tracks) {

	tracks.forEach(function(track){

		console.log(track.artwork_url);
		// card
		var card = document.createElement('div');
		card.classList.add('card');

		// image
		var imageDiv = document.createElement('div');
		imageDiv.classList.add('image');

		var image_img = document.createElement('img');
		image_img.classList.add('image_img');
		image_img.src = track.artwork_url || 'http://lorempixel.com/180/108/abstract/';

		imageDiv.appendChild(image_img);

		// content
		var content = document.createElement('div');
		content.classList.add('content');

		var header = document.createElement('div');
		header.classList.add('header');
		header.innerHTML = '<a href="#" target="_blank">Science vs. Romance</a>';


		// button
		var button = document.createElement('div');
		button.classList.add('ui','button','attached', 'button','js-button');

		var icon = document.createElement('i');
		icon.classList.add('add', 'icon');

		var buttonText = document.createElement('span');
		buttonText.innerHTML = 'Add to playlist';

		// appendChild
		content.appendChild(header);

		button.appendChild(icon);
		button.appendChild(buttonText);

		button.addEventListener('click', function(){
			SoundCloudAPI.getEmbed(track.permalink_url);
		});

		card.appendChild(imageDiv);
		card.appendChild(content);
		card.appendChild(button);

		var searchResults = document.querySelector(".js-search-results");
		searchResults.appendChild(card);

	});
};


// 4. Add to playList and play 

SoundCloudAPI.getEmbed = function(trackURL){
	console.log("CLick Im in getEmbed");
	SC.oEmbed(trackURL, {
	  auto_play: true
	}).then(function(embed){
	  console.log('oEmbed response: ', embed);

	  var sideBar = document.querySelector('.js-playlist');

	  var box =document.createElement('div');
	  box.innerHTML = embed.html;

	  sideBar.insertBefore(box, sideBar.firstChild);
	  localStorage.setItem("key", sideBar.innerHTML);


	});

};

var sideBar = document.querySelector(".js-playlist");
sideBar.innerHTML = localStorage.getItem("key");

