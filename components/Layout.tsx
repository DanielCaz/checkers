import Head from "next/head";

const Layout = ({ children }: { children: any }) => {
  return (
    <div>
      <Head>
        <title>Checkers</title>
        <meta name="description" content="Online checkers" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      </Head>
      {/* bootstrap nav with title only */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Checkers
          </a>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
