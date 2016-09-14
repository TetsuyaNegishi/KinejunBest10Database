const client = require('cheerio-httpcli');

const kinejunURL = 'https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%8D%E3%83%9E%E6%97%AC%E5%A0%B1';

client.fetch(kinejunURL, (err, $, res) => {
	$('h4').each(function(idx) {
        console.log($(this).text());
		const time = $(this).text().match(/\d*(?=回)/)[0];
		console.log(time);
		const year = $(this).text().match(/\d*(?=年度)/)[0];
		console.log(year);
		let tag = $(this);
		while (	tag = tag.next()) {
			if(tag.get(0).tagName === 'ul') {
				continue;
			}
			if(tag.get(0).tagName === 'p'){
				break;
			}
			const janle = tag.find('p b').text();
			console.log(janle);
			let rank = 1;
			$('li', 'ol', tag).each(function(idx) {
				let title = $(this).text();
				if (title !== '-') {
					console.log(rank + ':' + $(this).text());
					const titles = $(this).text().split('\n');
					titles.forEach((val) => {
						const title = val.match(/^.*(?=（)/)[0];
						console.log('・' + title);
						let director = val.match(/（.*）/);
						director = director[director.length - 1];
						director = director.split('（');
						director = director[director.length - 1];
						director = director.match(/^.*(?=）)/)[0];
						let dire;
						if( dire = director.match(/^.*(?=監督)/)){
							director = dire[0];
						}
						console.log('・' + director);
					})
				}
				rank++;
			});
		}
    });
});
