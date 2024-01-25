import * as React from 'react';

import { Box, Button, Card, CardContent, Chip, Grid, Typography } from '@mui/joy';
import LaunchIcon from '@mui/icons-material/Launch';

import { Brand } from '~/common/app.config';
import { Link } from '~/common/components/Link';
import { clientUtmSource } from '~/common/util/pwaUtils';
import { platformAwareKeystrokes } from '~/common/components/KeyStroke';


// update this variable every time you want to broadcast a new version to clients
export const incrementalVersion: number = 12;

const B = (props: { href?: string, children: React.ReactNode }) => {
  const boldText = <Typography color={!!props.href ? 'primary' : 'neutral'} sx={{ fontWeight: 600 }}>{props.children}</Typography>;
  return props.href ?
    <Link href={props.href + clientUtmSource()} target='_blank' sx={{ /*textDecoration: 'underline'*/ }}>{boldText} <LaunchIcon sx={{ ml: 1 }} /></Link> :
    boldText;
};

const { OpenRepo, OpenProject } = Brand.URIs;
const RCode = `${OpenRepo}/blob/main`;
const RIssues = `${OpenRepo}/issues`;

// callout, for special occasions
export const newsCallout =
  <Card>
    <CardContent sx={{ gap: 2 }}>
      <Typography level='title-lg'>
        Open Roadmap
      </Typography>
      <Typography level='body-sm'>
        Take a peek at our roadmap to see what&apos;s in the pipeline.
        Discover upcoming features and let us know what excites you the most!
      </Typography>
      <Grid container spacing={1}>
        <Grid xs={12} sm={7}>
          <Button
            fullWidth variant='soft' color='primary' endDecorator={<LaunchIcon />}
            component={Link} href={OpenProject} noLinkStyle target='_blank'
          >
            Explore
          </Button>
        </Grid>
        <Grid xs={12} sm={5} sx={{ display: 'flex', flexAlign: 'center', justifyContent: 'center' }}>
          <Button
            fullWidth variant='plain' color='primary' endDecorator={<LaunchIcon />}
            component={Link} href={RIssues + '/new?template=roadmap-request.md&title=%5BSuggestion%5D'} noLinkStyle target='_blank'
          >
            Suggest a Feature
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  </Card>;


// news and feature surfaces
export const NewsItems: NewsItem[] = [
  // still unannounced: phone calls, split windows, ...
];


interface NewsItem {
  versionCode: string;
  versionName?: string;
  versionMoji?: string;
  versionDate?: Date;
  text?: string | React.JSX.Element;
  items?: {
    text: string | React.JSX.Element;
    dev?: boolean;
    issue?: number;
  }[];
}
