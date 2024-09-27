function WORKFLOW_ROW(props: any) {

  // console.log(props.repo);
  return (
    <>
      <tr>
        <th scope="row">
        {props.workflow.name}
        </th>
        <td>VIEW</td>
        <td>CANCEL</td>
        <td>EXECUTE</td>
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
                <WORKFLOW_ROW workflow={workflow} key={workflow.id}/>
              
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