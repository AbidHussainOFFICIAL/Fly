import { Container } from "@/components/ui/Container";

interface PageHeaderProps {
  title: string;
  description?: string;
}

/** Title block for inner pages. The top padding clears the fixed header. */
export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section
      aria-label="page title"
      className="bg-phthalo-green-2 pt-[170px] pb-[70px] text-center"
    >
      <Container>
        <h1 className="text-fs-2 leading-[1.2] tracking-[-2px] text-white">
          {title}
        </h1>

        {description && (
          <p className="mx-auto mt-[20px] max-w-[640px] text-fs-6">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
