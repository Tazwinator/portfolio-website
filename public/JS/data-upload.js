const userImage = document.querySelectorAll('.userImage');
const imgAnchors = document.querySelectorAll('.imgAnchor');
const editText = document.createElement('h2');

imgAnchors.forEach((imgAnchor) => {
	imgAnchor.addEventListener('mouseenter', () => {
		editText.classList.add('editText');
		editText.innerText = 'View/Edit';
		console.log(editText);
		imgAnchor.insertAdjacentElement('afterbegin', editText);
	});
	imgAnchor.addEventListener('mouseout', () => {
		editText.remove();
	});
});
