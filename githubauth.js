// Octokit.js
// https://github.com/octokit/core.js#readme
import { Octokit, App } from "https://esm.sh/octokit";

// https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28
const octokit = new Octokit({
    auth: 'GITHUBPAT'
})

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

async function getPaginatedData(url) {
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



async function listBranches(owner,repo) {

    const branches = await octokit.request('GET /repos/{owner}/{repo}/branches', {
        owner: owner,
        repo: repo,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    return branches;
    
};

async function getGitHubRepoWorkflows(repoData) {

    // data[0].name -> repo name
    // data[0].owner.login -> owner name
    // console.log("========");
    // console.log(repoData.name);
    const pipeline = await octokit.request('GET /repos/{owner}/{repo}/actions/workflows', {
        owner: repoData.owner.login,
        repo: repoData.name,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    // console.log(pipeline);

    if (pipeline.data.total_count > 0){

        console.log("========");
        console.log(repoData.name);

        const branches = await listBranches(repoData.owner.login, repoData.name);

        await branches.data.forEach(element => {
            console.log(element.name);
        });

        await pipeline.data.workflows.forEach(element => {
            console.log(element.name);
            console.log(element.id);
            console.log(repoData.default_branch);
            document.querySelector("#rolItems").innerHTML+= repoData.name + ": " + element.name + "(" +  element.id + ")" 
            + ' <a href="#"><span onclick="executePipeline('+"'run'"+')">run</span></a>' 
            + ' <a href="#"><span onclick="executePipeline('+"'view'"+')">view</span></a>' 
            + ' <a href="#"><span onclick="runPipelineDom('+ "'"+repoData.owner.login+"'," + "'"+repoData.name+"'," + "'"+element.id+"'," + "'"+repoData.default_branch+"'," +')">RUN</span></a>' 
            + "<br/>";
            
        });
    
        const runAttemps = await octokit.request('GET /repos/{owner}/{repo}/actions/runs', {
            owner: repoData.owner.login,
            repo: repoData.name,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        console.log(runAttemps); 
    
        await runAttemps.data.workflow_runs.forEach(element => {
            console.log(element.event + "last triggered by: " + element.triggering_actor.login);        
        });
    
        return pipeline;

    }
}

export async function runPipeline(owner,repo,pipeId,ref,inputs) {

    const response = await octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
        owner: owner,
        repo: repo,
        workflow_id: pipeId,
        ref: ref,
        // inputs: {
        //   name: 'Mona the Octocat',
        //   home: 'San Francisco, CA'
        // },
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    // console.log(response); // should be 204
};


export async function cancelPipeline(owner,repo,runId,ref,inputs) {

    await octokit.request('POST /repos/{owner}/{repo}/actions/runs/{run_id}/force-cancel', {
        owner: owner,
        repo: repo,
        run_id: runId,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
    });

};

export async function reloadData() {
    const data = await getPaginatedData("/user/repos");
    console.log(data);
};


export async function reloadWorkflows() {
    const data = await getPaginatedData("/user/repos");

    // data.forEach(element => {
    //     // console.log(element);
    //     await getGitHubRepoWorkflows(element);
    // });

    for (const element of data) {
        await getGitHubRepoWorkflows(element);

        
        // document.querySelector("#rolItems").innerHTML=element;
         
    }

    // await Promise.all(data.map(async (element) => {
    //     await getGitHubRepoWorkflows(element);
    // }));
    // const pipelines = await getGitHubRepoWorkflows(data);

    // console.log(pipelines);
};




