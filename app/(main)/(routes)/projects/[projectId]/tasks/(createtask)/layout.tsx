import { CreateTaskContext } from "./context";

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
      <CreateTaskContext.Provider value={idObject}>
        {children}
      </CreateTaskContext.Provider>
    </section>
  );
}
