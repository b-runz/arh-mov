import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { loadAndTransformJSON } from "./helper/app";
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 86400 });

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
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

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: data,
        headers: {
            "Content-Type": "application/json",
        }
    };

};

export default httpTrigger;