# vaisala-website

Requires npm to build. Using the Makefile.

make
This will build the website, creating static pages, and put into the build directory. Modify env_variables.js root_dir for the correct web server document
root for the pages

make prod
This builds the website, creating static pages, and put into the build directory. The root_dir is left blank, assumed to be in the document root itself.

make install
pulls all of the npm dependencies for the build and puts them in node_modules

