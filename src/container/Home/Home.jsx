import { Container } from "react-bootstrap";
import DataTable from "../../components/Table/table";
import { useMediaQuery } from "react-responsive";

const Home = () => {
  const isMobileView = useMediaQuery({ query: "(max-width: 500px)" });

  return (
    <Container fluid>
      <DataTable isMobileView={isMobileView} />
    </Container>
  );
};

export default Home;
