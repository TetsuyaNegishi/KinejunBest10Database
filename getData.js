const client = require('cheerio-httpcli');
const fs = require('fs');

const kinejunURL = 'https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%8D%E3%83%9E%E6%97%AC%E5%A0%B1';

const dataPath = 'data/kinejunBest10.json';

client.fetch(kinejunURL, (err, $, res) => {
	let datas = [];
	$('h4').each(function(idx) {
        // console.log($(this).text());
		const time = $(this).text().match(/\d*(?=回)/)[0];
		// console.log(time);
		const year = $(this).text().match(/\d*(?=年度)/)[0];
		// console.log(year);
		let tag = $(this);
		while (	tag = tag.next()) {
			if(tag.get(0).tagName === 'ul') {
				continue;
			}
			if(tag.get(0).tagName === 'p'){
				break;
			}
			const janle = tag.find('p b').text();
			// console.log(janle);
			let rank = 1;
			$('li', 'ol', tag).each(function(idx) {
				let title = $(this).text();
				if (title !== '-') {
					// console.log(rank + ':' + $(this).text());
					const titles = $(this).text().split('\n');
					titles.forEach((val) => {
						// タイトルを取得
						const title = val.match(/^.*(?=（)/)[0];
						// console.log('・' + title);

						// 監督名を取得
						let director = val.match(/（.*）/);
						director = director[director.length - 1];
						// カッコを削除
						director = director.split('（');
						director = director[director.length - 1];
						director = director.match(/^.*(?=）)/)[0];
						// 監督を削除（監督がない場合はそのまま）
						let dire;
						if( dire = director.match(/^.*(?=監督)/)){
							director = dire[0];
						}
						// console.log('・' + director);
						let row = {time:time, year:year, janle:janle, rank:rank,
							title:title, director:director };
						datas.push(row);
						// console.log(row);
					})
				}
				rank++;
			});
		}
    });
	console.log(datas);
});
