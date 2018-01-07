# Neighborhood Map

**by Gedas Gardauskas**

In this project, I have develop a single page application using KnockoutJS framework, Google Maps and Foursquare APIs. This application features a map with markers of a few office buildings in Vilnius.

## What it is and it does

It is a single page application built using jQuery, Bootstrap 4.0 and KnockoutJS 3.2.0 framework. Along with that, it uses third-party APIs - Google Maps and Foursquare. Google Maps API is used to show the map and generate the markers on it. Futhermore, Foursquare API is used to get more data about the location, while passing to it just latitude and longitude coordinates. All data form APIs are loaded asynchronously and errors are handled gracefully. For example, in a situation where a third party API does not return the expected result we show an alert to the user notifying that the data can't be loaded.

## Required Libraries and Dependencies

- `jQuery 3.2.1` - used for AJAX request to get JSON response from Foursquare API. As well, for manipulating window.
- `Boostrap 4.0` - for styling navbar and stuff.
- `Font Awesome 4.7.0` - used for toggle menu icon, and map refresh icon.
- `KnockoutJS 3.2.0` - from MVVM controls and data bindings in HMTL.

Actually, all these libraries are loaded from CDN, except KnockoutJS which is stored locally, so you don't have to worry about them (as long as you're connected).

## Getting started

### Setup Project:

- Download the project .zip file to you computer and unzip the file or clone this repository to your desktop.
- Now just open `index.html` file and you're done. (Just make sure you're connected to the internet)

### This project consists for the following files:
- `index.html` - The main HTML file where we create data bindings.
- `/src` - Directory containing all other necessary files.

#### `/src`:

The `/src` directory contains 3 other directories containing all necessary source files, styles and images.

- `/css` - Contains custom styles for sidebar menu.
- `/img` - Contains foursquare image.
- `/js` - Contains all necessary javascript files.

#### `/js`:

The `/js` directory contains a folder with KnockoutJS framework file and other 3 .js files necessary for this project.

- `/lib` - A folder with KnockoutJS framework.
- `app.js` - Main javascript file, where all the magic happens. Ok ok, mostly all...
- `data.js` - Contains markers location data and custom styles for Google Maps.
- `misc.js` - Used for rezising map, to fill the whole window height. As well, for some DOM manipulation.

### Starting up the Application:

- In order to, start this application just open the `index.html` file.

## References

[Google Maps API Javascript documentation](https://developers.google.com/maps/documentation/javascript/tutorial)

[Foursquare API documentation](https://developer.foursquare.com/docs/api/getting-started)

[KnockoutJS documentation](http://knockoutjs.com/documentation/introduction.html)

[KnockoutJS Utility functions blog post](http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html)

[jQuery getJSON request documentation](http://api.jquery.com/jquery.getjson/)

[Inspiration for sidebar](https://startbootstrap.com/template-overviews/simple-sidebar/)

