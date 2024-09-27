import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/run">run</Link>
          </li>
          <li>
            <Link to="/ops">ops</Link>
          </li>
          <li>
            <Link to="/pipelines">pipelines</Link>
          </li>
          <li>
            <Link to="/misc">misc</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;