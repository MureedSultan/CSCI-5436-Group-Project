import AppBar from "./PrimarySearchAppBar";

const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
