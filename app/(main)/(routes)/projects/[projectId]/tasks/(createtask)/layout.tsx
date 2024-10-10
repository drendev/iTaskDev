export default function CreateTaskLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const idObject = {
    id: [""],
  };

  return (
    <section>
        {children}

    </section>
  );
}
