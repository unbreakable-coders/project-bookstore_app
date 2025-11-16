export const Typography = ({
  as: Component = "p",
  children,
}: {
  as?: keyof HTMLElementTagNameMap;
  children: React.ReactNode;
}) => {
  return <Component>{children}</Component>;
};
