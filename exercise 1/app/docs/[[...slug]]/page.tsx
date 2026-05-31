interface DocsProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function Docs({ params }: DocsProps) {
  const { slug } = await params;

  return (
    <div>
      <h1>Page docs {slug.join("/")}</h1>
    </div>
  );
}