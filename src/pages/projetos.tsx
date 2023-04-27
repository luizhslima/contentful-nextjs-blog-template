import ProjectPanel from "@/components/panels/projectsPanel";
import { getAllproject } from "@/lib/api";
import { Box, Grid, Typography, useTheme } from "@mui/material";

export default function Projetos({ queryReponse }: any) {
  const theme = useTheme();
  return (
    <>
      <Box
        className="content-center"
        sx={{
          [theme.breakpoints.between("xs", "sm")]: {
            paddingX: 1,
          },
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h1" className="pb-8">
              Projetos
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ProjectPanel projetos={queryReponse} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const queryReponse = (await getAllproject(preview)) ?? [];
  return {
    props: { preview, queryReponse },
  };
}
