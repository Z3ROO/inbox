import { KaguraProvider } from './store/KaguraContext';
import { Categories } from './components/Categories';
import { AddCard } from './components/AddCard';
import { Routine } from './components/Routine';

export function Kagura() {
  return (
    <KaguraProvider>
      <div className='w-full flex justify-center'>
        <div className='relative w-3/6'>
          <Categories />
          <AddCard />
          <Routine />
        </div>      
      </div>
    </KaguraProvider>
  )
}
