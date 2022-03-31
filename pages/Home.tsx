import { Grid, Typography } from "@mui/material";
import { NextPage } from "next";

/* export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      session: await getSession()
    }, // Will be passed to the page component as props
  };
} */

const Home: NextPage = () => {
  return (
    <Grid container justifyContent="center">
      <Typography variant="h4">Home</Typography>
    </Grid>
  );
};

export default Home;
