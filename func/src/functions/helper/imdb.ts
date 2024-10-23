import axios from 'axios';
import * as cheerio from 'cheerio';

export interface RatingData {
    rating: string;
}

export async function getRating(tt:string) : Promise<string> {
    const imdbUrl = `https://www.imdb.com/title/${tt}/`

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0'
    };

    let response = {'data': '?'}
    
    try{
        response = await axios.get(imdbUrl, { headers });
    }
    catch(error){
        return '?'
    }
    const html = response.data;

    const $ = cheerio.load(html);

    const rating = $('div[data-testid="hero-rating-bar__aggregate-rating__score"]:first span:nth-child(1)').text();

    return rating.trim();
}