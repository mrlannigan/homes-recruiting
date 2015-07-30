# homes-recruiting-adam

Task Objective:

Create an application that will use Giphy's API to display to the user a simple slideshow display of animated images. The slideshow should have crude controls that control the navigation of the shown image to either the previous or next image. There is no need to have an thumbnail view in this. There should be an input box that allows a user to control the search term that is used to search for animated gifs.


Submit to this repository as a pull request an application that meets the following requirements.

* Use Node.js for the back-end web server
* Use Hapi.js as the web-server framework within Node.js
* Use Angular.JS as the front-end framework
* Use the [Public Beta Access Key](https://github.com/Giphy/GiphyAPI#access-and-api-keys)
* Can be run on any machine with Node.js and NPM
* Must allow the bound port to be configured via an environment variable named `PORT`
* Use the web-server to return gif urls from giphy based on the user defined search term
* Use the web-server to return the angular application
* Any additional modules/libraries may be used.
* Default the search term to be `pugs` :)
* BONUS: Use promises wherever it makes sense

Reference: 
* [Giphy API](https://github.com/Giphy/GiphyAPI#overview)
* [Hapi.js](http://hapijs.com/)
* [Angular.js](https://angularjs.org/)
* [Bluebird Promise Library](https://github.com/petkaantonov/bluebird)
