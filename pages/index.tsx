import type { NextPage } from "next";
import Board from "../components/Board";

const Home: NextPage = () => {
  return (
    <div className="container py-4 vh-100">
      <Board />
    </div>
  );
};

export default Home;
