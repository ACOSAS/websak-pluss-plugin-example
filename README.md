# Websak pluss plugin example
This is an example of how to use the plugin API in Websak pluss. 

## Usage
To test the example, run `npm run build` and host the `dist` folder on a web
server with https. Add the url to the bootstrap.js file in the plugins array of
the Websak+ app settings, navigate to Websak+ and edit a document. On the
context menu of the search for contact field, you should now see a choice named
`Søk i 3. parts tjeneste` which will open `search.html` as an iframe.

Note that the bootstrap script should be loaded with a query string parameter 
`endpoint` with URL to the iframe which should be loaded when the user selects
the external search dialog.