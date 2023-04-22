import { Box, Typography } from "@mui/material";
import CoverImage from "./cover-image";
import DateComponent from "./date";

interface PostHeaderProps {
  title: string;
  coverImage: {
    url: string;
  };
  date: string;
}

export default function PostHeader({
  title,
  coverImage,
  date,
}: PostHeaderProps) {
  return (
    <>
      <Box className="my-5">
        <Typography variant="h1">{title}</Typography>
      </Box>
      <Box className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} url={coverImage.url} />
      </Box>
      <Box className="mb-6 text-lg">
        <DateComponent dateString={date}></DateComponent>
      </Box>
    </>
  );
}
