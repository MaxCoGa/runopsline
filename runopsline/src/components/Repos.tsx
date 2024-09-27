function WORKFLOW_ROW(props: any) {
    return (
      <>
        <tr>
          <th scope="row">
          {props.repo.name}
          </th>
          <td>VIEW</td>
        </tr>
      </>
    );
  }
  
  const Repos = (props: any) => {
    // console.log(props.GIT_REPOS[0].length);
  
  
    if(props.GIT_REPOS.length === 0){
      return (
        <>
          <h1>Repos</h1>
          <table>
            <caption>
              repos
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
                <th scope="row">Number of repos</th>
                <td>0</td>
              </tr>
            </tfoot>
          </table>
        </>
      
      );
    }
  
    return (
      <>
        <h1>Repos</h1>
        <table>
          <caption>
            repos
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
                props.GIT_REPOS[0].map((repo: { id: any; }) => (
                  // {repoData.name} : {element.name} ({element.id})
                  <WORKFLOW_ROW repo={repo} key={repo.id}/>
                
                ))
                }
              {/* </th>
              <td>HTML tables</td> */}
            {/* </tr> */}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Number of repos</th>
              <td>{props.GIT_REPOS[0].length}</td>
            </tr>
          </tfoot>
        </table>
      </>
    
    );
    };
    
  export default Repos;