import { Metadata } from 'next';

interface PageProps {
  params: {
    id: string[];
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Przepis ${params.id.join('/')}`,
  };
}

export default async function CardDetails({ params }: PageProps) {
  return (
    <div>
      <h1>Przepis: {params.id.join('/')}</h1>
    </div>
  );
}