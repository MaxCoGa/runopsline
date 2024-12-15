async function viewPipeline(octokit: any,owner: any,repo: any,pipeId: any,ref: any,inputs: any) {

  console.log("VIEW"); // should be 204
};

async function runPipeline(octokit: any,owner: any,repo: any,pipeId: any,ref: any,inputs: any) {

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

  console.log(response); // should be 204
};

async function cancelPipeline(octokit: any,owner: any,repo: any,runId: any,ref: any,inputs: any) {

  console.log("TODO")
  // const response = await octokit.request('POST /repos/{owner}/{repo}/actions/runs/{run_id}/force-cancel', {
  //     owner: owner,
  //     repo: repo,
  //     run_id: runId,
  //     headers: {
  //       'X-GitHub-Api-Version': '2022-11-28'
  //     }
  // });

  // console.log(response); // should be 202

};

function WORKFLOW_ROW(props: any) {

  // console.log(props.repo);
  return (
    <>
      <tr>
        <th scope="row">
        {props.workflow.name} : {props.workflow.repo_name}
        </th>
        <td>VIEW</td>
        <td>CANCEL</td>
        <td>EXECUTE</td>
        <td>
        <button onClick={() => {
              viewPipeline(props.octokit, props.workflow.owner, props.workflow.repo_name, "TODO", props.workflow.default_branch, "" );
        }}>
          view
        </button>
        <button onClick={() => {
              cancelPipeline(props.octokit, props.workflow.owner, props.workflow.repo_name, "TODO", props.workflow.default_branch, "" );
        }}>
          stop
        </button>
        <button onClick={() => {
              runPipeline(props.octokit, props.workflow.owner, props.workflow.repo_name, props.workflow.id, props.workflow.default_branch, "" );
        }}>
          run
        </button>
        </td>
      </tr>
    </>
  );
}

const Pipelines = (props: any) => {
  // console.log(props.WORKFLOWS[0].length);


  if(props.WORKFLOWS.length === 0){
    return (
      <>
        <h1>Pipelines</h1>
        <table>
          <caption>
            workflows
          </caption>
          <thead>
            <tr>
              <th scope="col">NAME</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          {/* <tbody>
            <tr>
              <th scope="row">{props.WORKFLOWS[0][0].name}</th>
              <td>HTML tables</td>
            </tr>
          </tbody> */}
          <tfoot>
            <tr>
              <th scope="row">Number of workflows</th>
              <td>0</td>
            </tr>
          </tfoot>
        </table>
      </>
    
    );
  }

  return (
    <>
      <h1>Pipelines</h1>
      <table>
        <caption>
          workflows
        </caption>
        <thead>
          <tr>
            <th scope="col">NAME</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr> */}
            {/* <th scope="row"> */}
              {
              props.WORKFLOWS.map((workflow: { id: any; }) => (
                // {repoData.name} : {element.name} ({element.id})
                <WORKFLOW_ROW workflow={workflow} key={workflow.id} octokit={props.octokit}/>
              
              ))
              }
            {/* </th>
            <td>HTML tables</td> */}
          {/* </tr> */}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Number of workflows</th>
            <td>{props.WORKFLOWS[0].length}</td>
          </tr>
        </tfoot>
      </table>
    </>
  
  );
};
  
export default Pipelines;