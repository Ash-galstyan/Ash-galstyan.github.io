(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
			typeWriter();
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			noOpenerFade: true,
			alignment: 'center',
			detach: false
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo h1').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('.nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

		$("#header .nav ul a").on("click", function (e) {
			// 1
			e.preventDefault();
			// 2
			const href = $(this).attr("href");
			// 3
			$("html, body").animate({ scrollTop: $(href).offset().top }, 800);
		});

		$('#goToProjects').on('click', function (e) {
			e.preventDefault();
			const href = $(this).attr('href');
			$('html, body').animate({scrollTop: $(href).offset().top}, 800);
		});

		$('.link').on('click', function (e) {
			e.preventDefault();
			const href = $(this).attr('href');
			$('html, body').animate({scrollTop: $(href).offset().top}, 800);
		});

		// Make navigation sticky

	var stickyNavTop = $('#intro').offset().top - 40;
	var stickyNav = function() {
		var scrollTop = $(window).scrollTop();
		if (scrollTop > stickyNavTop) {
			$('.nav').addClass('sticky');
		} else {
			$('.nav').removeClass('sticky');
		}
	};
	stickyNav();
	// and run it again every time you scroll
	$(window).scroll(function() {
		stickyNav();
	});

	var introCounter = 0;
	var introText = "Hi, I'm Ashot Galstyan";
	var speed = 50;
	function typeWriter() {
		if (introCounter < introText.length) {
			document.getElementById("intro-text").innerHTML += introText.charAt(introCounter);
			introCounter++;
			setTimeout(typeWriter, speed);
		} else {
			$('.subtitle').css('opacity', '1')
		}
	}

	// Contact form

	var form = $('#contact-form');
	var formMessage = $('#contact-message');

	$('#submitForm').submit(function(event) {
		event.preventDefault();

		var formData = $(form).serialize();
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		}).done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessage).removeClass('error');
			$(formMessage).addClass('success');

			// Set the message text.
			$(formMessage).text(response);

			// Clear the form.
			$('#name').val('');
			$('#email').val('');
			$('#message').val('');
		}).fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessage).removeClass('success');
			$(formMessage).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessage).text(data.responseText);
			} else {
				$(formMessage).text('Oops! An error occured and your message could not be sent.');
			}
		});
	});

		// Animate projects

	const AnimateOnScroll = function ({ offset } = { offset: 10 }) {

		const windowTop = (offset * window.innerHeight) / 100;
		const windowBottom = window.innerHeight - windowTop;
		const windowLeft = 0;
		const windowRight = window.innerWidth;
		let elements;

		this.start = (element) => {
			window.requestAnimationFrame(() => {

				element.style.animationDelay = element.dataset.animationDelay;
				element.style.animationDuration = element.dataset.animationDuration;

				element.classList.add(element.dataset.animation);

				element.dataset.animated = "true";
			});
		};

		this.inViewport = (element) => {

			const elementRect = element.getBoundingClientRect();
			const elementTop =
				elementRect.top + parseInt(element.dataset.animationOffset) ||
				elementRect.top;
			const elementBottom =
				elementRect.bottom - parseInt(element.dataset.animationOffset) ||
				elementRect.bottom;
			const elementLeft = elementRect.left;
			const elementRight = elementRect.right;


			return (
				elementTop <= windowBottom &&
				elementBottom >= windowTop &&
				elementLeft <= windowRight &&
				elementRight >= windowLeft
			);
		};


		this.verifyElementsInViewport = (els = elements) => {
			for (let i = 0; i < els.length; i++) {

				if (els[i].dataset.animated) continue;

				this.inViewport(els[i]) && this.start(els[i]);
			}
		};


		this.getElements = () =>
			elements = document.querySelectorAll("[data-animation='zoomReverseIn']");


		this.update = () => {
			elements = this.getElements();
			elements && this.verifyElementsInViewport(elements);
		};


		window.addEventListener("load", this.update, {once: false});
		window.addEventListener(
			"scroll",
			() => {
				if (elements) {
					this.verifyElementsInViewport(elements)
				}
			},
			{ passive: true }
		);
		window.addEventListener(
			"resize",
			() => {
				if (elements) {
					this.verifyElementsInViewport(elements)
				}
			},
			{ passive: true }
		);
	};

// Initialize
	const options = {
		offset: 15 // percentage of the window
	};

	const animation = new AnimateOnScroll(options);

})(jQuery);
