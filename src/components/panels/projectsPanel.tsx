import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { parseISO } from "date-fns";
import Link from "next/link";

export interface ProjectPanelProps {
  projetos?: Project[];
  infoText?: string;
}

export interface Project {
  titulo: string;
  descricao: string;
  artigoUrl: string;
  demoUrl: string;
  githubUrl: string;
  dataFinalizacao: string;
}

export default function ProjectPanel(props: ProjectPanelProps) {
  if (!props.projetos || props.projetos.length < 1) {
    return (
      <Grid container sx={{ paddingY: 5 }}>
        <Grid item xs={12}>
          <Alert severity="info">
            {props.infoText ?? "Novos projetos em contrucao"}
          </Alert>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container>
      {props.projetos?.map((item, index) => (
        <Grid item key={index} xs={12} md={3} lg={5}>
          <Card
            elevation={0}
            variant="outlined"
          >
            <CardContent>
              <Typography variant="contrast">
                {parseISO(item.dataFinalizacao).getFullYear()}
              </Typography>
              <Typography variant="link" className="pb-3" component={"div"}>
                <Link href={item.githubUrl} target="_blank">
                  {item.titulo}
                </Link>
              </Typography>
              <Typography
                variant="poster"
                sx={{
                  maxWidth: "320px",
                }}
                component="div"
              >
                {item.descricao}
              </Typography>
            </CardContent>
            <CardActions>
              {item.demoUrl && (
                <Button href={item.demoUrl} variant="outlined">
                  Demo
                </Button>
              )}
              {item.artigoUrl && (
                <Button href={item.artigoUrl} variant="outlined">
                  Artigo
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
