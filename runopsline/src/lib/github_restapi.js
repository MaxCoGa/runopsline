// https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28
function parseData(data) {
    // If the data is an array, return that
        if (Array.isArray(data)) {
        return data
        }

    // Some endpoints respond with 204 No Content instead of empty array
    //   when there is no data. In that case, return an empty array.
    if (!data) {
        return []
    }

    // Otherwise, the array of items that we want is in an object
    // Delete keys that don't include the array of items
    delete data.incomplete_results;
    delete data.repository_selection;
    delete data.total_count;
    // Pull out the array of items
    const namespaceKey = Object.keys(data)[0];
    data = data[namespaceKey];

    return data;
}

export async function getPaginatedData(octokit,url) {
    const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;
    let pagesRemaining = true;
    let data = [];

    while (pagesRemaining) {
        const response = await octokit.request(`GET ${url}`, {
        per_page: 100,
        headers: {
            "X-GitHub-Api-Version":
            "2022-11-28",
        },
        });

        const parsedData = parseData(response.data)
        data = [...data, ...parsedData];

        const linkHeader = response.headers.link;

        pagesRemaining = linkHeader && linkHeader.includes(`rel=\"next\"`);

        if (pagesRemaining) {
        url = linkHeader.match(nextPattern)[0];
        }
    }

    return data;
}