/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile)
			$body.addClass('is-touch');

	// Forms.
		var $form = $('form');

		// Auto-resizing textareas.
			$form.find('textarea').each(function() {

				var $this = $(this),
					$wrapper = $('<div class="textarea-wrapper"></div>'),
					$submits = $this.find('input[type="submit"]');

				$this
					.wrap($wrapper)
					.attr('rows', 1)
					.css('overflow', 'hidden')
					.css('resize', 'none')
					.on('keydown', function(event) {

						if (event.keyCode == 13
						&&	event.ctrlKey) {

							event.preventDefault();
							event.stopPropagation();

							$(this).blur();

						}

					})
					.on('blur focus', function() {
						$this.val($.trim($this.val()));
					})
					.on('input blur focus --init', function() {

						$wrapper
							.css('height', $this.height());

						$this
							.css('height', 'auto')
							.css('height', $this.prop('scrollHeight') + 'px');

					})
					.on('keyup', function(event) {

						if (event.keyCode == 9)
							$this
								.select();

					})
					.triggerHandler('--init');

				// Fix.
					if (browser.name == 'ie'
					||	browser.mobile)
						$this
							.css('max-height', '10em')
							.css('overflow-y', 'auto');

			});

	// Menu.
		var $menu = $('#menu');

		$menu.wrapInner('<div class="inner"></div>');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$menu._hide();

				// Redirect.
					if (href == '#menu')
						return;

					window.setTimeout(function() {
						window.location.href = href;
					}, 350);

			})
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('click', function(event) {

				// Hide.
					$menu._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);



// Product-Page
	// Folder path for images
	const folderPath = 'images/products/product-name/';
	const thumbnailsDiv = document.getElementById('thumbnails');

	// Array of potential images
	const images = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png'];

	// Sort images array (this is optional since they are already in order)
	images.sort();

	// Function to fetch and check if an image exists
	async function imageExists(imageSrc) {
		const response = await fetch(imageSrc);
		return response.ok;
	}

	// Function to populate thumbnails
	async function populateThumbnails() {
		const imagePromises = images.map(async (image) => {
			const imageSrc = `${folderPath}${image}`;
			const exists = await imageExists(imageSrc);
			if (exists) {
				return imageSrc; // Return the valid image source
			}
			return null; // Return null if not found
		});

		const validImages = await Promise.all(imagePromises);
		validImages.forEach((src, index) => {
			if (src) {
				const imgElement = document.createElement('img');
				imgElement.src = src;
				imgElement.alt = `Thumbnail ${index + 1}`;

				// If it's the first valid image, set it as active and display it
				if (index === 0) {
					imgElement.classList.add('active'); // Set the active class
					document.getElementById('displayed-image').src = src; // Set main image to the first
				}

				imgElement.onclick = () => changeImage(src, imgElement);
				thumbnailsDiv.appendChild(imgElement);
			}
		});
	}

	// Function to change the main image and apply the active class
	function changeImage(imageSrc, imgElement) {
		// Change the main image
		document.getElementById('displayed-image').src = imageSrc;

		// Remove the active class from all thumbnails
		const thumbnails = document.querySelectorAll('.thumbnails img');
		thumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));

		// Add the active class to the clicked thumbnail
		imgElement.classList.add('active');
	}

	// Call the function to populate thumbnails when the document is ready
	document.addEventListener('DOMContentLoaded', populateThumbnails);