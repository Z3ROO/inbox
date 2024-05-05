
export function Container(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      {...props} 
      className={`p-4 to-gray-800 from-gray-700 bg-gradient-to-br rounded-sm ${props.className}`} 
    />
  )
}