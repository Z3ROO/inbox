
/**
 * #### Notification counter icon
 * 
 * @param props.qtd - Quantity of notifications.
 * @param props.x - Left, right corner; defaults to right.
 * @param props.y - Top or bottom corner; defaults to top.
 */

export function NotificationsCounter({ qtd, x, y }: { qtd: number, x: 'left'|'right', y: 'top'|'bottom' }) {
  if (qtd > 99)
    qtd = 99;
    
  if (qtd <= 0)
    return null;

  return (
    <div className={`
      absolute w-5 h-5 rounded-full bg-tanj-pink flex justify-center items-center
      ${y === 'bottom' ? '-bottom-2' : '-top-2'} ${x === 'left' ? '-left-2' : '-right-2'}
    `}>
      <span className={`text-tanj-white ${ qtd < 10 ? 'text-sm' : 'text-xs' }`}>{qtd}</span>
    </div>
  )
}