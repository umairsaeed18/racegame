const aantalpunten = document.querySelector('.punten');
const startscherm = document.querySelector('.startscherm');
const speelveld = document.querySelector('.speelveld');
let speler = {
	snelheid: 5,
	aantalpunten: 0
};
let maxpunten = 0;
startscherm.addEventListener('click', start);

let keys = {
	ArrowUp: false,
	ArrowDown: false,
	ArrowRight: false,
	ArrowLeft: false
};

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(ev) {
	ev.preventDefault();
	keys[ev.key] = true;

}

function keyUp(ev) {
	ev.preventDefault();
	keys[ev.key] = false;

}

function isCollide(a, b) {
	aRect = a.getBoundingClientRect();
	bRect = b.getBoundingClientRect();

	return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right));
}

function lijnen() {
	let lines = document.querySelectorAll('.lines');
	lines.forEach(function (item) {
		if (item.y >= 700) {
			item.y -= 750;
		}
		item.y += speler.snelheid;
		item.style.top = item.y + 'px';

	})
}

function eindespel() {
	speler.start = false;
	startscherm.classList.remove('hide');
}

function beweegauto(car) {
	let other = document.querySelectorAll('.other');
	other.forEach(function (item) {
		if (isCollide(car, item)) {
			console.log('HIT');
			eindespel();
		}
		if (item.y >= 750) {
			item.y = -300;
			item.style.left = Math.floor(Math.random() * 350) + 'px';
		}
		item.y += speler.snelheid;
		item.style.top = item.y + 'px';

	})
}

function spel() {

	let car = document.querySelector('.car');
	let road = speelveld.getBoundingClientRect();

	if (speler.start) {

		lijnen();
		beweegauto(car);
		if (keys.ArrowUp && speler.y > (road.top + 70)) {
			speler.y -= speler.snelheid;
		}
		if (keys.ArrowDown && speler.y < (road.bottom - 70)) {
			speler.y += speler.snelheid;
		}
		if (keys.ArrowLeft && speler.x > 0) {
			speler.x -= speler.snelheid;
		}
		if (keys.ArrowRight && speler.x < (road.width - 50)) {
			speler.x += speler.snelheid;
		}

		car.style.top = speler.y + 'px';
		car.style.left = speler.x + 'px';

		window.requestAnimationFrame(spel);
		//console.log(speler.aantalpunten++);
		speler.aantalpunten++;
		if (speler.aantalpunten >= maxpunten) {
			maxpunten = speler.aantalpunten;
		}
		aantalpunten.innerHTML = "Your score:" + speler.aantalpunten + "<br><br>" + "Highest score:" + maxpunten;


	}

}

function Reset() {
	maxpunten = 0;
}

function start() {
	//speelveld.classList.remove('hide');
	startscherm.classList.add('hide');
	speelveld.innerHTML = "";

	speler.start = true;
	speler.aantalpunten = 0;
	window.requestAnimationFrame(spel);


	for (x = 0; x < 5; x++) {
		let roadline = document.createElement('div');
		roadline.setAttribute('class', 'lines');
		roadline.y = (x * 150);
		roadline.style.top = roadline.y + 'px';
		speelveld.appendChild(roadline);
	}

	let car = document.createElement('div');
	car.setAttribute('class', 'car');
	speelveld.appendChild(car);

	speler.x = car.offsetLeft;
	speler.y = car.offsetTop;


	for (x = 0; x < 3; x++) {
		let othercar = document.createElement('div');
		othercar.setAttribute('class', 'other');
		othercar.y = ((x + 1) * 350) * -1;
		othercar.style.top = othercar.y + 'px';
		othercar.style.left = Math.floor(Math.random() * 350) + 'px';
		speelveld.appendChild(othercar);
	}
}