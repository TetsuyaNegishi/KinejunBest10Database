const client = require('cheerio-httpcli');

const kinejunURL = 'https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%8D%E3%83%9E%E6%97%AC%E5%A0%B1';

client.fetch(kinejunURL, function(err, $, res) {
    $('h4 > span.mw-headline').each(function(idx) {
        console.log($(this).text());
    });
    $('div#mw-content-text > div').each(function(idx) {
        //console.log($(this p b).text());
        const t = $(this).find('p b').text();
        if (t !== '') {
            console.log(t);
            var rank = $(this).find('ol li');
            var i = 1;
            $('li', 'ol', this).each(function(idx) {
                var n = $(this).text();
                if (n !== '-') {
                    console.log(i + ':' + $(this).text());
                }
                i++
            });
            // console.log(rank);
        }
    })

});
