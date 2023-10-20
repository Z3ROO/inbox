
/**
 * #### Notification counter icon
 * 
 * @param props.qtd - Quantity of notifications.
 * @param props.x - Left, right corner; defaults to right.
 * @param props.y - Top or bottom corner; defaults to top.
 */

export function Notifications({ qtd }: { qtd: number }) {
  if (qtd > 99)
    qtd = 99;
    
  if (qtd <= 0)
    return null;

  return (
    <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full bg-tanj-pink flex justify-center items-center`}>
      <span className={`text-tanj-white ${qtd < 10 ? 'text-sm' : 'text-xs'}`}>{qtd}</span>
    </div>
  )
}