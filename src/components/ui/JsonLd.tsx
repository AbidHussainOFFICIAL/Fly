interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Renders structured data. `<` is escaped so the JSON can't close the tag. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
