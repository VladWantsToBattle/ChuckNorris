let lstCategory = [];
let form = null;

window.onload = function () {
	form = document.getElementById('frmJoke');
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		
		getJoke(document.getElementById('selectCategory').value);
	});
	getCategories();
}

function getJoke(category) {
	showLoading(true);
	let request = new XMLHttpRequest();
	
	request.onreadystatechange = function () {
		if (request.readyState === 4) {
			if (request.status === 200) {
				let joke = JSON.parse(request.responseText);
				document.getElementById('txtJoke').innerHTML = joke.value;
				showLoading(false);
			} else {
				alert('Error in retrieving data');
			}
		}
	}

	request.open('Get', 'https://api.chucknorris.io/jokes/random?category=' + category);
	request.send();
}

function getCategories() {
	let request = new XMLHttpRequest();

	request.onreadystatechange = function () {
		if (request.readyState === 4) {
			if (request.status === 200) {
				lstCategory = JSON.parse(request.responseText);
				showCategories();
			} else {
				alert('Error in retrieving data');
			}
		}
	}

	request.open('Get', 'https://api.chucknorris.io/jokes/categories');
	request.send();
}

function showCategories() {
	div = document.getElementById('divCategory');
	lstCategory.forEach((item) => {
		let lstOption = document.getElementById('selectCategory');

		let addSelect = document.createElement('option');
		addSelect.setAttribute('value', item);

		addSelect.appendChild(document.createTextNode(item));

		lstOption.appendChild(addSelect);
	});
	document.getElementById('divOption').removeAttribute('hidden');
}

function showLoading(show) {
	if (show == true) {
		document.getElementById('divLoading').setAttribute('class', 'd-flex justify-content-center mt-5');
		document.getElementById('txtJoke').setAttribute('class', 'd-none');
	} else {
		document.getElementById('divLoading').setAttribute('class', 'd-none');
		document.getElementById('txtJoke').setAttribute('class', 'text-dark text-justify text-center mt-5');
	}
}