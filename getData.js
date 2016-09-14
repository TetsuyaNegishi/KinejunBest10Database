const client = require('cheerio-httpcli');

const kinejunURL = 'https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%8D%E3%83%9E%E6%97%AC%E5%A0%B1';

client.fetch(kinejunURL, function(err, $, res) {
	$('h4').each(function(idx) {
		console.log($(this).get(0).tagName);
        console.log($(this).text());
		let tag = $(this);
		while (	tag = tag.next()) {
			if(tag.get(0).tagName === 'ul') {
				continue;
			}
			if(tag.get(0).tagName === 'p'){
				console.log('break');
				break;
			}
			const janle = tag.find('p b').text();
			console.log(janle);
			let rank = 1;
			$('li', 'ol', tag).each(function(idx) {
				let title = $(this).text();
				if (title !== '-') {
					console.log(rank + ':' + $(this).text());
				}
				rank++;
			});
		}
    });
});
