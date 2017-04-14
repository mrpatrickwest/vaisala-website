/*
* This function contains environment variables needed to build
* the site locally or into the staging/production environments.
*
* @parameter 	environment {String}	build environment
* @return		env 		{Object}	environment variables
*   @property 	root_dir 	{String} 	build destination
*   @property 	hostname 	{String} 	sitemap hostname
*   @parameter 	localhost	{Boolean}	local environment
*   @property	region 		{String}	S3 region
*   @property	bucket 		{String}	S3 bucket
*   @property	remove 		{Array}		files to remove
*   @property	cached 		{String}	Cache-Control header
*/
module.exports = function(environment) {
	var env = {};

	switch (environment) {
		case "local":
			env["root_dir"] = "/~westp/vaisala";
			env["hostname"] = "http://localhost";
			env["service"] = "http://localhost:8080";
			env["localhost"] = true;

			break;

		case "production":
			env["root_dir"] = "";
			env["hostname"] = "http://localhost";
			env["service"] = "http://localhost:8080";
			env["localhost"] = false;

			break;
	}

	return env;
};
