import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { hydrateRoot } from 'react-dom/client';

import Layout from "./components/Layout";
import Home from "./components/Home";
import Run from './components/Run';
import Ops from './components/Ops';
import Pipelines from './components/Pipelines';
import Repos from './components/Repos';
import Misc from "./components/Misc";
import NoPage from "./components/NoPage";

// Octokit.js
// https://github.com/octokit/core.js#readme

import {getPaginatedData} from "./lib/github_restapi";
import { Octokit } from "octokit";
var GITHUB_PAT = "github_pat_TOKEN";

// https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28
var octokit = new Octokit({
  auth: GITHUB_PAT
})

// export function setGithubPAT(gpat){
//   GITHUB_PAT = document.getElementById('TokenInput').value; 
//   let test : string = <HTMLInputElement>document.getElementById(TokenInput).value;
//   octokit = new Octokit({
//       auth: GITHUB_PAT
//   })
// }

const TestFunction = () => {
  console.log("=====TEST=====")
  console.log(GIT_BRANCHES);
  console.log(GIT_REPOS);
  console.log(GIT_WORKFLOWS);
  return console.log("=================");
};

// TODO: const GIT_ARRAY: {key1: type1, ...}[] = [{}];
var GIT_REPOS: any[] = [];
var GIT_BRANCHES: any[] = [];
var GIT_WORKFLOWS: any[] = [];

async function listBranches(owner: any,repo: any) {

  const branches = await octokit.request('GET /repos/{owner}/{repo}/branches', {
      owner: owner,
      repo: repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
  });

  return branches;
  
};

async function getGitHubRepoWorkflows(repoData: { owner: { login: string; }; name: string; default_branch: string; }) {

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
      // GIT_WORKFLOWS.push(pipeline);
      console.log("========");
      console.log(repoData.name);

      const branches = await listBranches(repoData.owner.login, repoData.name);
      GIT_BRANCHES.push(branches);


      await branches.data.forEach((element: { name: any; }) => {
          console.log(element.name);
      });

      await pipeline.data.workflows.forEach((element: { name: string; id: string; }) => {
          const workflowData = {
            name: element.name,
            id: element.id,
            default_branch: repoData.default_branch,
            owner: repoData.owner.login,
            repo_name: repoData.name
          }
          GIT_WORKFLOWS.push(workflowData);
          console.log(element.name);
          console.log(element.id);
          console.log(repoData.default_branch);
          // let myRow = document.querySelector("#rolItems");
          // (myRow as InnerHTML).innerHTML+= repoData.name + ": " + element.name + "(" +  element.id + ")" 
          // + ' <a href="#"><span onclick="showWord('+"'run'"+')">run</span></a>' 
          // + ' <a href="#"><span onclick="showWord('+"'view'"+')">view</span></a>' 
          // + ' <a href="#"><span onclick="runPipeline('+ "'"+repoData.owner.login+"'," + "'"+repoData.name+"'," + "'"+element.id+"'," + "'"+repoData.default_branch+"'," +')">RUN</span></a>' 
          // + "<br/>";

          // console.log(document.getElementById("rolItems"));
          // let myRow2 = document.getElementById("rolItems");
          // hydrateRoot(myRow2 as HTMLElement, <WORKFLOW_ROW repoData={repoData} element={element} />);
          // (myRow as InnerHTML).innerHTML+= <WORKFLOW_ROW repoData={repoData} element={element} />
          
      });
  
      const runAttemps = await octokit.request('GET /repos/{owner}/{repo}/actions/runs', {
          owner: repoData.owner.login,
          repo: repoData.name,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
      });
      console.log(runAttemps); 
  
      await runAttemps.data.workflow_runs.forEach((element: { event: string; triggering_actor: { login: string; }; }) => {
          console.log(element.event + "last triggered by: " + element.triggering_actor.login);        
      });
  
      return pipeline;

  }
}

async function runPipeline(owner: any,repo: any,pipeId: any,ref: any,inputs: any) {

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

async function cancelPipeline(owner: any,repo: any,runId: any,ref: any,inputs: any) {

  await octokit.request('POST /repos/{owner}/{repo}/actions/runs/{run_id}/force-cancel', {
      owner: owner,
      repo: repo,
      run_id: runId,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
  });

};

async function reloadData() {

  try {
    const data = await getPaginatedData(octokit,"/user/repos");
    return console.log(data); // <-- what the function currently returns
  } catch (error) {
      return console.log(error); // <-- you may want "error.message" here.
  }   
};

async function reloadWorkflows() {



  try {
    const data = await getPaginatedData(octokit,"/user/repos");

    // GIT_REPOS = data;
    GIT_REPOS.push(data);
    for (const element of data) {
        await getGitHubRepoWorkflows(element);

        
        // document.querySelector("#rolItems").innerHTML=element;
        
    }
    
    return console.log(data); // <-- what the function currently returns
  } catch (error) {
      return console.log(error); // <-- you may want "error.message" here.
  }   


};

function showWord(rolSelector: string) {
  let myRow = document.querySelector("#rolSelector");
  (myRow as InnerHTML).innerHTML=rolSelector;
} 

function executePipeline(rolItem: string) {
  let myRow = document.querySelector("#rolSelector");
  (myRow as InnerHTML).innerHTML=rolItem;
} 

function GITHUB_PAT_FORM() {
  const [formInput, setGithubPAT] = useState(GITHUB_PAT); // Declare a state variable...
  GITHUB_PAT=formInput;
  octokit = new Octokit({
    auth: GITHUB_PAT
  })
  return (
    <>
      <input
        value={formInput} // ...force the input's value to match the state variable...
        // onChange={e => setGithubPAT(e.target.value)} // ... and update the state variable on any edits!
        onChange={e => setGithubPAT(e.target.value)} // ... and update the state variable on any edits!
      />
      {GITHUB_PAT}
    </>
  );
}


function TEST_BUTTON() {
  return (
    <>
      <button onClick={() => {
        // showWord("TEST");
        TestFunction();
      }}>
        TEST
      </button>
    </>
  );
}

function RELOAD_REPOS_BUTTON() {
  return (
    <>
      <button onClick={() => {
        reloadData();
      }}>
        reload repos
      </button>
    </>
  );
}

function RELOAD_WORKFLOWS_BUTTON() {
  return (
    <>
      <button onClick={() => {
        reloadWorkflows();
      }}>
        reload workflows
      </button>
    </>
  );
}


function App() {
  return (
    <div className="App">
      <header>
        <h1>RUNOPSLINE</h1>
      </header>

      <p>
        Using GitHub
      </p>

      {/* <Layout/> */}
      <Main/>

      {/* <input type="text" id="TokenInput" defaultValue={GITHUB_PAT}></input> */}

      <GITHUB_PAT_FORM/>
      <TEST_BUTTON/>
      <RELOAD_REPOS_BUTTON/>
      <RELOAD_WORKFLOWS_BUTTON/>

      <h2 id="rolSelector">runs</h2>
      <div id="rolView">
        <p id="rolItems">
          {/* <WORKFLOW_ROWS/> */}
        </p>
      </div>

    <footer>
      <a href="https://maxks.org">maxksorg</a>
    </footer>
    </div>
  );
}

export default App;


const Main = () => (
	<BrowserRouter>
		<Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="run" element={<Run />} />
          <Route path="ops" element={<Ops />} />
          <Route path="pipelines" element={<Pipelines WORKFLOWS={GIT_WORKFLOWS}/>} />
          <Route path="repos" element={<Repos  GIT_REPOS={GIT_REPOS}/>} />
          <Route path="misc" element={<Misc />} />
          <Route path="*" element={<NoPage />} />
        </Route>
		</Routes>
	</BrowserRouter>
);