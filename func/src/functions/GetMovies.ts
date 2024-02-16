import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { loadAndTransformJSON } from "./helper/app";
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 86400 });

export async function GetMovies(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const currentDate = new Date().toDateString();

    // Check if the data is already in cache
    const cachedData = cache.get(currentDate);
    let data = {}
    if(cachedData){
        data = cachedData;
    } else{
        data = await loadAndTransformJSON();
        cache.set(currentDate, data);
    }    

    return {
        // status: 200, /* Defaults to 200 */
        jsonBody: data
    };

};
app.http('GetMovies', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: GetMovies
});