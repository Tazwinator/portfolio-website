const imgAnchors = document.querySelectorAll('.imgAnchor');
const userImage = document.querySelectorAll('.userImage');
const editText = document.createElement('h2');

imgAnchors.forEach((imgAnchor) => {
	imgAnchor.addEventListener('mouseenter', () => {
		editText.classList.add('editText');
		editText.innerText = 'Edit';
		console.log(editText);
		imgAnchor.prepend(editText);
	});
	imgAnchor.addEventListener('mouseout', () => {
		editText.remove();
	});
});
