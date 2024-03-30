
export default function Page({children, className}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={"h-screen w-screen "+className}>
      {children}
    </div>
  )
}