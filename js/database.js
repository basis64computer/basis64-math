var userID;
var userCookieID;
var userName;
var userPhoto;
var userAdmin;
var userActivated;

var userDynamicID;
var userData;

var databaseURL = 'https://api.jsonbin.io/v3/b/66b04555e41b4d34e41bccf3';

function loadLocalDatabase() {
	
}

function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if(rawFile.readyState === 4)  {
      if(rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        console.log(allText);
       }
    }
  }
  rawFile.send(null);
}

/*
 * memuat database berupa JSON dari jsonbin
 * dan menggunakan fungsi callback
 */
function loadDatabase(callback) {
	console.log("Cookie ID: " + getCookie("id"));
	fetch(databaseURL).then(response => response.json()).then(jsonResponse => {
		let record = jsonResponse.record;
		let userCount = record.users;
		let database = record.database;
		console.log("Cookie ID: " + getCookie("id"));
		loadDatabaseCallback(callback, database, userCount);
	});
}

/*
 * Fungsi callback untuk memproses database
 * bentuk JSON.
 */
function loadDatabaseCallback(callback, database, userCount) {
	let userData = getUser(database, getCookie("id"));
	if (userData == null) {
		setCookie("id", "invalid", 0);
		document.location.replace("403.html");
		return;
	}
	callback(userData, userCount);
}

function getUserFromArray(database, cookieID) {
	for (var i=0; i<database.length; i++) {
		console.log(database[i].cookie + " " + cookieID);
		/*
		 * Jika cookie pengguna ditemukan pada database
		 */
		if (database[i].cookie == cookieID) {
			setCookie("dynamic_id", i, 0);
			return database[i];
		}
	}
	console.log("user not found.");
	/*
	 * Jika data tidak ditemukan, akan memberikan nilai NULL
	 */
	return null;
}

/*
 * Fungsi untuk mendapatkan pengguna dan memverifikasi
 * apakah ID dinamis pengguna pada cookie sesuai dengan
 * yang ada di database
 */
function getUser(database, cookieID) {
	console.log(database[getCookie("dynamic_id")]);
	let userData = database[getCookie("dynamic_id")];
	if (userData == null || userData == "undefined") {
		/*
		 * Jika cookie pengguna tidak memiliki dynamic_id
		 */
		return getUserFromArray(database, cookieID);
	}
	let userCookieID = userData.cookie;
	if (userCookieID == cookieID) {
		/*Jika sesuai, akan memberikan hasil dari database*/
		return userData;
	}

	/*
	 * Jika tidak sesuai, akan mencari data pengguna
	 * pada array JSON pada database dengan menggunakan
	 * fungsi getUserFromArray()
	 */
	return getUserFromArray(database, cookieID);
}

async function getDatabase() {
  var response = await fetch(databaseURL);
  var jsonResponse = await response.json();
  let record = await jsonResponse.record;
	let userCount = await record.users;
	let database = await record.database;

	return await record;
}

function databaseSetName(name) {
	fetch(databaseURL).then(response => response.json()).then(jsonResponse => {
		let record = jsonResponse.record;
		let userCount = record.users;
		let database = record.database;
		
		user = getUser(database, getCookie("id"));
		user.name = name;

		console.log("database set name result: " + JSON.stringify(database));

		let req = new XMLHttpRequest();

		req.onreadystatechange = () => {
		  if (req.readyState == XMLHttpRequest.DONE) {
		    console.log(req.responseText);
		  }
		};

		req.open("PUT", "https://api.jsonbin.io/v3/b/66b04555e41b4d34e41bccf3", true);
		req.setRequestHeader("Content-Type", "application/json");
		req.setRequestHeader("X-Master-Key", "$2a$10$ls6EV35/v9eQm9p240tAfOJM6cj4/cHytWjQT0hEHrs.jfnrJWbAC");
		req.send(JSON.stringify(record));

		setCookie("name", name);
	});
}

function databaseSetPhoto(photo) {
	fetch(databaseURL).then(response => response.json()).then(jsonResponse => {
		let record = jsonResponse.record;
		let userCount = record.users;
		let database = record.database;
		
		user = getUser(database, getCookie("id"));
		user.photo = photo;

		let req = new XMLHttpRequest();

		req.onreadystatechange = () => {
		  if (req.readyState == XMLHttpRequest.DONE) {
		    console.log(req.responseText);
		  }
		};

		console.log(JSON.stringify(record));
		req.open("PUT", "https://api.jsonbin.io/v3/b/66b04555e41b4d34e41bccf3", true);
		req.setRequestHeader("Content-Type", "application/json");
		req.setRequestHeader("X-Master-Key", "$2a$10$ls6EV35/v9eQm9p240tAfOJM6cj4/cHytWjQT0hEHrs.jfnrJWbAC");
		req.send(JSON.stringify(record));
	});
}

function databaseSetUser(name, photo) {
	fetch(databaseURL).then(response => response.json()).then(jsonResponse => {
		let record = jsonResponse.record;
		let userCount = record.users;
		let database = record.database;
		
		user = getUser(database, getCookie("id"));
		user.name = name;
		user.photo = photo;

		let req = new XMLHttpRequest();

		req.onreadystatechange = () => {
		  if (req.readyState == XMLHttpRequest.DONE) {
		    console.log(req.responseText);
		  }
		};

		console.log(JSON.stringify(record));
		req.open("PUT", "https://api.jsonbin.io/v3/b/66b04555e41b4d34e41bccf3", true);
		req.setRequestHeader("Content-Type", "application/json");
		req.setRequestHeader("X-Master-Key", "$2a$10$ls6EV35/v9eQm9p240tAfOJM6cj4/cHytWjQT0hEHrs.jfnrJWbAC");
		req.send(JSON.stringify(record));
	});
}

function databaseSetAdmin(admin) {
	fetch(databaseURL).then(response => response.json()).then(jsonResponse => {
		let record = jsonResponse.record;
		let userCount = record.users;
		let database = record.database;
		
		user = getUser(database, getCookie("id"));
		user.admin = admin;

		let req = new XMLHttpRequest();

		req.onreadystatechange = () => {
		  if (req.readyState == XMLHttpRequest.DONE) {
		    console.log(req.responseText);
		  }
		};

		console.log(JSON.stringify(record));
		req.open("PUT", "https://api.jsonbin.io/v3/b/66b04555e41b4d34e41bccf3", true);
		req.setRequestHeader("Content-Type", "application/json");
		req.setRequestHeader("X-Master-Key", "$2a$10$ls6EV35/v9eQm9p240tAfOJM6cj4/cHytWjQT0hEHrs.jfnrJWbAC");
		req.send(JSON.stringify(record));
	});
}

function databaseSetActivated(activated, timestamp) {
	fetch(databaseURL).then(response => response.json()).then(jsonResponse => {
		let record = jsonResponse.record;
		let userCount = record.users;
		let database = record.database;
		
		user = getUser(database, getCookie("id"));
		user.activated = activated;
		user.activation_expired = timestamp;

		let req = new XMLHttpRequest();

		req.onreadystatechange = () => {
		  if (req.readyState == XMLHttpRequest.DONE) {
		    console.log(req.responseText);
		  }
		};

		console.log(JSON.stringify(record));
		req.open("PUT", "https://api.jsonbin.io/v3/b/66b04555e41b4d34e41bccf3", true);
		req.setRequestHeader("Content-Type", "application/json");
		req.setRequestHeader("X-Master-Key", "$2a$10$ls6EV35/v9eQm9p240tAfOJM6cj4/cHytWjQT0hEHrs.jfnrJWbAC");
		req.send(JSON.stringify(record));
	});
}

/*
 * Menambahkan pengguna ke database
 */
function databaseAddUser(cookieID, name) {
	console.log("add user " + name);
	fetch(databaseURL).then(response => response.json()).then(jsonResponse => {
		let record = jsonResponse.record;
		let userCount = record.users;
		let database = record.database;
		
		database.push({"id": userCount + 10000000, "cookie": cookieID, "name": name, "photo": "assets/img/user.png", "activated": false, "activation_expired": 62125920000});
		userCount++;
		record.users = userCount;

		let req = new XMLHttpRequest();

		req.onreadystatechange = () => {
		  if (req.readyState == XMLHttpRequest.DONE) {
		    console.log(req.responseText);
		  }
		};

		console.log(JSON.stringify(record));
		req.open("PUT", "https://api.jsonbin.io/v3/b/66b04555e41b4d34e41bccf3", true);
		req.setRequestHeader("Content-Type", "application/json");
		req.setRequestHeader("X-Master-Key", "$2a$10$ls6EV35/v9eQm9p240tAfOJM6cj4/cHytWjQT0hEHrs.jfnrJWbAC");
		req.send(JSON.stringify(record));
	});
}

/*
 * Menghapus pengguna pada database
 */
function databaseDeleteUser() {
	console.log("delete user " + getCookie("name"));
	fetch(databaseURL).then(response => response.json()).then(jsonResponse => {
		let record = jsonResponse.record;
		let userCount = record.users;
		let database = record.database;

		if (getUser(database, getCookie("id")) == null) {
			console.log("user not found.");
			return;
		}
		
		database.splice(getCookie("dynamic_id"), 1);

		console.log(JSON.stringify(record));

		let req = new XMLHttpRequest();

		req.onreadystatechange = () => {
		  if (req.readyState == XMLHttpRequest.DONE) {
		    console.log(req.responseText);
		  }
		};

		req.open("PUT", "https://api.jsonbin.io/v3/b/66b04555e41b4d34e41bccf3", true);
		req.setRequestHeader("Content-Type", "application/json");
		req.setRequestHeader("X-Master-Key", "$2a$10$ls6EV35/v9eQm9p240tAfOJM6cj4/cHytWjQT0hEHrs.jfnrJWbAC");
		req.onload = function() {
			setCookie("id", "invalid", 0);
			document.location.replace("403.html");
		};
		req.send(JSON.stringify(record));
	});
}

function loadUserInfoCallback(user, userCount) {
	console.log("user callback");
	document.getElementById("userName").innerHTML = user.name;
	document.getElementById("userID").innerHTML = "ID: " + user.id + "<br>Cookie ID: " + user.cookie + "<br>Dynamic ID: " + (getCookie("dynamic_id") + 1 + "<br/>Activation Expired: " + formatDate(new Date(user.activation_expired), "dddd, dd MMMM yyyy - HH:mm:ss"));

	if (user.admin) {
		document.getElementById("adminStatus").innerHTML = "Admin";
	}

	if (user.activated) {
		activatedStatus = document.getElementById("activationStatus");
		activatedStatus.innerHTML = "Akun sudah diaktivasi";
		activatedStatus.classList.remove("bg-secondary");
		activatedStatus.classList.add("bg-success");

		setCookie("trial", 0);

		document.getElementById("btnActivateAccount").disabled = true;
	} else {
		activatedStatus = document.getElementById("activationStatus");
		activatedStatus.innerHTML = "Akun belum diaktivasi";
		activatedStatus.classList.remove("bg-success");
		activatedStatus.classList.add("bg-secondary");

		document.getElementById("btnActivateAccount").disabled = false;
	}

	document.getElementById("profilePhoto").src = user.photo;
}

function loadUserInfo(argument) {
	loadDatabase(loadUserInfoCallback);
}