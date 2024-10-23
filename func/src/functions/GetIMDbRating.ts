import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import { getRating} from "./helper/imdb";

export async function GetIMDbRating(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const ttId = request.query.get('ttId');

    if (!ttId) {
        return {
            status: 400,
            jsonBody: { error: "ttId is required as a query parameter" }
        };
    }

    try {
        const rating: string = await getRating(ttId);
        return {
            status: 200,
            jsonBody: { rating }
        };

    } catch (error) {
        return {
            status: 500,
            jsonBody: { error: "Failed to fetch movie rating" }
        };
    }
}

app.http('GetIMDbRating', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: GetIMDbRating
});
