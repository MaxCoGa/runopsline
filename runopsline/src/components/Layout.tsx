import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/runopsline">Home</Link>
          </li>
          <li>
            <Link to="/runopsline/run">run</Link>
          </li>
          <li>
            <Link to="/runopsline/ops">ops</Link>
          </li>
          <li>
            <Link to="/runopsline/pipelines">pipelines</Link>
          </li>
          <li>
            <Link to="/runopsline/repos">repos</Link>
          </li>
          <li>
            <Link to="/runopsline/misc">misc</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;