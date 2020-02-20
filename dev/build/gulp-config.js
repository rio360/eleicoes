////////////////////////////////////////////////////////////////////////////////////////////////////
// gulp / config ///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
let config = { };

// CSS
config["css"] = {
	"color": "cyan",
	"dir": "./source/css/",
	"watch": ["**/**.scss"],
	"source": ["./source/css/eleicoes.scss"],
	"destination": {
		"development": "./docs/"
	}
};

// JS
config["js"] = {
	"color": "yellow",
	"dir": "./source/js/",
	"watch": ["**/**.js", "**/**.json"],
	"source": "./source/js/.meta/modules.json",
	"destination": {
		"development": "./docs/"
	}
};

// HTML
config["html"] = {
	"color": "magenta",
	"dir": "./source/html/",
	"watch": ["**/**.pug", "**/**.html"],
	"source": ["./source/html/eleicoes.pug"],
	"destination": {
		"development": "./docs/",
		"production": "./deploy/"
	}
};

// Assets
config["assets"] = {
	"color": "green",
	"dir": "./source/assets/",
	"watch": ["**"],
	"files": [
		// Service Worker e Manifest
		// {
		// 	"title": "service-worker",
		// 	"type": "js",
		// 	"source": "./source/assets/service-worker.js",
		// 	"destination": {
		// 		"development": "./docs/",
		// 		"production": "./deploy/"
		// 	},
		// 	"filename": "service-worker.js"
		// },
		// {
		// 	"title": "manifest",
		// 	"type": "json",
		// 	"source": "./source/assets/manifest.json",
		// 	"destination": {
		// 		"development": "./docs/",
		// 		"production": "./deploy/"
		// 	},
		// 	"filename": "manifest.json"
		// },

		// Ícone
		// {
		// 	"title": "icon",
		// 	"type": "png",
		// 	"source": "./source/assets/icon.png",
		// 	"destination": {
		// 		"development": "./docs/",
		// 		"production": "./deploy/"
		// 	},
		// 	"filename": "icon.png"
		// },

		// Fontes
		// {
		// 	"title": "cabin-400",
		// 	"type": "font",
		// 	"source": "./source/assets/cabin-400.woff2",
		// 	"destination": {
		// 		"development": "./docs/",
		// 		"production": "./deploy/"
		// 	},
		// 	"filename": "cabin-400.woff2"
		// },
		// {
		// 	"title": "cabin-500",
		// 	"type": "font",
		// 	"source": "./source/assets/cabin-500.woff2",
		// 	"destination": {
		// 		"development": "./docs/",
		// 		"production": "./deploy/"
		// 	},
		// 	"filename": "cabin-500.woff2"
		// },
		// {
		// 	"title": "cabin-700",
		// 	"type": "font",
		// 	"source": "./source/assets/cabin-700.woff2",
		// 	"destination": {
		// 		"development": "./docs/",
		// 		"production": "./deploy/"
		// 	},
		// 	"filename": "cabin-700.woff2"
		// },
		// {
		// 	"title": "material-icons",
		// 	"type": "font",
		// 	"source": "./source/assets/material-icons.woff2",
		// 	"destination": {
		// 		"development": "./docs/",
		// 		"production": "./deploy/"
		// 	},
		// 	"filename": "material-icons.woff2"
		// }
	]
};

module.exports = config;
