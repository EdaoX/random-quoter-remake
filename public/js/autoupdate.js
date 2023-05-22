$(function () {

	const location = window.location.hostname == 'localhost' ? 'http://localhost:' + window.location.port : window.location.protocol + '//' + window.location.hostname;
	const $quote = $('.quote');
	const $quoteBody = $('.body');
	const $quoteAuthor = $('.author');
	const $link = $('.link');
	const $quoteCopyButton = $('.quoter-icon-button');
	const timeout = 60; // Seconds

	function handleNewQuote(quote) {
		$quote.fadeOut(500, function () {
			$quoteBody.text(quote.body);
			$quoteAuthor.text(quote.author);
			$link.text(location + '/quote/' + quote.uuid);
			$quoteCopyButton.removeClass('copied');

			$quote.fadeIn(500);
		});
	}

	setInterval(function () {
		$.get('/api/quote/random', {}, handleNewQuote);
	}, timeout * 1000);

});
