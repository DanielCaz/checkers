import Head from "next/head";

const Layout = ({ children }: { children: any }) => {
  return (
    <div>
      <Head>
        <title>Checkers</title>
        <meta name="description" content="Online checkers" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
      </Head>
      {children}
    </div>
  );
};

export default Layout;
