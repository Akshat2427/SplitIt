import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardService({ content, title, img }) {
  return (
    <Card sx={{ minWidth: 345, maxWidth: 350, minHeight: 450,maxHeight:451  }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="240"
        image={img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" overflow="hidden" maxHeight="100px">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Use</Button>
      </CardActions>
    </Card>
  );
}
