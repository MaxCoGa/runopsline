const Pipelines = (props: any) => {
  // console.log(props.GIT_REPOS[0].length);


  if(props.GIT_REPOS.length === 0){
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
              <th scope="row">{props.GIT_REPOS[0][0].name}</th>
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

  console.log(props.GIT_REPOS[0].length);

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
          <tr>
            <th scope="row">{props.GIT_REPOS[0][0].name}</th>
            <td>HTML tables</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Number of workflows</th>
            <td>{props.GIT_REPOS[0].length}</td>
          </tr>
        </tfoot>
      </table>
    </>
  
  );
  };
  
export default Pipelines;