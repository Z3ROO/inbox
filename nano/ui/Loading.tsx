import { BiLoaderAlt } from 'react-icons/bi';

/**
 * ### Spinning icon
 *  - position absolute set by default;
 *
 * @param props.className - className for div wrapping icon.
 * @param props.isLoading - If false display equals none
 */

export function LoadingSpinner({isLoading = true, className}: {isLoading?: boolean, className?: string}) {
  return (
    <div 
      style={{display: !isLoading ? 'none' : undefined}}
      className={`absolute `+className}
      >
      <BiLoaderAlt className="animate-spin" />
    </div>
  )
}
