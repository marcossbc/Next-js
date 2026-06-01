interface PageProps {
  params: {
    username: string;
  };
}

export default function UserPage({ params }: PageProps) {
  return <h1>Welcome, {params.username}</h1>;
}