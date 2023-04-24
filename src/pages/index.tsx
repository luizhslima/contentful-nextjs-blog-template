import ProjectPanel from "@/components/panels/projectsPanel";
import { formatMonthDayYear } from "@/components/utils/formats";
import { getAllPostsForHome } from "@/lib/api";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import FooterIllustartion from "../assets/Coding _Two_Color.svg";

export default function Home({ queryReponse }: { queryReponse: any }) {
  const theme = useTheme();
  const [posts, projetos, categorias] = queryReponse;

  return (
    <>
      <Head>
        <title>Bem-vindo ao Stackoverbusi</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Box
        sx={{
          [theme.breakpoints.between("xs", "sm")]: {
            paddingX: 1,
          },
          width: {
            xs: "100%",
            md: "820px",
            lg: "920px",
          },
          margin: "0 auto",
        }}
      >
        <Grid container direction="row" alignItems={"center"}>
          <Grid item xs={12}>
            <Alert severity="warning" onClose={() => {}}>
              <AlertTitle>Alerta!!!</AlertTitle>
              Este site ainda está em versão{" "}
              <span className="font-bold">&quot;beta&ldquo;</span>, portanto, algo pode
              quebrar ou não funcionar corretamente. Se gostou do site e deseja
              contribuir para sua melhoria , por favor, abra uma issue no
              repositório do{" "}
              <Link href="https://github.com/luizhslima/contentful-nextjs-blog-template">
                Github.
              </Link>
              👍
            </Alert>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <div className="flex flex-col gap-3">
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "Anton",
                }}
              >
                Hello World 💻
              </Typography>
              <Typography variant="h2">Olá, sou Luiz!</Typography>
              <Typography variant="subtitle2">
                Bem vindo ao meu site! 🎉
              </Typography>
              <Typography variant="body1">
                Criei este site com o intuito de ajudar a comunidade, trazendo
                conteúdo sobre programação.Sou desenvolvedor de software em São
                Paulo e gosto de projetos de código aberto, além de falar
                sobre codificação e criação de projetos pessoais e inteligência
                financeira. Meus hobbies incluem jogos e animes, estilo de música não tenho
                especifico mas em geral música eletrônica porém, escuto de tudo um pouco...
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box
              sx={{
                background:
                  "url('/illustrations/Coding_Outline.svg') no-repeat",
                backgroundSize: "100%",
                width: {
                  xs: "100%",
                  md: "461px",
                  lg: "585px",
                },
                height: {
                  xs: "200px",
                  md: "296px",
                  lg: "380px",
                },
              }}
            ></Box>
          </Grid>
          <Grid item xs={12}>
            <div className="pt-10 flex items-center">
              <Typography
                variant="h3"
                sx={{
                  flexGrow: "1",
                  fontSize: {
                    xs: theme.typography.pxToRem(24),
                    lg: theme.typography.pxToRem(32),
                  },
                  marginBottom: 2,
                }}
              >
                Últimos artigos 📰
              </Typography>
              <Button variant="contained" href="/blog/posts">
                Ver mais
              </Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            {posts.map((item: any, index: number) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  "&:not(:last-child)": {
                    borderBottom: "1px solid #ccc",
                  },
                  paddingY: 2,
                  marginBottom: 2,
                }}
              >
                <Typography
                  variant="link"
                  component="div"
                  sx={{ flexGrow: "1" }}
                >
                  <Link href={`/blog/post/${item.slug}`}>{item.title}</Link>
                </Typography>

                <Typography
                  variant="contrast"
                  sx={{
                    display: {
                      sm: "block",
                      xs: "none",
                    },
                  }}
                >
                  {formatMonthDayYear(item.sys.publishedAt)}
                </Typography>
              </Box>
            ))}
          </Grid>
          <Grid item xs={12}>
            <div className="pt-10 pb-5 flex items-center">
              <Typography
                variant="h3"
                sx={{
                  flexGrow: "1",
                  fontSize: {
                    xs: theme.typography.pxToRem(24),
                    lg: theme.typography.pxToRem(32),
                  },
                  marginBottom: 2,
                }}
              >
                Projetos 📋
              </Typography>
              <Button variant="contained">Ver mais</Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <ProjectPanel
              infoText="Desculpe, novos projetos ainda estão em construção."
              projetos={projetos}
            ></ProjectPanel>
          </Grid>
          <Grid item xs={12}>
            <Divider className="py-1" />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card
              sx={{
                marginY: 1,
              }}
            >
              <CardHeader title="categorias"></CardHeader>
              <CardContent>
                <List>
                  {categorias.map((item: any, index: number) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton href={`/blog/categorias/${item.slug}`}>
                        <ListItemText
                          className="capitalize"
                          primary={item.nome}
                        ></ListItemText>
                        {item.linkedFrom.entryCollection.total}
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box
              className="relative"
              sx={{
                width: {
                  xs: "100%",
                  md: "461px",
                  lg: "585px",
                },
                height: {
                  md: "296px",
                  lg: "380px",
                },
              }}
            >
              <Image src={FooterIllustartion} alt="Illustration" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const queryReponse = (await getAllPostsForHome(preview)) ?? [];
  return {
    props: { preview, queryReponse },
  };
}

//https://github.com/vercel/next.js/tree/canary/examples/cms-contentful/components
