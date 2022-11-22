import { Link } from '@mui/material';

export const ExternalLink = ({
  href,
  children,
}: ComponentProps): JSX.Element => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      underline="none"
      sx={{
        transition: '0.15s ease-in',
        '&:hover': { color: 'salmon' },
      }}
    >
      {children}
    </Link>
  );
};

interface ComponentProps {
  href: string;
  children: React.ReactNode;
}
