create database weather_beats;

create table consumer (
	username varchar(50) primary key,
	first_name varchar(50),
	last_name varchar(50),
	email varchar(50),
	gender varchar(50),
	dob DATE
);

CREATE TABLE user_genre_pref (
  song_id serial primary key,
  song_name varchar(25) not null,
	song_artist varchar(25),
	song_album varchar(25),
  song_length decimal(6,2),
  song_explicit bit,
	song_genre varchar(25)
);

CREATE TABLE song (
  song_id serial primary key,
  song_name varchar(25) not null,
	song_artist varchar(25),
	song_album varchar(25),
  song_length decimal(6,2),
  song_explicit bit,
	song_genre varchar(25)
);

CREATE TABLE playlist (
  playlist_id serial primary key,
	playlist_name varchar(25),
	username varchar(50) references consumer(username)
	);

	CREATE TABLE playlist_songs (
		playlist_songs_id serial primary key,
	  playlist_id int references playlist(playlist_id),
		song_id int references song(song_id)
		);
