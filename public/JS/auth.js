const mq = window.matchMedia('(min-width: 767px)');
const wrapper = document.querySelector('.wrapper');

const heightChange = () => {
	if (mq.matches && wrapper) {
		return wrapper.classList.add('vh-100');
	} else if (wrapper) {
		return wrapper.classList.remove('vh-100');
	}
};

window.addEventListener('resize', heightChange);
window.onload = heightChange;
// doucment.onlaod doesn't work ignroe google. Browsers have replaced it with this.
